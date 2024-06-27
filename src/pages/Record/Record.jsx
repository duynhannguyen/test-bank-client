import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SimpleHeader from '~/layouts/SimpleHeader';
import RecordAPI from '~/services/recordAPI';
import { Col, Divider, Row } from 'antd';
import Container from '~/components/Container';
import MultipleChoice from '../Question/_MultipleChoice';
import TestDoingController from '../Test/__TestDoingController';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';

const Record = () => {
  const [record, setRecord] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pwParam = searchParams.get('pw');
    if (!pwParam) return;
    fetchRecord(pwParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchRecord = async pw => {
    try {
      const res = await RecordAPI.getById(id, { pw });
      setRecord(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <SimpleHeader />
      {record && (
        <div className='bg-[#f4f5f8] pt-[60px]'>
          <Container>
            <Row gutter={60} className='justify-between min-h-screen'>
              <Col span={17}>
                <div className='flex flex-col gap-6'>
                  {record?.questions.map((question, index) => (
                    <div key={question._id}>
                      <div className='flex gap-1'>
                        <h3 className='block w-fit mb-1 py-2 px-4 bg-[#ccc] rounded-t-md text-white'>
                          <span className='font-bold'>Câu {index + 1}: </span>
                          {question.score && (
                            <span className='italic'>({question.score} điểm)</span>
                          )}
                        </h3>
                      </div>
                      <MultipleChoice
                        question={question}
                        chooseAnswer={record.studentAnswers[index].answer}
                        showResult
                        isDoingTest
                      />
                    </div>
                  ))}
                </div>
              </Col>
              <Col span={7}>
                <div className='sticky top-4 flex flex-col gap-4'>
                  <BlockSectionWrapper>
                    <div className='flex flex-col gap-2 p-4'>
                      <h2>{record.title}</h2>
                      <p>Môn: {record.subject}</p>
                      <p>Thời gian làm bài: {record.limitTime} phút</p>
                      <p>Điểm chuẩn: {record.passScore}</p>
                    </div>
                  </BlockSectionWrapper>
                  <BlockSectionWrapper>
                    <div className='flex flex-col gap-2 p-4'>
                      <h2>Học sinh: {record.userFullname}</h2>
                      <p>Email: {record.userEmail}</p>
                      <p>ID: {record.userId}</p>
                      <Divider className='my-2' />
                      <p className='text-lg'>Số câu đúng: {record.correct}</p>
                      <p className='text-lg'>Điểm: {record.totalScore}</p>
                      <p className='text-lg'>Kết quả: {record.isPassed ? 'Đậu' : 'Rớt'}</p>
                    </div>
                  </BlockSectionWrapper>
                  <TestDoingController
                    questions={record.questions}
                    studentAnswers={record.studentAnswers}
                    finish
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Record;

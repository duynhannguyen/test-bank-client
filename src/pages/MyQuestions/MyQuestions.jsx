import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import Container from '~/components/Container';
import Header from '~/components/Header';
import QuestionAPI from '~/services/questionAPI';
import MultipleChoice from '../Question/_MultipleChoice';
import CollectionSection from '~/components/CollectionSection';

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestionsOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestionsOfUser = async () => {
    try {
      const res = await QuestionAPI.getMyQuestions();
      setQuestions(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <div className='bg-[#2e6bed]'>
        <Container>
          <Header />
        </Container>
      </div>
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <CollectionSection />
            </Col>
            <Col span={18} className='mx-auto'>
              <div className='flex flex-col gap-4'>
                {(questions ?? []).map(question => (
                  <MultipleChoice key={question._id} question={question} readOnly />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyQuestions;

import { Col, Modal, Row, message } from 'antd';
import Container from '~/components/Container';
import MultipleChoice from '../Question/_MultipleChoice';
import { useEffect, useState } from 'react';
import RecordAPI from '~/services/recordAPI';
import TestDoingController from './__TestDoingController';
import Countdowner from '~/components/Countdowner';
import { socket } from '~/components/Socket/Socket';

const TestDoingRoom = ({ recordData, roomId }) => {
  const { questions } = recordData;
  const [studentAnswers, setStudentAnswers] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finishData, setFinishData] = useState(null);
  const [overTime, setOverTime] = useState(false);
  useEffect(() => {
    if (!recordData?.limitTime) return;
    const timer = setTimeout(() => {
      setOverTime(true);
      handleSubmit();
    }, recordData.limitTime * 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordData.limitTime]);

  useEffect(() => {
    if (!questions) return;
    const initAnswers = questions.map((question, index) => ({
      index,
      id: question._id,
      answer: null
    }));
    setStudentAnswers(initAnswers);
  }, [questions]);

  const handleSetAnswer = (id, answer, score) => {
    const newAnswersData = studentAnswers.map(item =>
      item.id === id ? { ...item, answer, score } : item
    );
    setStudentAnswers(newAnswersData);
  };

  const handleSubmit = async () => {
    const isValidated = studentAnswers.every(question => question.answer);
    if (!isValidated) {
      message.error('Chưa chọn đủ đáp án!');
      return;
    }
    setShowResult(true);
    const payload = { ...recordData, studentAnswers };
    try {
      const res = await RecordAPI.updateById(recordData._id, payload);
      setFinishData(res.data.data);
      socket.emit('send-noti-testOwner', {
        message: 'Đã có thí sinh nộp bài thi',
        testOwnerId: roomId
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={17}>
            <div className='flex flex-col gap-6'>
              {questions.map((question, index) => (
                <div key={question._id}>
                  <div className='flex gap-1'>
                    <h3 className='block w-fit mb-1 py-2 px-4 bg-[#ccc] rounded-t-md text-white'>
                      <span className='font-bold'>Câu {index + 1}: </span>
                      {question.score && <span className='italic'>({question.score} điểm)</span>}
                    </h3>
                  </div>
                  <MultipleChoice
                    question={question}
                    handleSetAnswer={answer =>
                      handleSetAnswer(question._id, answer, question.score)
                    }
                    showResult={showResult}
                    readOnly={overTime}
                    isDoingTest
                  />
                </div>
              ))}
            </div>
          </Col>
          <Col span={7}>
            <div className='sticky top-4 flex flex-col gap-4'>
              <Countdowner
                limitTime={recordData.limitTime}
                createdAt={recordData.createdAt}
                stop={finishData}
                icon
              />
              <TestDoingController
                questions={questions}
                studentAnswers={studentAnswers}
                handleSubmit={handleSubmit}
                finish={finishData}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        open={finishData}
        okText='Đóng'
        onOk={() => setFinishData(null)}
        cancelButtonProps={{ hidden: true }}
      >
        <div className='flex flex-col gap-8'>
          <div className='text-center'>
            <p className='text-4xl mb-2'>{finishData?.isPassed ? '🎉' : ':(('}</p>
            <h1>{finishData?.isPassed ? 'Chúc mừng bạn' : 'Không đủ điểm đậu'}</h1>
          </div>
          <div>
            <h2>Điểm: {finishData?.totalScore}</h2>
            <h2>
              Số câu đúng: {finishData?.correct} / {questions.length}
            </h2>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestDoingRoom;

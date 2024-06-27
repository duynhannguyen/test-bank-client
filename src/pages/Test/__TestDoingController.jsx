import { useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { alphabet } from '~/utils/constants';
import clsx from 'clsx';

const TestDoingController = ({ questions, studentAnswers, handleSubmit, finish }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (finish) {
      setIsFinished(true);
    }
  }, [finish]);

  const maxAnswersQuantity = useMemo(() => {
    return questions.reduce((max, question) => {
      if (question.answers.length > max) {
        return question.answers.length;
      } else {
        return max;
      }
    }, 4);
  }, [questions]);
  return (
    <div className='w-full flex flex-col gap-4 mx-auto'>
      <BlockSectionWrapper>
        <div className='flex flex-col gap-1 p-4'>
          <div className='flex gap-1 border-b-[2px] mb-4'>
            {Array.from({ length: maxAnswersQuantity + 1 }).map((_, index) => (
              <div
                key={index}
                className='flex items-center justify-center w-[calc(20%-4px*4/5)] h-8 font-bold'
              >
                {index > 0 ? alphabet[index - 1] : ''}
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-1'>
            {questions.map((question, questionIndex) => (
              <div key={question._id} className='flex gap-1'>
                {Array.from({ length: maxAnswersQuantity + 1 }).map((_, answerIndex) => (
                  <div
                    key={answerIndex}
                    className={clsx(
                      'flex items-center justify-center w-[calc(20%-4px*4/5)] h-10 font-bold',
                      {
                        'bg-blue-50 text-green-500 font-bold text-2xl':
                          (answerIndex <= question.answers.length) & (answerIndex !== 0)
                      }
                    )}
                  >
                    {answerIndex === 0
                      ? `Câu ${questionIndex + 1}`
                      : studentAnswers &&
                        question.answers[answerIndex - 1]?.id ===
                          studentAnswers[questionIndex]?.answer?.id &&
                        question.answers[answerIndex - 1]?.id &&
                        '✔'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </BlockSectionWrapper>
      <BlockSectionWrapper>
        <Button
          type='primary'
          size='large'
          className='w-full'
          onClick={handleSubmit}
          disabled={isFinished}
        >
          {!isFinished ? 'Nộp bài' : 'Đã nộp bài'}
        </Button>
      </BlockSectionWrapper>
    </div>
  );
};

export default TestDoingController;

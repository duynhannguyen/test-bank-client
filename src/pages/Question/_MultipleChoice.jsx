import { useEffect, useState } from 'react';
import parser from 'html-react-parser';
import { Button, Divider, notification } from 'antd';
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { alphabet } from '~/utils/constants';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const MultipleChoice = ({
  question,
  readOnly,
  handleSetAnswer,
  showResult,
  isDoingTest,
  chooseAnswer
}) => {
  const [choosed, setChoosed] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isResultShow, setIsResultShow] = useState(false);
  const [notiApi, contextHolder] = notification.useNotification({ stack: 1 });

  useEffect(() => {
    if (!chooseAnswer) return;
    setChoosed(chooseAnswer?.id);
    const timer = setTimeout(() => {
      handleGetResult();
    }, 0);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseAnswer]);

  useEffect(() => {
    if (showResult) {
      handleGetResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult]);

  const onChooseAnswer = (id, index) => {
    if (readOnly) return;
    if (isResultShow) return;
    if (id === choosed) {
      setChoosed(null);
      openNotification('info', 'Bỏ chọn');
      handleSetAnswer(null);
    } else {
      setChoosed(id);
      openNotification('success', `Chọn ${alphabet[index]}`);
      handleSetAnswer({ id, index });
    }
  };

  const openNotification = (type, message, placement) => {
    notiApi[type]({
      message,
      placement: placement ?? 'bottomRight'
    });
  };

  const handleGetResult = () => {
    setIsResultShow(true);
    const correctAnswer = question.answers.find(answer => answer.isCorrect);
    if (!correctAnswer) return;
    if (correctAnswer.id === choosed) setIsCorrect(true);
  };

  const handleReset = () => {
    setChoosed(null);
    setIsCorrect(false);
    setIsResultShow(false);
  };

  return (
    <BlockSectionWrapper>
      <div className='flex flex-col gap-8 p-8 text-base'>
        <div className='min-h-[64px] flex flex-col justify-end'>
          <p className='mb-2'>{parser(question.topic)}</p>
          <Divider className='my-0' />
        </div>
        <div className='flex flex-col gap-4'>
          {Array.isArray(question.answers) &&
            question.answers.map((answer, index) => {
              const isCorrectAnswer = isResultShow && isCorrect && answer.id === choosed;
              const isUnCorrectAnswer = isResultShow && !isCorrect && answer.id === choosed;
              return (
                <div
                  key={answer.id}
                  className='w-fit flex items-center gap-4 cursor-pointer'
                  onClick={() => onChooseAnswer(answer.id, index)}
                >
                  {!readOnly &&
                    (choosed === answer.id ? (
                      <MdOutlineRadioButtonChecked
                        className={clsx('text-xl', {
                          'text-blue-500': !isUnCorrectAnswer,
                          'text-red-500': isUnCorrectAnswer
                        })}
                      />
                    ) : (
                      <MdOutlineRadioButtonUnchecked
                        className={clsx('text-xl text-gray-300', {
                          'hover:text-blue-500': !isResultShow
                        })}
                      />
                    ))}
                  <div
                    className={clsx(
                      'relative flex py-1 before:w-0 before:h-[1px] before:absolute before:left-0 before:bottom-[-1px] before:duration-500',
                      {
                        'text-red-500 before:bg-red-500 before:w-full': isUnCorrectAnswer,
                        'text-blue-500 before:bg-blue-500 before:w-full': isCorrectAnswer
                      }
                    )}
                  >
                    <span className='w-6'>{alphabet[index]}.</span>
                    <span>{parser(answer.content)}</span>
                  </div>
                </div>
              );
            })}
        </div>
        {choosed && !isDoingTest && (
          <div className='flex gap-3'>
            <Button type='primary' disabled={isResultShow} onClick={handleGetResult}>
              Trả lời
            </Button>
            {isResultShow && (
              <Button type='primary' onClick={handleReset}>
                Trở về
              </Button>
            )}
          </div>
        )}
        {readOnly && (
          <Link
            to={`/question/${question._id}`}
            className='flex justify-center items-center gap-3 text-center'
          >
            <span>Đến trang câu hỏi</span>
            <BsArrowRight />
          </Link>
        )}
      </div>
      {contextHolder}
    </BlockSectionWrapper>
  );
};

export default MultipleChoice;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import QuestionImg from '~/assets/symbols/create-question.png';
import TestImg from '~/assets/symbols/create-test.png';
import QuizImg from '~/assets/symbols/create-quiz.png';
import { END_POINT, PATH } from '~/routes';
import TestAPI from '~/services/testAPI';

const Create = () => {
  const [hovering, setHovering] = useState(null);
  const navigate = useNavigate();

  const handleCreateTest = async () => {
    const res = await TestAPI.create();
    navigate(`${PATH.CREATE(END_POINT.CREATE_TEST)}/${res.data.id}`);
  };

  const creatingType = [
    {
      title: 'Câu hỏi, bài tập',
      symbol: QuestionImg,
      onClick: () => navigate(PATH.CREATE(END_POINT.CREATE_QUESTION))
    },
    {
      title: 'Đề thi, kiểm tra',
      symbol: TestImg,
      onClick: handleCreateTest
    },
    {
      title: 'Game trắc nghiệm',
      symbol: QuizImg,
      onClick: () => navigate(PATH.CREATE(END_POINT.CREATE_QUIZ_GAME))
    }
  ];

  return (
    <div className='w-[600px] flex gap-x-8'>
      {creatingType.map(item => {
        const isHovering = hovering === item.title;
        return (
          <div
            key={item.title}
            className={clsx(
              'w-[calc(33.33%-32px*2/3)] flex flex-col items-center gap-4 cursor-pointer overflow-hidden rounded-md border-[3px] duration-500',
              {
                'border-[#2563EB]/60': !isHovering,
                'border-[#2563EB]': isHovering
              }
            )}
            onClick={item.onClick}
            onMouseEnter={() => setHovering(item.title)}
            onMouseLeave={() => setHovering(null)}
          >
            <div
              className={clsx('w-full aspect-square', {
                'bg-gray-50/10': !isHovering,
                'bg-gray-50/20': isHovering
              })}
            >
              <img src={item.symbol} alt={item.title} className='w-full' />
            </div>
            <h3
              className={clsx('pb-2', {
                'text-white/60': !isHovering,
                'text-white': isHovering
              })}
            >
              {item.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Create;

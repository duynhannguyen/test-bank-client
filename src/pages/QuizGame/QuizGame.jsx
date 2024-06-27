import { useState } from 'react';
import { socket } from '~/components/Socket/Socket';
import SimpleHeader from '~/layouts/SimpleHeader';
import { IoTriangle } from 'react-icons/io5';
import { CgShapeRhombus } from 'react-icons/cg';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegSquare } from 'react-icons/fa';
const QuizGame = () => {
  const [answer, setAnswer] = useState('');
  const [checkId, setCheckId] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const questionList = [
    { id: 'q1', content: 'A = 2', value: 2, icon: <IoTriangle /> },
    { id: 'q2', content: 'B = 3', value: 3, icon: <CgShapeRhombus /> },
    { id: 'q3', content: 'C = 4', value: 4, icon: <FaRegCircle /> },
    { id: 'q4', content: 'D = 5', value: 5, icon: <FaRegSquare /> }
  ];
  const color = [{ bg: 'red-500' }, { bg: 'blue-500' }, { bg: 'yellow-500' }, { bg: 'green-500' }];

  const questionListWithColor = questionList.map((question, index) => {
    const colorKey = Object.keys(color[index]);
    const colorValue = Object.values(color[index]);
    return { ...question, [colorKey]: colorValue };
  });
  const sendAnswer = (e, id) => {
    setAnswer(e.target.value);
    setCheckId(id);
    setClickCount(clickCount + 1);

    socket.emit('send-answer', { id, clickCount });
  };

  socket.on('recevice-answer', answer => {
    setCheckId(answer.id);

    console.log(answer);
  });
  return (
    <div>
      <SimpleHeader />
      <div className='text-center text-6xl my-4 '> QuizGame</div>
      <div className='  flex items-center justify-center mb-12    '>
        <div> </div>
        <div className=' w-[1000px] align-middle rounded-md shadow  text-center leading-[70px] bg-slate-400/20'>
          1 + 1 = ?
        </div>
      </div>
      <div></div>
      <div className='w-[1000px] grid  grid-rows-2 grid-cols-2 grid-flow-row gap-6 m-auto '>
        {questionListWithColor.map(list => {
          return (
            <label key={list.id} className='' htmlFor={list.id}>
              <div className={`h-[70px] bg-${list.bg} flex items-center  `}>
                <div className='mr-4  '> {list.icon} </div>{' '}
                <div className='mr-8'>{list.content} </div>
                <input
                  checked={checkId === list.id}
                  onChange={e => sendAnswer(e, list.id)}
                  value={list.value}
                  id={list.id}
                  type='checkbox'
                />
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuizGame;

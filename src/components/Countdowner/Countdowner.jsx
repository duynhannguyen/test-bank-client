import Countdown from 'react-countdown';
import BlockSectionWrapper from '../BlockSectionWrapper';
import { Progress } from 'antd';
import { useEffect, useRef } from 'react';

const Countdowner = ({ limitTime, createdAt, icon, stop }) => {
  const countdownRef = useRef();

  useEffect(() => {
    if (stop) {
      countdownRef.current.pause();
    }
  }, [stop]);

  const renderer = ({ total, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <p>Hết giờ</p>;
    } else {
      return (
        <div className='flex flex-col'>
          <div className='flex gap-8 font-bold text-4xl p-4'>
            {icon && <p>⌛</p>}
            <span>
              {hours}:{minutes}:{seconds}
            </span>
          </div>
          <Progress
            strokeLinecap='round'
            percent={(total * 100) / (limitTime * 60 * 1000)}
            showInfo={false}
          />
        </div>
      );
    }
  };

  return (
    <BlockSectionWrapper>
      <div className='flex flex-col gap-4 p-4'>
        <Countdown
          ref={countdownRef}
          date={new Date(createdAt).getTime() + limitTime * 60 * 1000}
          renderer={renderer}
        />
      </div>
    </BlockSectionWrapper>
  );
};

export default Countdowner;

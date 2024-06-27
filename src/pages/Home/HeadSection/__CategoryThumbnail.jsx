import clsx from 'clsx';
import { useState } from 'react';

const CategoryThumbnail = props => {
  const { title, thumbnail, className, onMouseEnter, onMouseLeave } = props;
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    onMouseEnter();
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    setIsHovering(false);
  };

  return (
    <div
      className={clsx('flex flex-col items-center gap-4 cursor-pointer', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='border-[3px] border-white/40 rounded-[22px] p-[3px]'>
        <div className='w-full h-full rounded-[17px] relative overflow-hidden'>
          <img
            src={thumbnail}
            alt={title}
            className={clsx('w-full h-full object-cover', { 'scale-125 duration-500': isHovering })}
          />
        </div>
      </div>
      <h4 className='font-bold opacity-80'>{title}</h4>
    </div>
  );
};

export default CategoryThumbnail;

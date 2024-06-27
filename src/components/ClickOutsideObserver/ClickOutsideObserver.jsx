import { useEffect, useRef } from 'react';

const UnmountOnClickOutside = ({ children, onClickOutside }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={elementRef} className='w-full'>{children}</div>;
};

export default UnmountOnClickOutside;

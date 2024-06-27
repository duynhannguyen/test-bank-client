import clsx from 'clsx';

const BlockSectionWrapper = ({ children, title, className }) => {
  return (
    <div className={clsx('rounded-md bg-white shadow-xl', className)}>
      {title && (
        <div className='p-4 rounded-t-md'>
          <h3 className='font-bold'>{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default BlockSectionWrapper;

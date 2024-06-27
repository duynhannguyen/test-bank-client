import PropTypes from 'prop-types';
import clsx from 'clsx';

const Container = ({ children, className }) => {
  return (
    <div
      className={clsx('w-full max-w-screen-2xl lg:px-[5%] px-4 2xl:px-1 mx-auto', {
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Container;

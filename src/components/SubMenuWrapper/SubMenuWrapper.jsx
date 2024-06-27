import { Divider, Popover } from 'antd';

const SubMenuWrapper = ({
  children,
  trigger,
  title,
  content,
  color = 'black',
  placement = 'bottomLeft',
  style,
  arrow = true
}) => {
  return (
    <Popover
      trigger={trigger}
      content={
        content ? (
          <>
            {title && <Divider className='bg-slate-100/20 my-3' />}
            {content}
          </>
        ) : undefined
      }
      title={title ? <p className='text-white font-bold'>{title}</p> : undefined}
      color={color}
      overlayInnerStyle={{ padding: '18px', ...style }}
      placement={placement}
      arrow={arrow}
    >
      {children}
    </Popover>
  );
};

export default SubMenuWrapper;

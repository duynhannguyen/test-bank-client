import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FaRegImage } from 'react-icons/fa6';
import QuillEditor from './QuillEditor';
import ClickOutsideObserver from '../ClickOutsideObserver';
import TextArea from 'antd/es/input/TextArea';

const UploadImageButton = () => (
  <Button
    icon={<FaRegImage className='text-xl' />}
    className={clsx(
      'absolute left-[calc(656px+6px)] bottom-0 translate-y-[calc(100%+8px)]',
      'flex items-center text-gray-500 h-[43.38px]',
      'bg-transparent border border-[#ccc] rounded-none cursor-pointer'
    )}
  >
    UPLOAD
  </Button>
);

const ContentField = ({
  noQuill,
  value,
  onChange,
  textarea,
  placeholder,
  transparent,
  isError,
  refreshField,
  labelClicked,
  allowUploadImage,
  stylesForNoQuill,
  propsForNoQuill
}) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isToolbarExtending, setisToolbarExtending] = useState(false);

  useEffect(() => {
    if (!isFocusing || isError) return;
    setisToolbarExtending(true);
  }, [isFocusing, isError]);

  const onInputField = () => {
    if (!isError) return;
    refreshField();
  };

  const customClasses = textarea
    ? 'border-b-[3px] before:h-[3px] before:bottom-[-3px]'
    : 'border-b-[2px] before:h-[2px] before:bottom-[-2px]';

  const inputProps = {
    value,
    placeholder,
    onChange,
    onFocus: () => setIsFocusing(true),
    onBlur: () => setIsFocusing(false),
    onKeyDown: onInputField
  };

  return (
    <>
      <ClickOutsideObserver onClickOutside={() => setisToolbarExtending(false)}>
        <div
          className={clsx('flex flex-col w-full mb-4 duration-500', {
            'mb-[88px]': isToolbarExtending && !noQuill
          })}
        >
          <div
            className={clsx(
              'relative w-full outline-none rounded-t-md before:absolute before:left-1/2 before:-translate-x-1/2 before:bg-[#2563EB] before:opacity-0',
              customClasses,
              {
                'bg-[#ccc]/20': !isFocusing && !transparent,
                'border-b-[#ccc]/60 before:w-0': !isFocusing,
                'before:w-[calc(100%+2px)] before:opacity-100 before:duration-700': isFocusing,
                'bg-blue-50/50 shadow-input-blue before:bg-[#2563EB]': isFocusing && !isError,
                'bg-red-50 shadow-input-red before:w-[calc(100%+2px)] before:opacity-100 before:bg-red-400':
                  isError
              }
            )}
          >
            {!noQuill && (
              <>
                <QuillEditor
                  {...inputProps}
                  textarea={textarea}
                  isToolbarExtending={isToolbarExtending}
                  labelClicked={labelClicked}
                />
                {isToolbarExtending && allowUploadImage && <UploadImageButton />}
              </>
            )}
            {noQuill && (
              <TextArea
                {...inputProps}
                status={isError ? 'error' : undefined}
                className={clsx('border-none shadow-none rounded-b-none rounded-t-md text-base', {
                  'bg-blue-50': isFocusing && !isError,
                  'bg-red-50': isError
                })}
                style={stylesForNoQuill}
                {...propsForNoQuill}
              />
            )}
          </div>
          {isError && (
            <div className='mt-1 flex items-center gap-1 text-red-400'>
              <ExclamationCircleOutlined />
              <p>Trường dữ liệu không hợp lệ</p>
            </div>
          )}
        </div>
      </ClickOutsideObserver>
    </>
  );
};

export default ContentField;

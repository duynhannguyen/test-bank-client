import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md';
import { alphabet } from '~/utils/constants';
import ContentField from '~/components/ContentField';
import { CreateQuestionContext } from '..';

const MultipleChoiceAnswerField = ({
  index,
  id,
  value,
  isCorrect,
  isError,
  onInputChange,
  refreshField
}) => {
  const { isCorrectRequired, handleSetCorrect, handleDeleteAnswer } =
    useContext(CreateQuestionContext);
  const [labelClicked, setLabelClicked] = useState(false);

  useEffect(() => {
    if (labelClicked) {
      setLabelClicked(false);
    }
  }, [labelClicked]);

  return (
    <div className='flex items-start gap-1 w-full'>
      <div className='flex items-center gap-4 pt-1'>
        <Button
          className='flex items-center w-fit h-fit rounded-full border-none p-0'
          onClick={() => handleSetCorrect(id)}
        >
          {isCorrect ? (
            <MdCheckCircle className='text-xl text-blue-600' />
          ) : (
            <MdRadioButtonUnchecked
              className={clsx('text-xl rounded-full', {
                'text-[#ccc]/50': !isCorrectRequired,
                'text-red-500 bg-red-50': isCorrectRequired
              })}
            />
          )}
        </Button>
        <h4 className='w-7 text-xl cursor-default' onClick={() => setLabelClicked(true)}>
          {alphabet[index]}.
        </h4>
      </div>
      <div className='w-[calc(100%-64px-26px)]'>
        <ContentField
          value={value}
          onChange={value => onInputChange(id, value)}
          isError={isError}
          transparent
          refreshField={refreshField}
          labelClicked={labelClicked}
        />
      </div>
      <div className='pl-1 pt-1'>
        <Popconfirm
          title='Xóa đáp án'
          description='Bạn chắc chắn muốn xóa đáp án này?'
          okText='Xóa'
          cancelText='Đóng'
          okButtonProps={{ danger: true }}
          onConfirm={() => handleDeleteAnswer(id)}
        >
          <CloseOutlined className='cursor-pointer opacity-60 hover:opacity-100' />
        </Popconfirm>
      </div>
    </div>
  );
};

export default MultipleChoiceAnswerField;

import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { FaClipboardQuestion } from 'react-icons/fa6';
import { useContext, useEffect, useMemo, useState } from 'react';
import { QUESTION_TYPE } from '~/utils/constants';
import { Button, Divider, InputNumber } from 'antd';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { CreateTestContext } from './TestCreator';
import clsx from 'clsx';

const initStatistical = [
  { value: QUESTION_TYPE.CHOICE, title: 'Trắc nghiệm', quantity: 0, color: 'blue' },
  { value: QUESTION_TYPE.CHECK, title: 'Hộp kiểm', quantity: 0, color: 'orange' },
  { value: QUESTION_TYPE.ESSAY, title: 'Tự luận', quantity: 0, color: 'green' }
];

const TestCreatorController = () => {
  const { test, questions } = useSelector(state => state.test);
  const [statistical, setStatistical] = useState(initStatistical);
  const { overviewValue, onOverviewInputChange, testStaring, handleStart, handleCancelStart } =
    useContext(CreateTestContext);
  const { scores } = overviewValue;

  useEffect(() => {
    const updatedStatistical = statistical.map(type => {
      const thisTypeQuestions = questions.filter(question => question.type === type.value);
      return { ...type, quantity: thisTypeQuestions.length };
    });
    setStatistical(updatedStatistical);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const onScoreChange = (id, score) => {
    const updatedScores = { ...scores };
    if (score !== 0) {
      updatedScores[id] = score;
    } else {
      updatedScores[id] = null;
    }
    onOverviewInputChange('scores', updatedScores);
  };

  const scoreTotal = useMemo(() => {
    const scores = Object.values(overviewValue.scores);
    return scores.reduce((total, value) => total + value, 0);
  }, [overviewValue.scores]);

  return (
    <div className='flex flex-col gap-4 sticky right-0 top-8'>
      {test && !test?.isActived && (
        <>
          <BlockSectionWrapper>
            <Button type='primary' className='w-full h-[56px] font-bold' onClick={handleStart}>
              Tổ chức thi/kiểm tra
            </Button>
          </BlockSectionWrapper>
          {testStaring && (
            <BlockSectionWrapper>
              <Button
                icon={<ReloadOutlined />}
                type='text'
                className='w-full h-[56px] font-bold'
                onClick={handleCancelStart}
              >
                Trở về
              </Button>
            </BlockSectionWrapper>
          )}
        </>
      )}

      {test && test?.isActived && (
        <BlockSectionWrapper>
          <Button type='primary' className='w-full h-[56px] font-bold' onClick={handleStart}>
            Quản lý tổ chức thi
          </Button>
        </BlockSectionWrapper>
      )}

      <BlockSectionWrapper title='Tổng quan'>
        <div className='px-4 pb-4'>
          <div className='flex flex-col gap-4'>
            {statistical.map(type => {
              if (type.quantity === 0) return null;
              return (
                <div key={type.value}>
                  <div className='flex justify-between'>
                    <p>{type.title}</p>
                    <p style={{ color: type.color }}>{type.quantity}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <span
                      className='block h-1'
                      style={{
                        width: `${(type.quantity * 100) / questions.length}%`,
                        backgroundColor: type.color
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
            <div className='flex justify-between items-center mt-4'>
              <div className='flex items-center gap-1'>
                <FaClipboardQuestion className='text-base' />
                <h4>Tổng số:</h4>
              </div>
              <h4>{questions.length} câu</h4>
            </div>
          </div>
        </div>
      </BlockSectionWrapper>
      <BlockSectionWrapper title='Cấu trúc'>
        <div className='flex flex-col gap-4 px-4 pb-4'>
          {questions &&
            questions.map((question, index) => {
              let shortTopic = question.topic.slice(3, question.topic.length - 4);
              shortTopic = shortTopic.slice(0, 13);
              return (
                <div key={question._id} className='flex justify-between'>
                  <Button
                    type='text'
                    href={`#${question._id}`}
                    icon={<MdOutlineRadioButtonChecked />}
                    className='px-2'
                  >
                    {index + 1}. {shortTopic}...
                  </Button>
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    value={scores[question._id]}
                    onChange={value => onScoreChange(question._id, value)}
                    status={testStaring && !scores[question._id] ? 'error' : undefined}
                    className={clsx({ 'bg-red-50': testStaring && !scores[question._id] })}
                  />
                </div>
              );
            })}
          <div>
            <Divider />
            <div className='flex justify-between'>
              <h3>Tổng điểm:</h3>
              <h3>{scoreTotal}</h3>
            </div>
          </div>
        </div>
      </BlockSectionWrapper>
    </div>
  );
};

export default TestCreatorController;

import { useContext, useMemo, useState } from 'react';
import { GoBook } from 'react-icons/go';
import { PiStudent } from 'react-icons/pi';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import ContentField from '~/components/ContentField';
import { Popconfirm, Select } from 'antd';
import { getSubjectOptions } from '~/utils/helper';
import { CreateTestContext } from './TestCreator';
import clsx from 'clsx';
import TestAPI from '~/services/testAPI';
import { useSelector } from 'react-redux';

const TestOverviewSection = () => {
  const { test } = useSelector(state => state.test);
  const { overviewValue, onOverviewInputChange, testStaring } = useContext(CreateTestContext);
  const [subjectSelectedValue, setSubjectSelectedValue] = useState(null);
  const [gradeSelectedValue, setGrandeSelectionValue] = useState(null);

  const subjectOptions = useMemo(() => getSubjectOptions(), []);

  const gradeOptions = [
    { value: 'TS10', label: 'Tuyển sinh 10 chuyên' },
    { value: '10', label: 'Lớp 10' },
    { value: '11', label: 'Lớp 11' },
    { value: '12', label: 'Lớp 12' },
    { value: 'THPTQG', label: 'Thi THPTQG' },
    { value: 'HSG', label: 'Thi Học Sinh Giỏi' }
  ];

  const handleUpdateCommonField = async name => {
    let fields = {};
    if (name === 'subject') fields.subject = subjectSelectedValue;
    if (name === 'grade') fields.grade = gradeSelectedValue;

    try {
      await TestAPI.updateCommonFields(test._id, fields);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const selectedGradeLebel = useMemo(() => {
    const filtedOption = gradeOptions.filter(item => item.value === gradeSelectedValue);
    return filtedOption[0]?.label;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeSelectedValue]);

  const selectedGradeArray = useMemo(
    () => gradeOptions.filter(item => item.value === overviewValue.grade),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overviewValue.grade]
  );

  return (
    <BlockSectionWrapper>
      <div className='flex flex-col gap-4 py-4 px-6 rounded-md'>
        <ContentField
          transparent
          textarea
          value={overviewValue.title}
          onChange={e => onOverviewInputChange('title', e.target.value)}
          placeholder='Đề chưa có tên'
          noQuill
          stylesForNoQuill={{ fontSize: '32px', fontWeight: 'bold' }}
          propsForNoQuill={{ autoSize: { minRows: 1, maxRows: 2 } }}
          isError={testStaring && overviewValue.title === ''}
        />
        <ContentField
          transparent
          value={overviewValue.description}
          onChange={e => onOverviewInputChange('description', e.target.value)}
          placeholder='Mô tả'
          noQuill
          propsForNoQuill={{ autoSize: { minRows: 1, maxRows: 5 } }}
        />
        <div className='flex gap-8 mb-6'>
          <div className='flex items-center gap-2'>
            <GoBook className='text-xl' />
            <div
              className={clsx('border-b-[2px]', {
                'border-b-[#ccc]/60': !testStaring || overviewValue.subject,
                'border-red-500': testStaring && !overviewValue.subject
              })}
            >
              <Popconfirm
                open={subjectSelectedValue !== null}
                title='Chọn môn học'
                description={
                  <p>
                    Sau khi chọn không thể thay đổi. <br />
                    Bạn chắc chắn chọn môn{' '}
                    <span className='font-bold italic'>{subjectSelectedValue}</span>?
                  </p>
                }
                okText='Xác nhận'
                cancelText='Hủy'
                onConfirm={async () => {
                  onOverviewInputChange('subject', subjectSelectedValue);
                  await handleUpdateCommonField('subject');
                  setSubjectSelectedValue(null);
                }}
                onCancel={() => setSubjectSelectedValue(null)}
              >
                <Select
                  options={!overviewValue.subject ? subjectOptions : undefined}
                  placeholder='Môn học'
                  bordered={false}
                  className={clsx('w-60 rounded-t-md', {
                    'bg-red-50': testStaring && !overviewValue.subject
                  })}
                  value={overviewValue.subject}
                  onChange={value => setSubjectSelectedValue(value)}
                />
              </Popconfirm>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <PiStudent className='text-xl' />
            <div
              className={clsx('border-b-[2px]', {
                'border-b-[#ccc]/60': !testStaring || overviewValue.grade,
                'border-red-500': testStaring && !overviewValue.grade
              })}
            >
              <Popconfirm
                open={gradeSelectedValue !== null}
                title='Chọn đối tượng'
                description={
                  <p>
                    Sau khi chọn không thể thay đổi. <br />
                    Bạn chắc chắn chọn đối tượng{' '}
                    <span className='font-bold italic'>{selectedGradeLebel}</span>?
                  </p>
                }
                okText='Xác nhận'
                cancelText='Hủy'
                onConfirm={async () => {
                  onOverviewInputChange('grade', gradeSelectedValue);
                  await handleUpdateCommonField('grade');
                  setGrandeSelectionValue(null);
                }}
                onCancel={() => setGrandeSelectionValue(null)}
              >
                <Select
                  options={!overviewValue.grade ? gradeOptions : selectedGradeArray}
                  placeholder='Đối tượng'
                  bordered={false}
                  className={clsx('w-60 rounded-t-md', {
                    'bg-red-50': testStaring && !overviewValue.grade
                  })}
                  value={overviewValue.grade}
                  onChange={value => setGrandeSelectionValue(value)}
                />
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </BlockSectionWrapper>
  );
};

export default TestOverviewSection;

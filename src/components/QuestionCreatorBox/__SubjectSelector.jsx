import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useContext, useMemo } from 'react';
import { CreateQuestionContext } from '.';
import { getSubjectOptions } from '~/utils/helper';

const SubjectSelector = () => {
  const { controlValue, handleChangeControlValue, isSubjectRequired } =
    useContext(CreateQuestionContext);

  const options = useMemo(() => getSubjectOptions(), []);

  return (
    <Select
      options={options}
      value={controlValue.subject}
      onChange={value => handleChangeControlValue('subject', value)}
      className='h-[56px]'
      suffixIcon={<CaretDownOutlined />}
      placeholder='Chọn môn'
      status={isSubjectRequired ? 'error' : undefined}
    />
  );
};

export default SubjectSelector;

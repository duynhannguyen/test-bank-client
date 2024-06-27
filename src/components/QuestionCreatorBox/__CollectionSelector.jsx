import { useContext, useMemo } from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { CreateQuestionContext } from '.';

const CollectionSelector = () => {
  const { controlValue, handleChangeControlValue } = useContext(CreateQuestionContext);
  const { collections } = useSelector(state => state.collection);

  const options = useMemo(() => {
    const labelClasses = 'flex items-center w-full h-[40px]';
    const collectionOptions = collections.map(collection => ({
      value: collection._id,
      label: <div className={labelClasses}>{collection.name}</div>
    }));
    return collectionOptions;
  }, [collections]);

  return (
    <Select
      placeholder='Chọn bộ sưu tập'
      options={options}
      value={controlValue.collection}
      onChange={value => handleChangeControlValue('collection', value)}
      className='w-full h-[56px]'
      suffixIcon={<CaretDownOutlined />}
      listHeight='fit-content'
    />
  );
};

export default CollectionSelector;

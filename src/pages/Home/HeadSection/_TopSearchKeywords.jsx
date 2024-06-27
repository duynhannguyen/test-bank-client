import { Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { topSearchKeywords } from './_rendering';

const TopSearchKeywords = () => {
  return (
    <div className='flex justify-center gap-1 z-10'>
      {topSearchKeywords.map(searchKey => (
        <Tag
          key={searchKey}
          icon={<SearchOutlined className='text-white' />}
          className='py-1 px-2 text-white bg-white/20 hover:bg-white/30 font-bold border-transparent cursor-pointer'
        >
          {searchKey}
        </Tag>
      ))}
    </div>
  );
};

export default TopSearchKeywords;

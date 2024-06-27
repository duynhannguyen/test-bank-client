import { Button, Divider, Select, notification, message } from 'antd';
import { SearchOutlined, CloseOutlined, BulbOutlined } from '@ant-design/icons';
import { useState } from 'react';
import homePageAPI from '~/services/homePageAPI';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, duration = 3) => {
    api[type]({
      message: ' Oops!! Lỗi',
      description: message,
      duration: duration
    });
  };

  const onHandleSubmitSearch = async e => {
    e.preventDefault();
    if (searchValue === '') {
      return;
    }
    try {
      const getSearchValue = await homePageAPI.HomeSearch({ searchValue });
      const { objSearch, result } = getSearchValue.data;
      const idEndPoint = result.findIndex(response => response._id === searchValue);
      if (objSearch === 'question') {
        return navigate(`/question/${result[idEndPoint]._id}`);
      }
      if (objSearch === 'test') {
        return navigate(`/test/${result[idEndPoint]._id} `);
      }
    } catch (error) {
      openNotificationWithIcon('error', error.message);
    } finally {
      setSearchValue('');
    }
  };
  return (
    <div className='flex justify-between gap-3 h-[54px] lg:w-[65%] mx-auto z-10'>
      {contextHolder}
      <div className='flex-grow flex justify-between bg-white rounded-md'>
        <Select
          defaultValue={''}
          options={[
            {
              value: '',
              label: 'Tìm câu hỏi/bài thi'
            }
          ]}
          bordered={false}
          className='w-[180px] h-full'
          open={false}
        />
        <Divider type='vertical' className='h-[60%] m-auto bg-slate-200' />
        <form onSubmit={e => onHandleSubmitSearch(e)} className='flex-grow flex justify-between'>
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className='flex-grow h-full px-4 outline-none text-black focus:outline-none'
            placeholder='Nhập id câu hỏi hoặc đề thi (Vd: 65aaca65a0111c6ceb12fbd5 ) '
          />
          <div className='flex gap-4'>
            {searchValue.length > 0 && (
              <CloseOutlined
                onClick={() => setSearchValue('')}
                className='text-black cursor-pointer opacity-50 hover:opacity-100'
              />
            )}
            <div className='p-1.5'>
              <button
                type='submit'
                className='h-full w-[calc(54px-2*1.5*4px)] bg-[#2E5FD0] hover:bg-[#336aea] rounded-md cursor-pointer'
              >
                <SearchOutlined
                  className='text-white'
                  style={{ strokeWidth: '36', stroke: 'white' }}
                />
              </button>
              {}
            </div>
          </div>
        </form>
      </div>
      <Button className='flex items-center h-full'>
        <BulbOutlined className='text-xl' />
        <span className='px-2'>Danh mục đề gợi ý</span>
      </Button>
    </div>
  );
};

export default SearchBar;

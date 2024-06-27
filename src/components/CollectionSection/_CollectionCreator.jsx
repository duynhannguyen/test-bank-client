import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Divider, Form, Input } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CollectionAPI from '~/services/collectionAPI';
import { fetchCollections } from '~/redux/collection/collectionAction';

const CollectionCreator = () => {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();

  const handleCreateForm = async value => {
    try {
      await CollectionAPI.create(value);
      setOpenForm(false);
      dispatch(fetchCollections());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <div className='p-4 pt-0'>
        {!openForm && (
          <Button
            type='text'
            icon={<PlusOutlined />}
            className='w-full h-[56px] text-left bg-gray-100 mb-2'
            onClick={() => setOpenForm(true)}
          >
            Thêm bộ sưu tập
          </Button>
        )}
        {openForm && (
          <Form onFinish={handleCreateForm}>
            <div className='flex flex-col gap-2'>
              <Form.Item
                name='name'
                rules={[{ required: true, message: 'Nhập tên bộ sưu tập' }]}
                className='m-0'
              >
                <Input placeholder='Tên bộ sưu tập mới' className='h-[56px] rounded-sm' autoFocus />
              </Form.Item>
              <div className='flex items-center gap-2'>
                <Button htmlType='submit' type='primary' className='w-fit h-[36px] rounded-sm'>
                  Thêm
                </Button>
                <CloseOutlined
                  className='text-black/40 hover:text-black cursor-pointer'
                  onClick={() => setOpenForm(false)}
                />
              </div>
            </div>
          </Form>
        )}
        <Divider className='mt-4 mb-0' />
      </div>
    </>
  );
};

export default CollectionCreator;

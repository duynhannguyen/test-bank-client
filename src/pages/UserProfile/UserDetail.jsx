import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePickerAntd from '~/components/DatePicker/DatePickerAntd.jsx';
import { StoreContext } from '~/context/storeContext/StoreContext';
import { fetchCurrentUser } from '~/redux/user/userAction';
import userAPI from '~/services/userProfileApi';

const UserDetail = () => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector(state => state.user);
  const [dayOfBirthValue, setDayOfBirthValue] = useState(currentUser.dayOfBirth || '24/11/2023');
  const { loading, setLoading, setContextError, dispatch } = useContext(StoreContext);
  useEffect(() => {
    form.setFieldValue('firstName', currentUser.firstName);
    form.setFieldValue('lastName', currentUser.lastName);
    form.setFieldValue('phoneNumber', currentUser.phoneNumber);
    form.setFieldValue('gender', currentUser.gender);
    form.setFieldValue('dayOfBirth', currentUser.dayOfBirth);
    form.setFieldValue('age', currentUser.age);
    form.setFieldValue('accountType', currentUser.accountType);
  }, [currentUser]);

  const onSubmitHandler = async values => {
    try {
      setLoading(true);
      const updateUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        dayOfBirth: values.dayOfBirth,
        age: values.age,
        accountType: values.accountType
      };
      await userAPI.updateInfo(currentUser._id, updateUser);
      dispatch(fetchCurrentUser());
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancleSubmit = () => {
    try {
      setLoading(true);
      dispatch(fetchCurrentUser());
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className='bg-white p-5 rounded  w-full h-auto shadow-user-profile '
      onFinish={onSubmitHandler}
      form={form}
    >
      <div className='bg-[#f8fafb] px-4 py-2 mb-8 shadow-user-profile rounded '>
        <div className='my-4  w-auto text-xl font-semibold'>Thông tin cơ bản</div>
        <div>
          <Form.Item name='firstName' label=''>
            <Input style={{ marginBottom: '30px' }} addonBefore='Họ:' />
          </Form.Item>
          <Form.Item name='lastName' label=''>
            <Input style={{ marginBottom: '30px' }} addonBefore='Tên:' />
          </Form.Item>
          <Form.Item name='phoneNumber' label=''>
            <Input style={{ marginBottom: '30px' }} addonBefore='Sđt:' />
          </Form.Item>
          <div className='mb-[30px]'>
            <Form.Item name='gender' label='Giới tính'>
              <Radio.Group>
                <Radio value='Nam'>Nam</Radio>
                <Radio value='Nữ'>Nữ</Radio>
                <Radio value='Khác'>Khác</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className='text-sm flex items-center gap-40 '>
            <div>
              <Form.Item name='dayOfBirth' label='Ngày sinh'>
                <DatePickerAntd
                  setDayOfBirthValue={setDayOfBirthValue}
                  dayOfBirthValue={dayOfBirthValue}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name='age' label='Tuổi'>
                <InputNumber min={13} max={150} />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#f8fafb] mb-8 px-4 py-2 shadow-user-profile rounded '>
        <div className='my-4  w-auto text-xl font-semibold'>Loại tài khoản</div>
        <div>
          <Form.Item name='accountType' label=''>
            <Radio.Group>
              <Radio value='Học viên'>Học viên</Radio>
              <Radio value='Giảng viên'>Giảng viên</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
      <div className='bg-[#f8fafb] mb-8 px-4 py-2 shadow-user-profile rounded '>
        <div className='my-4  w-auto text-xl font-semibold'>Thông tin tài khoản </div>
        <div>
          <span className=' block text-gray-400 italic '>
            {' '}
            Tài khoản đăng ký: {currentUser.email}{' '}
          </span>
          {/* <Form.Item name='passwprd' label=''>
            <Input style={{ marginBottom: '30px' }} addonBefore='Mật khẩu:' />
          </Form.Item> */}
          <span className='block text-gray-400 italic '> Mật khẩu</span>
        </div>
      </div>
      <div className='text-right'>
        <Button
          style={{ marginRight: '30px' }}
          htmlType='button'
          type='primary'
          onClick={onCancleSubmit}
          danger
        >
          Hủy bỏ
        </Button>
        <Button disabled={loading ? true : false} htmlType='submit' type='primary'>
          Lưu thay đổi
        </Button>
      </div>
    </Form>
  );
};

export default UserDetail;

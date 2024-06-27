import { useDispatch, useSelector } from 'react-redux';
import { GoBook } from 'react-icons/go';
import { PiStudent } from 'react-icons/pi';
import {
  Divider,
  Form,
  InputNumber,
  Select,
  Switch,
  Modal,
  Input,
  DatePicker,
  message
} from 'antd';
import TestAPI from '~/services/testAPI';
import { useEffect } from 'react';
import { fetchTestById } from '~/redux/test/testAction';
import { socket } from '~/components/Socket/Socket';

const limitTimeOptions = [
  { value: 15, label: '15 phút' },
  { value: 30, label: '30 phút' },
  { value: 45, label: '45 phút' },
  { value: 60, label: '60 phút' },
  { value: 90, label: '90 phút' },
  { value: 180, label: '180 phút' },
  { value: 'unlimit', label: 'Không giới hạn' }
];

const TestStartingForm = ({ open, onCancel, handleFetchTest, currentUser, overviewValue }) => {
  const { test } = useSelector(state => state.test);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!test?.isActived) return;
    const fields = {
      limitTime: test.limitTime,
      passScore: test.passScore,
      turns: test.turns,
      // activingDate: [f, f1],
      passWord: test.passWord,
      isReturnResult: test.isReturnResult
    };
    form.setFieldsValue(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  const handleStartTest = async formValue => {
    await handleFetchTest();
    // eslint-disable-next-line no-unused-vars
    const { questions, ...restTestValue } = test;
    const startedTest = { ...restTestValue, ...formValue, isActived: true };
    try {
      await TestAPI.updateTestById(test._id, startedTest);
      dispatch(fetchTestById(test._id));
      onCancel();
      message.success('Tổ chức thi thành công!');
      socket.emit('send-test-noti', {
        testId: test._id,
        testTitle: overviewValue.title,
        author: currentUser.lastName + ' ' + currentUser.firstName,
        authorId: currentUser._id
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText='Đăng'
      cancelText='Đóng'
    >
      <div className='flex flex-col gap-4'>
        <h1>{test.title}</h1>
        <div className='flex gap-16'>
          <div className='flex items-center gap-2'>
            <GoBook className='text-xl' />
            <h3>{test.subject}</h3>
          </div>
          <div className='flex items-center gap-2'>
            <PiStudent className='text-xl' />
            <h3>{test.subject}</h3>
          </div>
        </div>
        <Divider />
        <div>
          <Form form={form} onFinish={handleStartTest} className='w-full' layout='vertical'>
            <div className='w-full flex gap-4'>
              <Form.Item className='flex-1' name='limitTime' label='Thời gian làm bài'>
                <Select options={limitTimeOptions} />
              </Form.Item>
              <Form.Item className='flex-1' name='passScore' label='Điểm chuẩn'>
                <InputNumber className='w-full' min={0} max={10} />
              </Form.Item>
              <Form.Item className='flex-1' name='turns' label='Số lần được làm lại'>
                <InputNumber className='w-full' min={0} max={10} />
              </Form.Item>
            </div>
            <div>
              <Form.Item name='activingDate' label='Thời gian diễn ra'>
                <DatePicker.RangePicker showTime allowClear placeholder={['Bắt đầu', 'Kết thúc']} />
              </Form.Item>
            </div>
            <div>
              <Form.Item className='flex-1' name='studyGroup' label='Gửi tới nhóm'>
                <Select options={limitTimeOptions} />
              </Form.Item>
            </div>
            <div>
              <Form.Item className='flex-1' name='passWord' label='Mật khẩu truy cập'>
                <Input className='w-full' />
              </Form.Item>
            </div>
            <div>
              <Form.Item name='isReturnResult' label='Trả kết quả ngay'>
                <Switch />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default TestStartingForm;

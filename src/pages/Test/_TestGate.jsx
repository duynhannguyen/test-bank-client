import { Button, Col, Row } from 'antd';
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import { IoBookOutline } from 'react-icons/io5';
import Container from '~/components/Container';
import OnlineTestIMG from '~/assets/symbols/online-test.png';
import ContentField from '~/components/ContentField';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TestAPI from '~/services/testAPI';
import RecordAPI from '~/services/recordAPI';
import { socket } from '~/components/Socket/Socket';

const TestGate = ({ handleSetRecord, getRoomId }) => {
  const [password, setPassword] = useState('');
  const [testOverview, setTestOverview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchTestOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestOverview = async () => {
    try {
      const res = await TestAPI.getTestOverviewById(id);
      setTestOverview(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleDoTest = async e => {
    e.preventDefault();
    try {
      const res = await RecordAPI.create({ password, id });
      if (res.data.data) {
        handleSetRecord(res.data.data);
      }
      getRoomId(testOverview?.userId);
      socket.emit('enter-room', { roomId: testOverview?.userId });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='min-h-[calc(100vh-113px-60px)] justify-between items-center'>
          <Col span={12}>
            <img src={OnlineTestIMG} alt='Test Banking' className='w-full mix-blend-darken' />
          </Col>
          <Col span={12} className='mx-auto'>
            <div className='flex flex-col gap-24'>
              <div className='flex flex-col gap-6'>
                <p>Bài thi đang diễn ra</p>
                <h1 className='uppercase'>
                  {testOverview?.title !== '' ? testOverview?.title : `#${testOverview?._id}`}
                </h1>
                <div className='flex items-center gap-3'>
                  <UserOutlined />
                  <h3>
                    {testOverview?.user?.accountType}{' '}
                    <span className='font-bold'>
                      {testOverview?.user?.firstName} {testOverview?.user?.lastName}
                    </span>
                  </h3>
                </div>
                <div className='flex items-center gap-3'>
                  <IoBookOutline />
                  <h3>
                    Môn <span className='font-bold'>{testOverview?.subject}</span>
                  </h3>
                </div>
              </div>
              <form onSubmit={handleDoTest}>
                <div className='w-[480px]'>
                  <ContentField
                    noQuill
                    placeholder='Mật khẩu vào thi'
                    propsForNoQuill={{ autoSize: { minRows: 1, maxRows: 1 } }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <Button size='large' type='primary' htmlType='submit' className='w-fit'>
                  Bắt đầu thi
                  <ArrowRightOutlined />
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestGate;

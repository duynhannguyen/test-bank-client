import { Button, Divider, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { socket } from '~/components/Socket/Socket';
import SimpleHeader from '~/layouts/SimpleHeader';
import { addUser } from '~/redux/userInRoom/userInRoomSlice';
import QuizRoomAPI from '~/services/quizRoomAPI';
import { alphabet } from '~/utils/constants';

const QuizRoom = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [usersRoom, setUsersRoom] = useState([]);
  const { usersInRoom } = useSelector(state => state.userInRooms);
  console.log(usersInRoom);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  console.log(currentUser);
  useEffect(() => {
    fetchRoomData();
    socket.emit('add-user-to-room', { id, currentUser });
    socket.on('get-user-in-room', user => {
      if (Object.keys(user).length > 0) {
        dispatch(addUser(user));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchRoomData = async () => {
    try {
      const res = await QuizRoomAPI.getById(id);
      setRoomData(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <SimpleHeader />
      <div className='w-full h-[calc(100vh-113px)] p-8'>
        <h1>Tạo câu hỏi</h1>
        <div className='flex mt-8'>
          <div className='basis-1/4'>
            <Form>
              <Form.Item name='topic'>
                <TextArea placeholder='Câu hỏi' style={{ resize: 'none' }} rows={8} />
              </Form.Item>
              <Form.Item name='a' label='A'>
                <Input placeholder='Đáp án A' />
              </Form.Item>
              <Form.Item name='b' label='B'>
                <Input placeholder='Đáp án B' />
              </Form.Item>
              <Form.Item name='c' label='C'>
                <Input placeholder='Đáp án C' />
              </Form.Item>
              <Form.Item name='d' label='D'>
                <Input placeholder='Đáp án D' />
              </Form.Item>
              <Divider className='mt-16' />
              <Form.Item name='time' label='⌛'>
                <Input
                  type='number'
                  placeholder='Thời gian'
                  suffix='giây'
                  className='w-1/2'
                  min={0}
                  max={60}
                />
              </Form.Item>
              <Button type='primary' className='w-full' size='large'>
                Bắt đầu
              </Button>
            </Form>
          </div>
          <div className='basis-3/4'>
            <div>
              <h3>{roomData?.topic}</h3>
              <div className='flex gap-4 flex-wrap'>
                {roomData?.answers &&
                  roomData?.answers.map((answer, index) => (
                    <div key={answer} className='w-[calc(50%-16px/2)] border p-4'>
                      <p>
                        {alphabet[index]}. {answer}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          {usersInRoom.map(user => {
            return <span key={user._id}> {user.firstName + ' ' + user.lastName} </span>;
          })}
        </div>
      </div>
    </>
  );
};

export default QuizRoom;

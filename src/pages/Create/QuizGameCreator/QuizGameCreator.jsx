import Container from '~/components/Container';
import QuizGameIMG from '~/assets/symbols/quiz-game.png';
import { Button, Input } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuizRoomAPI from '~/services/quizRoomAPI';
import { useNavigate } from 'react-router-dom';
import { socket } from '~/components/Socket/Socket';

const QuizGameCreator = () => {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleCreateQuizRoom = async () => {
    try {
      const res = await QuizRoomAPI.create({ roomID });
      if (res.data.id) {
        navigate(`/quiz/${res.data.id}`);
        socket.emit('enter-room', { roomId: res.data.id });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <Container>
      <div className='flex items-center gap-64 h-[calc(100vh-113px)]'>
        <div>
          <img src={QuizGameIMG} alt='Test Bank' />
        </div>
        <div className='flex flex-col gap-16'>
          <h1 className='font-bold font-Grandstander text-[54px]'>QUIZ GAME</h1>
          <div className='flex flex-col gap-4'>
            <Input
              placeholder='Mã phòng'
              value={roomID}
              onChange={e => setRoomID(e.target.value)}
            />

            <p>Hoặc</p>
            <Button
              icon={<SyncOutlined />}
              className='w-fit'
              type='primary'
              ghost
              onClick={() => setRoomID(uuidv4())}
            >
              Lấy ngẫu nhiên
            </Button>
          </div>
          <Button type='primary' onClick={handleCreateQuizRoom}>
            Mở phòng
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default QuizGameCreator;

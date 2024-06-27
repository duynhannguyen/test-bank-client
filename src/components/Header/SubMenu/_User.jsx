import { Badge, Button, Divider } from 'antd';
import { FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoGameControllerOutline } from 'react-icons/io5';
import { LuUserSquare2 } from 'react-icons/lu';
import { FaUserGroup } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/user/userSlice';
import { Link } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col gap-y-4 items-start'>
      <Button
        type='text'
        icon={<LuUserSquare2 />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
      >
        <Link to='/user-profile' className='pr-4'>
          Hồ sơ người dùng
        </Link>
      </Button>
      <Divider className='bg-slate-100/20 my-0' />
      <Button
        type='text'
        icon={<FaUserGroup />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Quản lí nhóm học tập</span>
        </Badge>
      </Button>
      <Button
        type='text'
        icon={<RiQuestionAnswerLine />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Kho câu hỏi/bài tập</span>
        </Badge>
      </Button>
      <Button
        type='text'
        icon={<FileTextOutlined />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Kho đề thi/kiểm tra</span>
        </Badge>
      </Button>
      <Button
        type='text'
        icon={<IoGameControllerOutline />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Kho game</span>
        </Badge>
      </Button>
      <Divider className='bg-slate-100/20 my-0' />
      <Button
        type='text'
        icon={<LogoutOutlined />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
        onClick={() => dispatch(logout())}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default User;

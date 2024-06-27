import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Container from '~/components/Container';
import UserAvatarButton from '~/components/UserAvatarButton';
import { useSelector } from 'react-redux';
import SubMenuWrapper from '~/components/SubMenuWrapper';
import User from '~/components/UserAvatarButton/_User';

const BackHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className='flex items-center gap-2 bg-transparent text-white cursor-pointer'
      onClick={() => navigate('/')}
    >
      <span className='flex justify-center items-center w-9 aspect-square rounded-full border border-white'>
        <BsArrowLeft />
      </span>
      <span>Trang chủ</span>
    </button>
  );
};

const SimpleHeader = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='bg-[#2563EB]'>
      <Container>
        <div className='h-[113px] flex justify-between items-center'>
          <BackHomeButton />
          <h2 className='text-white font-bold'>TEST BANK</h2>
          <UserAvatarButton user={currentUser} large />
        </div>
      </Container>
    </div>
  );
};

export default SimpleHeader;

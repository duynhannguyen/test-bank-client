import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATH } from '~/routes';
import AuthPosterImg from '~/assets/loginPoster.jpg';
import Signup from './Signup';
import Login from './Login';

const Authen = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  const AuthenForm = () => {
    const { pathname } = location;
    if (pathname === PATH.SIGNUP) {
      return <Signup />;
    } else if (pathname === PATH.LOGIN) {
      return <Login />;
    }
    return null;
  };

  return (
    <div className='flex justify-center w-full '>
      <div className='w-8/12 h-screen'>
        <img className='w-full h-full object-cover ' src={AuthPosterImg} />
      </div>
      <div className='w-4/12 p-5 flex justify-center items-center overflow-hidden '>
        <AuthenForm />
      </div>
    </div>
  );
};

export default Authen;

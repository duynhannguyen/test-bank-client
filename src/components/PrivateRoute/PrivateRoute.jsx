import { Navigate } from 'react-router-dom';
import { PATH } from '~/routes';

const PrivateRoute = ({ component: Component }) => {
  // const { isAuthenticated, isLoading } = useSelector(state => state.user);
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to={PATH.ABOUT_ME} />;
  }

  // const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
  // if (!accessToken) {
  //   return <Navigate to={PATH.ABOUT_ME} />;
  // }

  return <Component />;
};

export default PrivateRoute;

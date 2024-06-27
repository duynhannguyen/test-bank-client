import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';
import MyStoreContext from './context/storeContext/StoreContext';
import { TOKEN_TYPES } from './utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '~/redux/user/userAction';
import { fetchCollections } from './redux/collection/collectionAction';
import { fetchStudyGroup } from './redux/studyGroup/studyGroupAction';
import { reloadUser } from './redux/user/userSlice';
import { notification } from 'antd';
import { socket } from './components/Socket/Socket.js';
import TestAPI from './services/testAPI.js';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, reload: userReload, currentUser } = useSelector(state => state.user);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, duration = 3) => {
    api[type]({
      message: 'Thông báo',
      description: message,
      duration: duration
    });
  };
  const joinAllTestActive = async () => {
    try {
      const response = await TestAPI.getActiveTests(currentUser?._id);
      const { data } = response.data;
      if (data.length === 0) {
        return;
      }
      socket.emit('join-room', { id: currentUser?._id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    joinAllTestActive();
  }, [currentUser]);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }

    dispatch(fetchStudyGroup());
    dispatch(fetchCollections());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('recevice-testNoti', testNoti => {
      const messageForm = (
        <div>
          Giảng Viên {testNoti.author} đã mở bài thi {testNoti.testTitle} truy cập
          <a target='_blank' href={`http://localhost:5173/test/${testNoti.testId}`}>
            {' '}
            Tại đây{' '}
          </a>{' '}
        </div>
      );
      openNotificationWithIcon('info', messageForm, 10);
    });
    socket.on('recevice-noti-testOwner', noti => {
      openNotificationWithIcon('info', noti, 10);
    });
  }, [socket]);

  return (
    <MyStoreContext>
      {contextHolder}
      <div className='text-base'>
        <Routes>
          {routes.map(route => {
            const Page = route.component;
            let routeElement = <Page />;
            if (route.isPrivated) {
              routeElement = <PrivateRoute component={Page} />;
            }
            return <Route key={route.path} path={route.path} element={routeElement} />;
          })}
        </Routes>
      </div>
    </MyStoreContext>
  );
};

export default App;

import Search from 'antd/es/input/Search';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import AuthAPI from '~/services/authAPI';

const StudyGroupSearchbar = ({ size, setUser, user, setShowMember }) => {
  const [findUser, setFindUser] = useState('');
  const [userResult, setUserResult] = useState([]);
  const resultPanel = useRef(null);
  const debounceSearchValue = useDebounce(findUser);
  useEffect(() => {
    const getSearchValue = async () => {
      try {
        const findUserByKey = await AuthAPI.getUserByNameOrId(debounceSearchValue);
        const { result } = findUserByKey.data;
        setShowMember(false);
        setUserResult(result);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchValue();
  }, [debounceSearchValue, setShowMember]);
  useEffect(() => {
    const handleClickOutSide = e => {
      if (resultPanel.current && !resultPanel.current.contains(e.target)) {
        setUserResult([]);
        setFindUser('');
      }
    };
    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);
  const onFindingUser = async e => {
    const searchKey = e.target.value;
    setFindUser(searchKey);
  };

  const onSelectStudent = (picture, lastName, firstName, id) => {
    const userInfor = { picture, lastName, firstName, id };
    const exitstingUser = user.find(user => user.id === userInfor.id);

    if (!exitstingUser) {
      return setUser([...user, userInfor]);
    }
  };

  return (
    <div className=' relative text-black w-full'>
      <Search
        value={findUser}
        onChange={e => onFindingUser(e)}
        size={size}
        placeholder='Nhập tên người dùng hoặc id'
        rootClassName='search-input border-blue-500 hover:shadow-md w-full placeholder-black'
      />
      <div
        ref={resultPanel}
        className=' absolute z-20 w-full top-7 animate-get-code-success-bg-fade-in shadow max-h-[150px] overflow-auto '
      >
        {userResult ? (
          userResult.map(user => (
            <div
              key={user._id}
              className='flex bg-white rounded gap-3 p-2 hover:bg-blue-500/80 items-center cursor-pointer  '
              onClick={() => onSelectStudent(user.picture, user.lastName, user.firstName, user._id)}
            >
              <div className='animate-get-code-success-bg-fade-in '>
                <img
                  className=' w-7 h-7 rounded-full  object-cover'
                  src={user.picture || '../src/assets/default-avatar/user.png'}
                />
              </div>
              <div className='text-[12px] font-semibold  animate-get-code-success-bg-fade-in '>
                {' '}
                {user.lastName} {user.firstName}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center'> Không tìm thấy người dùng </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroupSearchbar;

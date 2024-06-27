import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudyGroupCreator from './StudyGroupCreator/StudyGroupCreator';
import MemoStudyGroupList from './StudyGroupList/StudyGroupList';
import StudyGroupSearchbar from './StudyGroupSearchbar/StudyGroupSearchbar';
import { FaUsers } from 'react-icons/fa6';
import { FaUserPlus } from 'react-icons/fa6';
import { PiUserListFill } from 'react-icons/pi';
import { Button } from 'antd';
import studyGroupAPI from '~/services/studyGroupAPI';
import { fetchStudyGroup } from '~/redux/studyGroup/studyGroupAction';
import StudyGroupMemberList from './StudyGroupMemberList/StudyGroupMemberList';

const StudyGroupManagement = () => {
  const { data = [] } = useSelector(state => state.group.studyGroup);
  const [user, setUser] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userAlreadyInGroup, setUserAlreadyInGroup] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const dispatch = useDispatch();
  const getSearchUser = () => {
    const selectedUser = user.map(user => (
      <div
        key={user.id}
        id={user.id}
        className='flex  border-b border-blue-500/40  gap-3 p-2 items-center'
      >
        {' '}
        <div className='animate-get-code-success-bg-fade-in '>
          <img
            className=' w-7 h-7 rounded-full  object-cover'
            src={user.picture || '../src/assets/default-avatar/user.png'}
          />
        </div>
        <div className='text-[12px] flex-grow  font-semibold hover:text-blue-500/80 animate-get-code-success-bg-fade-in  '>
          {' '}
          {user.lastName} {user.firstName}
        </div>
        <div
          className='text-sm font-semibold text-right cursor-pointer hover:text-red-500  '
          onClick={() => onDeleteSelectedUser(user.id)}
        >
          X
        </div>
      </div>
    ));
    return selectedUser;
  };
  const onDeleteSelectedUser = id => {
    const deleteSelectedUser = user.filter(deleteUser => deleteUser.id !== id);
    setUser(deleteSelectedUser);
  };
  const onDeleteGroup = async id => {
    const deleteGroup = await studyGroupAPI.deleteGroup(id);
    const deleteResponse = deleteGroup.data;
    setSelectedGroup({});
    dispatch(fetchStudyGroup());
  };

  const showDuplicateUser = () => {
    setTimeout(() => {
      setUserAlreadyInGroup([]);
    }, 10000);

    const dupplicateUser = userAlreadyInGroup.map(dupUser => (
      <div className='' key={dupUser.id}>
        {' '}
        <span className='text-green-500'>
          {' '}
          Thêm thành công nhưng Tài khoản
          <span
            className='text-red-500 font-bold underline
        '
          >
            {' '}
            {dupUser.lastName} {dupUser.firstName}{' '}
          </span>{' '}
          đã trong nhóm{' '}
        </span>
      </div>
    ));
    return dupplicateUser;
  };
  const onSelectedGroup = id => {
    const findSelectedGroup = data.find(group => group._id === id);

    setSelectedGroup(findSelectedGroup);
  };

  const onCancelAddUser = () => {
    setUser([]);
  };

  const onAddUserToGroup = async () => {
    try {
      const addingUser = await studyGroupAPI.addMemberToGroup(selectedGroup._id, user);
      const { duplicateUser } = addingUser.data;
      dispatch(fetchStudyGroup());
      setUser([]);

      setUserAlreadyInGroup(duplicateUser);
    } catch (error) {
      console.log(error);
    }
  };
  const onShowMember = () => {
    if (user.length !== 0) {
      return;
    }
    setShowMember(!showMember);
  };
  return (
    <div className='flex gap-5 text-black justify-between  items-start min-h-[500px]'>
      <div className='w-5/12  px-3 pt-5 rounded-md shadow-user-profile h-[450px] overflow-auto   '>
        <div className='mb-2'>Danh sách các nhóm</div>
        {data.map(group => {
          return (
            <MemoStudyGroupList
              key={group._id}
              group={group}
              onSelectedGroup={onSelectedGroup}
              selectedGroup={selectedGroup}
              onDeleteGroup={onDeleteGroup}
            />
          );
        })}
      </div>
      <div className='w-7/12 px-3 pt-5 rounded-md shadow-user-profile h-[450px]   '>
        <div className='w-7/12 flex items-center gap-4    '>
          <div className='  '>
            <StudyGroupCreator className='w-full' />
          </div>
        </div>
        <div className=' relative w-full bg-blue-200/30 text-black shadow-user-profile rounded-md h-[330px]  overflow-auto border-2 border-blue-500/40  '>
          {Object.keys(selectedGroup).length !== 0 ? (
            <>
              <div className=' flex items-center gap-3 px-3 pt-3 text-sm text-center sticky  backdrop-blur-sm shadow-sm top-0 mb-2 '>
                <div className='w-2/6 max-w-full'>
                  <span className='w-fit'> Nhóm hiện tại: </span>
                  <span className='font-semibold text-blue-500 w-full max-w-full '>
                    {' '}
                    {selectedGroup.studyGroup}
                  </span>
                </div>
                <div className='w-2/6'>
                  <span className='mr-1 font-semibold text-blue-500 '>
                    {selectedGroup.member.length}
                  </span>
                  <FaUsers className=' align-middle mr-3 ' />
                  <span className='mr-1 font-semibold text-blue-500'>{user.length}</span>
                  <FaUserPlus className=' align-middle mr-3 ' />
                  <PiUserListFill
                    className='align-middle text-[18px] leading-3 hover:text-blue-500 transition-all '
                    onClick={() => onShowMember()}
                  />
                </div>

                <div className='w-2/4 '>
                  <StudyGroupSearchbar
                    size='small'
                    getSearchUser={getSearchUser}
                    setUser={setUser}
                    user={user}
                    setShowMember={setShowMember}
                    className='text-black '
                  />
                </div>
              </div>
              <div className='  px-3 pt-3 h-[250px]   '>
                {user && getSearchUser()} {userAlreadyInGroup && showDuplicateUser()}
                {showMember && <StudyGroupMemberList membetList={selectedGroup.member} />}
              </div>
              {user.length !== 0 && (
                <div className=' absolute right-1 bottom-1 mr-3'>
                  <Button
                    className='mr-3'
                    danger
                    type='primary'
                    htmlType='button'
                    onClick={onCancelAddUser}
                  >
                    Hủy
                  </Button>
                  <Button
                    className='bg-blue-500'
                    type='primary'
                    htmlType='button'
                    onClick={onAddUserToGroup}
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className=' h-full grid place-items-center text-lg'>
              Hãy tạo nhóm để bắt đầu thêm thành viên tại đây{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupManagement;

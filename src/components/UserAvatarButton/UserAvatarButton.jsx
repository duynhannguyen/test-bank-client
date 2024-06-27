import { Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React from 'react';
import SubMenuWrapper from '../SubMenuWrapper';
import User from './_User';

const UserAvatarButton = React.forwardRef(({ user, large }, ref) => {
  return (
    <SubMenuWrapper content={<User />} title='Tùy chọn người dùng' placement='bottomRight'>
      <div>
        <div ref={ref} className='flex items-center gap-3 text-white cursor-pointer'>
          <Avatar
            style={{ backgroundColor: 'orange', verticalAlign: 'middle', fontWeight: 'bold' }}
            size={large ? 'large' : undefined}
          >
            {user?.firstName && user?.firstName[0]}
          </Avatar>
          <h4 className={clsx({ 'text-sm': !large, 'text-base': large })}>
            {user.firstName} {user.lastName}
          </h4>
          <DownOutlined className='text-[10px]' />
        </div>
      </div>
    </SubMenuWrapper>
  );
});

export default UserAvatarButton;

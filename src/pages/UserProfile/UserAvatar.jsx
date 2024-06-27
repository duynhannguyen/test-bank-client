import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs';
import { useState } from 'react';

import PreviewImageFormAntd from '~/components/PreviewImageForm/PreviewImageFormAntd';

const UserAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImageForm, setPreviewImageForm] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { currentUser } = useSelector(state => state.user);

  const handleSelectFile = async e => {
    setSelectedFile(e.target.files[0]);
    setPreviewImageForm(!previewImageForm);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <div className='bg-white w-auto text-center rounded h-[200px] px-14 py-4 shadow-user-profile '>
        <div className='mb-2   '>
          <div className='relative m-auto w-fit'>
            {currentUser.picture ? (
              <Avatar
                style={{ boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)' }}
                shape='circle'
                size={130}
                src={currentUser.picture}
              />
            ) : (
              <Avatar
                shape='circle'
                style={{ boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)' }}
                size={130}
                icon={<UserOutlined />}
              />
            )}
            <label htmlFor='file-upload' className='cursor-pointer absolute right-0 bottom-0 '>
              <div className=' border-slate-400 border-2 text-center flex  items-center rounded-full p-2 align-middle content-center bg-gray-200 z-1 hover:bg-gray-300 '>
                <BsFillCameraFill className='text-2xl' />
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleSelectFile}
                />
              </div>
            </label>
          </div>
        </div>
        <span className='text-center text-sm font-semibold '>@userID:{currentUser._id}</span>
      </div>
      {previewImage && (
        <div className='m-auto absolute shadow-user-profile'>
          <PreviewImageFormAntd
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            selectedFile={selectedFile}
          />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

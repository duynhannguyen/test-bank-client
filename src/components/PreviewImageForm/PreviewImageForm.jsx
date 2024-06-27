import React from 'react';

const PreviewImageForm = ({ onHandleUploadAvatar, onHandleCloseForm, previewImage }) => {
  return (
    <>
      <form
        onSubmit={onHandleUploadAvatar}
        className='w-[400px] h-[700px] p-2 rounded shadow-user-profile bg-[#f8fafb]'
      >
        <span>Đây có phải là ảnh bạn muốn</span>
        <div className='w-[300px] h-auto m-auto'>
          <img className=' w-full h-auto object-contain' src={previewImage} />
          <button
            type='submit'
            className='w-28 h-10 rounded-lg bg-green-500 mr-[70px] hover:bg-green-600 '
          >
            Xác Nhận
          </button>
          <button
            type='button'
            onClick={onHandleCloseForm}
            className='w-28 h-10 rounded-lg bg-red-500  hover:bg-red-600'
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </>
  );
};

export default PreviewImageForm;

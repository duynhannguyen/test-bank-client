import { useState } from 'react';
import { Modal } from 'antd';
import { useContext } from 'react';
import { StoreContext } from '~/context/storeContext/StoreContext';
import { useSelector } from 'react-redux';
import userAPI from '~/services/userProfileApi';
import { fetchCurrentUser } from '~/redux/user/userAction';
const PreviewImageFormAntd = ({ previewImage, setPreviewImage, selectedFile }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setContextError, dispatch } = useContext(StoreContext);
  const { currentUser } = useSelector(state => state.user);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      setContextError(null);
      const formData = new FormData();
      formData.append('picture', selectedFile);
      await userAPI.uploadImage(currentUser._id, formData);
      dispatch(fetchCurrentUser());
      setPreviewImage('');
    } catch (error) {
      setContextError(error);
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setPreviewImage('');
  };
  return (
    <>
      <Modal
        title='Bạn muốn sử dụng ảnh này'
        open={previewImage}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText='Đóng'
        maskClosable={true}
        okText='Xác nhận'
      >
        <img className=' w-full h-[300px] object-contain' src={previewImage} />
      </Modal>
    </>
  );
};
export default PreviewImageFormAntd;

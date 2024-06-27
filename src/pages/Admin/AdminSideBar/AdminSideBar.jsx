import { Collapse } from 'antd';
const AdminSideBar = () => {
  const userSubTitle = 'Thông tin Người dùng';
  const subjectSubTitle = ['Toán', 'Vật lý', 'Hóa', 'Lịch sử', 'Sinh học', 'Địa lí'];
  const examSubTitle = [
    'Đề thi học sinh giỏi',
    'Tổng hợp các đề thi THPT 2020-2023',
    'Cấu trúc dữ liệu giải thuật',
    'Đề cương môn Mac-lenin',
    'Ôn tập thi olympia',
    'Đề thi HS giỏi TPHCM'
  ];
  const items = [
    {
      key: '1',
      label: 'Người dùng',
      children: (
        <p className=' p-1 rounded-sm cursor-pointer hover:bg-blue-500 transition-all hover:text-white'>
          {userSubTitle}
        </p>
      )
    },
    {
      key: '2',
      label: 'Môn học/Bộ sưu tập',
      children: subjectSubTitle.map((subject, index) => (
        <p
          className=' p-1 rounded-sm cursor-pointer hover:bg-blue-500 transition-all hover:text-white'
          key={index}
        >
          {subject}
        </p>
      ))
    },
    {
      key: '3',
      label: 'Đề thi/Bài kiểm tra',
      children: examSubTitle.map((exam, index) => (
        <p
          className=' p-1 rounded-sm cursor-pointer hover:bg-blue-500 transition-all hover:text-white'
          key={index}
        >
          {exam}
        </p>
      ))
    }
  ];
  const onChange = key => {};
  return (
    <div className=' sticky top-0 '>
      <Collapse
        expandIconPosition='end'
        items={items}
        defaultActiveKey={['1']}
        onChange={onChange}
      />
    </div>
  );
};

export default AdminSideBar;

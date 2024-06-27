import { Checkbox, Col, Modal, Row, Table, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import CollectionSection from '~/components/CollectionSection';
import Container from '~/components/Container';
import Header from '~/components/Header';
import { useEffect, useMemo, useState } from 'react';
import TestAPI from '~/services/testAPI';
import { useNavigate } from 'react-router-dom';
import RecordAPI from '~/services/recordAPI';

const MyTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [openRecords, setOpenRecords] = useState(false);
  const [recordsOfTest, setRecordsOfTest] = useState([]);

  useEffect(() => {
    fetchTestsOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestsOfUser = async () => {
    try {
      const res = await TestAPI.getMyTests();
      setTests(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleShowRecordsOfTest = async testId => {
    setOpenRecords(true);
    try {
      const res = await RecordAPI.getByTestId(testId);
      setRecordsOfTest(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <a onClick={() => navigate(`/create/test/${record.id}`)}>{title}</a>
      )
    },
    {
      title: 'Thông tin',
      dataIndex: 'info',
      key: 'info',
      render: (_, record) => (
        <div className='flex gap-2'>
          <p>{record.subject}</p>
          {record.subject && record.grade && <p>|</p>}
          <p>{record.grade}</p>
        </div>
      )
    },
    {
      title: 'Thời gian',
      dataIndex: 'limitTime',
      key: 'limitTime',
      render: limitTime => limitTime && <p>{limitTime} phút</p>
    },
    {
      title: 'Điểm đậu',
      dataIndex: 'passScore',
      key: 'passScore'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <div className='flex items-center gap-3'>
          <CopyOutlined
            className='text-black/20 hover:text-black cursor-pointer'
            onClick={() => {
              navigator.clipboard.writeText(id);
              message.success(`Đã copy: ${id}`);
            }}
          />
          <p>{id}</p>
        </div>
      )
    },
    {
      title: 'Mã truy cập',
      dataIndex: 'passWord',
      key: 'passWord',
      render: pw => (
        <div className='flex items-center gap-3'>
          <CopyOutlined
            className='text-black/20 hover:text-black cursor-pointer'
            onClick={() => {
              navigator.clipboard.writeText(pw);
              message.success(`Đã copy: ${pw}`);
            }}
          />
          <p>{pw}</p>
        </div>
      )
    },
    {
      title: 'Đang tổ chức',
      key: 'isActived',
      dataIndex: 'isActived',
      render: value => <Checkbox checked={value}></Checkbox>,
      align: 'center'
    },
    {
      title: 'Bài nộp',
      key: 'records',
      render: (_, record) => <a onClick={() => handleShowRecordsOfTest(record.id)}>Bài nộp</a>,
      align: 'right'
    }
  ];

  const data = useMemo(
    () =>
      tests.map(test => {
        const { title, _id, passWord, isActived, subject, grade, limitTime, passScore } = test;
        return {
          key: _id,
          title,
          id: _id,
          passWord,
          isActived,
          subject,
          grade,
          limitTime,
          passScore
        };
      }),
    [tests]
  );

  return (
    <>
      <div className='bg-[#2e6bed]'>
        <Container>
          <Header />
        </Container>
      </div>
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <CollectionSection />
            </Col>
            <Col span={18} className='mx-auto'>
              <div className='flex flex-col gap-4'>
                {tests && tests.length > 0 && <Table columns={columns} dataSource={data} />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal title='Danh sách bài nộp' open={openRecords} onCancel={() => setOpenRecords(false)}>
        <div className='flex flex-col gap-4'>
          {recordsOfTest.map(record => (
            <div key={record._id} className='flex justify-between'>
              <div
                className='flex flex-col'
                onClick={() => navigate(`/record/${record._id}?pw=${record.passWord}`)}
              >
                <h4 className='text-blue-500 cursor-pointer'>{record.userFullname}</h4>
                <p>{record.userEmail}</p>
              </div>
              <div className='flex gap-4'>
                <p>
                  {record.totalScore} điểm/{record.correct} câu đúng
                </p>
                <Tag color={record.isPassed ? 'green' : 'red'} className='h-fit'>
                  {record.isPassed ? 'Đậu' : 'Rớt'}
                </Tag>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default MyTests;

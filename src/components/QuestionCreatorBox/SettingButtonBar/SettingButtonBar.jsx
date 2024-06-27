import { PlusCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import QuestionAPI from '~/services/questionAPI';
import TestAPI from '~/services/testAPI';
import { setQuestions } from '~/redux/test/testSlice';
import { Tooltip } from 'antd';
import { fetchTestById } from '~/redux/test/testAction';

const SettingButtonBar = ({ question }) => {
  const { test, questions } = useSelector(state => state.test);
  const dispatch = useDispatch();

  const handleInsertQuestion = async () => {
    const res = await QuestionAPI.initalQuestion();
    const currentIndex = questions.findIndex(item => item._id === question._id);
    const questionsArray = questions.map(question => ({ id: question._id, score: question.score }));

    const createdQuestion = res.data.data;
    questionsArray.splice(currentIndex + 1, 0, { id: createdQuestion._id, score: null });

    const updatedTest = { ...test, questions: questionsArray };
    const putRes = await TestAPI.updateTestById(test._id, updatedTest);
    if (putRes?.data?.isSuccess) {
      const newQuestionArray = [...questions];
      newQuestionArray.splice(currentIndex + 1, 0, { ...createdQuestion, score: null });
      dispatch(setQuestions(newQuestionArray));
    }
  };

  const handleDeleteQuestion = async () => {
    if (questions.length === 1) return;
    const deleteId = question._id;
    const newQuestions = questions.filter(question => question._id !== deleteId);
    const questionArray = newQuestions.map(question => ({
      id: question._id,
      score: question.score
    }));
    const newTest = { ...test, questions: questionArray };
    const putRes = await TestAPI.updateTestById(test._id, newTest);

    if (putRes?.data?.isSuccess) {
      dispatch(setQuestions(newQuestions));
    }
  };

  return (
    <div className='absolute right-0 bottom-0 translate-x-[calc(100%+8px)] z-10'>
      <div className=' flex flex-col gap-6 p-4 bg-[#007aff] shadow-2xl rounded-md'>
        <Tooltip title='Tạo mới' placement='right'>
          <PlusCircleOutlined
            className='text-2xl text-white cursor-pointer'
            onClick={handleInsertQuestion}
          />
        </Tooltip>
        <Tooltip title='Nhân bản' placement='right'>
          <CopyOutlined className='text-2xl text-white cursor-pointer' />
        </Tooltip>
        <Tooltip title='Xóa' placement='right'>
          <FaRegTrashAlt
            className='text-2xl text-white cursor-pointer'
            onClick={handleDeleteQuestion}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SettingButtonBar;

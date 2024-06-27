import { createContext, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import Container from '~/components/Container';
import TestCreatorDashboard from '~/pages/Create/TestCreator/_TestCreatorDashboard';
import TestCreatorController from './_TestCreatorController';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestById } from '~/redux/test/testAction';
import useDebounce from '~/hooks/useDebounce';
import TestAPI from '~/services/testAPI';
import TestStartingForm from './_TestStartingForm';

export const CreateTestContext = createContext();

const initalOverviewValue = {
  title: '',
  description: '',
  subject: null,
  grade: null,
  scores: {}
};

const TestCreator = () => {
  const { id } = useParams();
  const [overviewValue, setOverviewValue] = useState(initalOverviewValue);
  const [testStaring, setTestStaring] = useState(false);
  const [questionErrors, setQuestionError] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const { test, questions } = useSelector(state => state.test);
  const dispatch = useDispatch();
  const overviewValueDebounce = useDebounce(overviewValue);

  useEffect(() => {
    handleFetchTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchTest = async () => {
    const res = await dispatch(fetchTestById(id));
    const fetchedTest = res.payload;
    if (!fetchedTest) return;
    const { title, description, subject, grade, questions } = fetchedTest;

    let scores = {};
    questions.forEach(question => {
      scores[question._id] = question.score;
    });

    setOverviewValue({ title, description, subject, grade, scores });
  };

  useEffect(() => {
    if (!id || !currentUser || !overviewValueDebounce) return;
    handleUpdateTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewValueDebounce]);

  const handleUpdateTest = async () => {
    if (questions.length === 0) return;

    const { scores, ...restOverview } = overviewValue;

    const questionObjects = questions.map(question => ({
      id: question._id,
      score: scores[question._id]
    }));
    const updatedTest = {
      ...test,
      ...restOverview,
      questions: questionObjects
    };
    try {
      await TestAPI.updateTestById(test._id, updatedTest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onOverviewInputChange = (name, value) => {
    const newValue = { ...overviewValue, [name]: value };
    setOverviewValue(newValue);
  };

  const handleStart = () => {
    setTestStaring(true);
    setQuestionError([false]);
  };

  const isModalOpen = useMemo(() => {
    if (!testStaring) return false;
    let shouldNexting = true;
    const { title, subject, grade, scores } = overviewValue;
    if (title === '' || !subject || !grade) shouldNexting = false;

    const scoreValues = Object.values(scores);
    const isScoreEnough = scoreValues.every(value => value !== null);
    if (!isScoreEnough) shouldNexting = false;

    if (questionErrors.length > 0 && questionErrors.includes(false)) {
      shouldNexting = false;
    }

    return shouldNexting;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStaring, overviewValue, questionErrors, questions]);

  return (
    <CreateTestContext.Provider
      value={{
        overviewValue,
        onOverviewInputChange,
        testStaring,
        handleStart: handleStart,
        handleCancelStart: () => setTestStaring(false),
        handleAddQuestionError: value => setQuestionError(prev => [...prev, value]),
        clearQuestionError: () => setQuestionError([])
      }}
    >
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={18}>
              <TestCreatorDashboard />
            </Col>
            <Col span={6} className='mx-auto'>
              <TestCreatorController />
            </Col>
          </Row>
        </Container>
      </div>
      <TestStartingForm
        open={isModalOpen}
        onCancel={() => setTestStaring(false)}
        handleFetchTest={handleFetchTest}
        currentUser={currentUser}
        overviewValue={overviewValue}
      />
    </CreateTestContext.Provider>
  );
};

export default TestCreator;

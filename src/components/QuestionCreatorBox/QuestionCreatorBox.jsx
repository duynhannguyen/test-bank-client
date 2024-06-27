import { useState, createContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import parser from 'html-react-parser';
import { Col, Row, message } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import MultipleChoiceCreator from './MultipleChoiceCreator';
import CheckboxCreator from '~/components/CheckboxCreator';
import EsayCreator from '../EsayCreator';
import { QUESTION_TYPE } from '~/utils/constants';
import QuestionAPI from '~/services/questionAPI';
import ControlSection from './_ControlSection';
import SettingButtonBar from './SettingButtonBar';
import useDebounce from '~/hooks/useDebounce';
import ClickOutsideObserver from '../ClickOutsideObserver';

export const CreateQuestionContext = createContext();

const initialAnswers = Array.from({ length: 4 }, () => ({
  id: uuidv4(),
  content: '',
  isCorrect: false
}));

const initalControlValue = {
  type: QUESTION_TYPE.CHOICE,
  subject: null,
  collection: null,
  isPrivate: false
};

const QuestionCreatorBox = ({
  isTestCreator,
  question,
  showSettingBar,
  handleCloseSettingBar,
  testStaring,
  handleAddQuestionError,
  clearQuestionError
}) => {
  const [controlValue, setControlValue] = useState(initalControlValue);
  const [topic, setTopic] = useState('');
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState([]);
  const [isCorrectRequired, setIsCorrectRequired] = useState(false);
  const [isSubjectRequired, setIsSubjectRequired] = useState(false);
  const [isShowingError, setIsShowingError] = useState(false);
  const navigate = useNavigate();

  const topicDebounce = useDebounce(topic);
  const answersDebounce = useDebounce(answers);
  const controlValueDebounce = useDebounce(controlValue);

  useEffect(() => {
    if (!topicDebounce || !answersDebounce || !controlValue) return;
    handleUpdateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicDebounce, answersDebounce, controlValueDebounce]);

  const handleUpdateQuestion = async () => {
    if (!question || !question?._id) return;
    // const isValid = handleValidateWithoutMessage();
    // if (!isValid) {
    //   return;
    // }
    const updatedQuestion = {
      ...question,
      topic,
      answers,
      ...controlValue
    };
    try {
      await QuestionAPI.updateQuestion(question._id, updatedQuestion);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (testStaring) {
      handleValidateWithoutMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStaring]);

  useEffect(() => {
    if (!question) return;
    if (Object.values(question).length === 0) return;
    if (Array.isArray(question.answer)) return;
    setAnswers(question.answers);
    setTopic(question.topic);
    setControlValue({
      type: question.type,
      subject: question.subject,
      collection: question.collection,
      isPrivate: question.isPrivate
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    if (!testStaring) {
      handleResetAll();
    }
  }, [testStaring]);

  const onAnswerInputChange = (idChange, value) => {
    const newAnswers = answers.map(answer =>
      answer.id === idChange ? { ...answer, content: value } : answer
    );
    setAnswers(newAnswers);
  };

  const handleCreateMultipleChoice = async () => {
    const isValid = handleValidate();
    if (!isValid) {
      setIsShowingError(true);
      return;
    }
    const { type, subject, collection, isPrivate } = controlValue;
    const reqBody = {
      topic,
      answers,
      type,
      subject,
      collection,
      isPrivate
    };
    try {
      const res = await QuestionAPI.createMultipleChoice(reqBody);
      navigate(`/question/${res.data.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleValidate = () => {
    const errorFields = answers
      .filter(answer => !answer.content || parser(answer.content) === '')
      .map(answer => answer.id);
    if (!topic || parser(topic) === '') errorFields.push('topic');

    const correctAnswer = answers.find(answer => answer.isCorrect);
    if (!correctAnswer) {
      message.error('Chưa chọn đáp án đúng');
      setIsCorrectRequired(true);
    }
    if (!controlValue.subject) {
      message.error('Chưa chọn môn');
      setIsSubjectRequired(true);
    }
    if (errorFields.length > 0) setErrors(errorFields);
    return errorFields.length === 0 && correctAnswer && controlValue.subject;
  };

  const handleValidateWithoutMessage = () => {
    const errorFields = answers
      .filter(answer => !answer.content || parser(answer.content) === '')
      .map(answer => answer.id);
    if (!topic || parser(topic) === '') errorFields.push('topic');

    const correctAnswer = answers.find(answer => answer.isCorrect);
    if (!correctAnswer) {
      setIsCorrectRequired(true);
    }
    if (!isTestCreator && !controlValue.subject) {
      setIsSubjectRequired(true);
    }
    if (errorFields.length > 0) setErrors(errorFields);
    let shouldNexting = errorFields.length === 0 && correctAnswer;
    if (!isTestCreator && !controlValue.subject) {
      shouldNexting = false;
    }
    if (!shouldNexting) {
      handleAddQuestionError(false);
    } else {
      handleAddQuestionError(true);
    }
    if (shouldNexting) {
      clearQuestionError();
    }
    return shouldNexting;
  };

  const handleRefreshField = fieldName => {
    const errorFields = errors.filter(field => field !== fieldName);
    setErrors(errorFields);
    setIsCorrectRequired(false);
  };

  const handleAddAnwer = () => {
    const newAnswer = { id: uuidv4(), content: '', isCorrect: false };
    setAnswers([...answers, newAnswer]);
  };

  const handleDeleteAnswer = answerId => {
    if (answers.length === 2) {
      message.error('Câu trắc nghiệm không thể ít hơn 2 lựa chọn');
      return;
    }
    const newFields = answers.filter(answer => answer.id !== answerId);
    setAnswers(newFields);
  };

  const handleSetCorrect = answerId => {
    const newFields = answers.map(answer =>
      answer.id === answerId ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }
    );
    setAnswers(newFields);
    setIsCorrectRequired(false);
  };

  const handleResetAll = () => {
    setIsCorrectRequired(false);
    setIsSubjectRequired(false);
    setErrors([]);
    setIsShowingError(false);
  };

  const handleChangeControlValue = (name, value) => {
    const newControlValue = { ...controlValue, [name]: value };
    setControlValue(newControlValue);
  };

  useEffect(() => {
    if (isSubjectRequired) setIsSubjectRequired(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlValue.subject]);

  const MainSection = useMemo(() => {
    if (controlValue.type === QUESTION_TYPE.CHOICE) return MultipleChoiceCreator;
    if (controlValue.type === QUESTION_TYPE.CHECK) return CheckboxCreator;
    if (controlValue.type === QUESTION_TYPE.ESSAY) return EsayCreator;
  }, [controlValue.type]);

  return (
    <CreateQuestionContext.Provider
      value={{
        isTestCreator,
        controlValue,
        topic,
        answers,
        errors,
        isCorrectRequired,
        isSubjectRequired,
        isShowingError,
        handleAddAnwer,
        handleChangeControlValue,
        onAnswerInputChange,
        onTopicInputChange: value => setTopic(value),
        handleCreateMultipleChoice,
        handleRefreshField,
        handleDeleteAnswer,
        handleSetCorrect,
        handleResetAll
      }}
    >
      <div className='relative'>
        <BlockSectionWrapper className='h-auto'>
          <Row gutter={16} className='p-4'>
            <Col span={18} className='flex flex-col gap-8'>
              <MainSection />
            </Col>
            <Col span={6} className='flex flex-col gap-2'>
              <ControlSection isTestCreator={isTestCreator} />
            </Col>
          </Row>
        </BlockSectionWrapper>
        {showSettingBar && (
          <ClickOutsideObserver onClickOutside={handleCloseSettingBar}>
            <SettingButtonBar question={question} />
          </ClickOutsideObserver>
        )}
      </div>
    </CreateQuestionContext.Provider>
  );
};

export default QuestionCreatorBox;

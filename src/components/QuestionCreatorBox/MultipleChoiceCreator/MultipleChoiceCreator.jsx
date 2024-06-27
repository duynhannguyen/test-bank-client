import { useContext } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MultipleChoiceAnswerField from '../MultipleChoiceAnswerField';
import ContentField from '~/components/ContentField';
import { CreateQuestionContext } from '..';

const MultipleChoiceCreator = () => {
  const {
    topic,
    answers,
    errors,
    handleAddAnwer,
    onAnswerInputChange,
    onTopicInputChange,
    handleRefreshField
  } = useContext(CreateQuestionContext);

  return (
    <div>
      <form>
        <ContentField
          value={topic}
          textarea
          onChange={onTopicInputChange}
          placeholder='Câu hỏi/đề bài'
          isError={errors.includes('topic')}
          refreshField={() => handleRefreshField('topic')}
          allowUploadImage
        />
        <div className='flex flex-col gap-1 mt-4'>
          {answers.map((answer, index) => (
            <MultipleChoiceAnswerField
              key={answer.id}
              id={answer.id}
              index={index}
              isCorrect={answer.isCorrect}
              value={answer.content}
              onInputChange={onAnswerInputChange}
              isError={errors.includes(answer.id)}
              refreshField={() => handleRefreshField(answer.id)}
            />
          ))}
          <Button
            type='text'
            icon={<PlusOutlined />}
            className='w-fit h-[40px] bg-gray-100'
            onClick={handleAddAnwer}
          >
            Thêm đáp án
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MultipleChoiceCreator;

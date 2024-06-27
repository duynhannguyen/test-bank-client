import { useContext, useState } from 'react';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import { CreateTestContext } from './TestCreator';
import TestOverviewSection from './__TestOverviewSection';
import QuestionCreatorBox from '~/components/QuestionCreatorBox/QuestionCreatorBox';
import { useSelector } from 'react-redux';

const TestCreatorDashboard = () => {
  const { questions } = useSelector(state => state.test);
  const { overviewValue, testStaring, handleAddQuestionError, clearQuestionError } =
    useContext(CreateTestContext);
  const [hoveringId, setHoveringId] = useState(null);

  return (
    <div className='flex flex-col gap-6'>
      <BlockSectionWrapper>
        <div className='h-48 rounded-md bg-red-400'></div>
      </BlockSectionWrapper>
      <TestOverviewSection />
      <div className='flex flex-col'>
        {questions.map((question, index) => (
          <div
            key={question._id}
            id={question._id}
            onMouseEnter={() => setHoveringId(question._id)}
            className='py-3'
          >
            <div className='flex gap-1'>
              <h3 className='block w-fit mb-1 py-2 px-4 bg-[#ccc] rounded-t-md text-white'>
                <span className='font-bold'>Câu {index + 1}: </span>
                {overviewValue.scores[question._id] && (
                  <span className='italic'>({overviewValue.scores[question._id]} điểm)</span>
                )}
              </h3>
            </div>
            <QuestionCreatorBox
              isTestCreator
              question={question}
              showSettingBar={hoveringId === question._id}
              handleCloseSettingBar={() => setHoveringId(null)}
              testStaring={testStaring}
              handleAddQuestionError={handleAddQuestionError}
              clearQuestionError={clearQuestionError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCreatorDashboard;

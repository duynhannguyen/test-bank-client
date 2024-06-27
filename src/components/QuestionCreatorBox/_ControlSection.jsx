import { useContext } from 'react';
import { Button, Divider, Switch } from 'antd';
import QuestionTypeSelector from './__QuestionTypeSelector';
import SubjectSelector from './__SubjectSelector';
import CollectionSelector from './__CollectionSelector';
import { CreateQuestionContext } from './QuestionCreatorBox';

const ControlSection = ({ isTestCreator }) => {
  const {
    controlValue,
    isShowingError,
    handleChangeControlValue,
    handleCreateMultipleChoice,
    handleResetAll
  } = useContext(CreateQuestionContext);

  return (
    <>
      <QuestionTypeSelector />
      {!isTestCreator && (
        <>
          <SubjectSelector />
          <CollectionSelector />
          <Divider />
          <div className='flex justify-end items-center gap-2'>
            <span>Riêng tư</span>
            <Switch
              className='w-fit'
              checked={controlValue.isPrivate}
              onChange={value => handleChangeControlValue('isPrivate', value)}
            />
          </div>
        </>
      )}

      {!isTestCreator && (
        <Button type='primary' className='w-full h-[56px]' onClick={handleCreateMultipleChoice}>
          Lưu
        </Button>
      )}
      {isShowingError && (
        <Button className='w-full h-[56px]' onClick={handleResetAll}>
          Trở về
        </Button>
      )}
    </>
  );
};

export default ControlSection;

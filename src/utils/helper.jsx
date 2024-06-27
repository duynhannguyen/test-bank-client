import { categories } from './rendering';

export const getSubjectOptions = () => {
  const labelClasses = 'flex items-center w-full h-[40px]';
  const subjects = categories.map(subject => ({
    value: subject.title,
    label: <div className={labelClasses}>{subject.title}</div>
  }));
  subjects.push({
    value: 'orther',
    label: <div className={labelClasses}>Khác</div>
  });
  const removeIndex = categories.findIndex(item => !item.isSubject);
  subjects.splice(removeIndex, 1);
  return subjects;
};

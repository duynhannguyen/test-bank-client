import { Button } from 'antd';
import { categories } from '~/utils/rendering';

const Subjects = () => {
  return (
    <div className='w-[600px] flex flex-wrap gap-y-4 items-start'>
      {categories.map(item => {
        if (!item.isSubject) return null;
        return (
          <Button
            key={item.title}
            type='text'
            className='w-[calc(33.33%)] text-left text-white/60 font-bold hover:text-white'
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
};

export default Subjects;

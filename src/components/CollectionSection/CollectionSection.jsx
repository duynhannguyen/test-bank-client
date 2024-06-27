import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import CollectionCreator from './_CollectionCreator';
import { useSelector } from 'react-redux';
import { Button, Collapse } from 'antd';
import { useMemo } from 'react';

const CollectionSection = () => {
  const { collections } = useSelector(state => state.collection);

  const collectionsElement = useMemo(
    () => (
      <div className='flex flex-col'>
        {collections.map(collection => (
          <Button key={collection._id} type='text' className='h-[40px] text-left'>
            {collection.name}
          </Button>
        ))}
      </div>
    ),
    [collections]
  );

  return (
    <BlockSectionWrapper title='Bộ sưu tập'>
      <CollectionCreator />
      <Collapse
        ghost
        className='p-0'
        expandIconPosition='end'
        items={[
          {
            key: '1',
            label: <h4>Danh sách</h4>,
            className: 'border-none',
            children: collectionsElement
          }
        ]}
      />
    </BlockSectionWrapper>
  );
};

export default CollectionSection;

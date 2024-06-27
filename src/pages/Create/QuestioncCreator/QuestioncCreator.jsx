import { Col, Row } from 'antd';
import Container from '~/components/Container';
import QuestionCreatorBox from '~/components/QuestionCreatorBox';
import CollectionSection from '~/components/CollectionSection';

const QuestioncCreator = () => {
  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={6}>
            <CollectionSection />
          </Col>
          <Col span={18} className='mx-auto'>
            <QuestionCreatorBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestioncCreator;

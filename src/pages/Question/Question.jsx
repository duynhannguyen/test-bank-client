import { Col, Collapse, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import Container from '~/components/Container';
import SimpleHeader from '~/layouts/SimpleHeader';
import QuestionAPI from '~/services/questionAPI';
import MultipleChoice from './_MultipleChoice';

const Question = () => {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await QuestionAPI.getById(id);
      setQuestion(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  if (!question) return <></>;
  return (
    <>
      <SimpleHeader />
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <BlockSectionWrapper>
                <p>Hay</p>
              </BlockSectionWrapper>
            </Col>
            <Col span={16} className='mx-auto'>
              <div className='flex flex-col gap-4'>
                <MultipleChoice question={question} />
                <BlockSectionWrapper>
                  <Collapse
                    size='large'
                    items={[
                      {
                        key: '1',
                        label: 'Xem gợi ý',
                        children: <p>sdfdsfds</p>
                      }
                    ]}
                    className='border-none'
                  />
                </BlockSectionWrapper>
                <BlockSectionWrapper>
                  <Collapse
                    size='large'
                    items={[
                      {
                        key: '1',
                        label: 'Xem bài giải',
                        children: <p>sdfdsfds</p>
                      }
                    ]}
                    className='border-none'
                  />
                </BlockSectionWrapper>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Question;

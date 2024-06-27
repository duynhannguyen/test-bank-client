import { useState } from 'react';
import clsx from 'clsx';
import Container from '~/components/Container';
import Header from '~/components/Header';
import CategorySlider from './_CategorySlider';
import SearchBar from './_SearchBar';
import TopSearchKeywords from './_TopSearchKeywords';

const HeadSection = () => {
  const [bgImg, setBgImg] = useState(null);

  return (
    <div className={clsx('relative')}>
      <Container>
        <Header />
        <div className='flex flex-col gap-8 mx-auto py-16 text-white mt-8'>
          <div className='flex flex-col gap-4 text-center z-10'>
            <h1 className='text-4xl font-bold'>Ngân hàng đề thi</h1>
            <h2 className='text-xl font-bold'>
              Cung cấp kho đề thi vô hạn, để sự học là rèn luyện không ngừng
            </h2>
          </div>
          <SearchBar />
          <TopSearchKeywords />
          <CategorySlider setBgImg={setBgImg} />
        </div>
      </Container>

      {/* Background */}
      <div
        className={clsx('ct-home-head-section-bg absolute top-0 left-0 w-full h-full', {
          'opacity-80 duration-[2s]': bgImg
        })}
      ></div>
      <div
        key={bgImg}
        className='animate-head-section-bg-fade-in absolute top-0 left-0 w-full h-full -z-10 bg-no-repeat bg-cover bg-center'
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      {/* End Background */}
    </div>
  );
};

export default HeadSection;

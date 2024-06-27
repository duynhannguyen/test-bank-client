import { useRef } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { categories } from '~/utils/rendering';
import CategoryThumbnail from './__CategoryThumbnail';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SWIPER_BUTTON = {
  NEXT: 'swiper-button-next',
  PREV: 'swiper-button-prev'
};

const CategorySlider = ({ setBgImg }) => {
  const swiperRef = useRef();

  const onInit = Swiper => {
    swiperRef.current = Swiper;
  };

  const SwiperConfig = {
    slidesPerView: 5,
    spaceBetween: 64,
    navigation: {
      nextEl: `.${SWIPER_BUTTON.NEXT}`,
      prevEl: `.${SWIPER_BUTTON.PREV}`
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    modules: [Autoplay, Navigation]
  };

  const onMouseEnter = thumbnail => {
    setBgImg(thumbnail);
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const onMouseLeave = () => {
    setBgImg(null);
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  const swiperButtonClasses = 'bg-transparent text-white/40 hover:text-white';

  return (
    <div className='relative flex gap-8 my-8 z-10'>
      <Swiper {...SwiperConfig} onInit={onInit} className='w-[90%]'>
        {categories.map(category => (
          <SwiperSlide key={category.title}>
            <CategoryThumbnail
              {...category}
              onMouseEnter={() => onMouseEnter(category.thumbnail)}
              onMouseLeave={onMouseLeave}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={clsx(SWIPER_BUTTON.PREV, swiperButtonClasses)}></button>
      <button className={clsx(SWIPER_BUTTON.NEXT, swiperButtonClasses)}></button>
    </div>
  );
};

export default CategorySlider;

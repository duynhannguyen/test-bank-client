import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { useRef } from 'react';
import 'swiper/css';
import clsx from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import feedbackBg from '../../../assets/feedback/feedbackimg.png';
import studentImage from '../../../assets/feedback/student.jpg';
import guyImage from '../../../assets/feedback/guy.jpg';
import womenImage from '../../../assets/feedback/women.jpg';
import employeeImage from '../../../assets/feedback/employee.jpg';
const TESTIMONIAL_SWIPER_BUTTON = {
  NEXT: 'swiper-button-next-1',
  PREV: 'swiper-button-prev-1'
};

const Testimonial = () => {
  const testimonialRef = useRef();

  const testimonialSwiperConfig = {
    slidesPerView: 1,
    // spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: `.${TESTIMONIAL_SWIPER_BUTTON.NEXT}`,
      prevEl: `.${TESTIMONIAL_SWIPER_BUTTON.PREV}`
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    modules: [Autoplay, Navigation]
  };

  const testimonialButtonStyleNext =
    'absolute z-10 right-0  top-1/2 -translate-y-1/2 bg-transparent text-5xl text-blue-500/60 hover:text-blue-500  ';
  const testimonialButtonStylePrev =
    'absolute z-10 left-0  top-1/2 -translate-y-1/2 bg-transparent text-5xl text-blue-500/60 hover:text-blue-500  ';

  return (
    <div className='min-h-[650px]  relative    '>
      <div
        className='h-full absolute w-full -z-10 bg-no-repeat bg-center bg-cover opacity-50  '
        style={{ backgroundImage: `url(${feedbackBg})` }}
      ></div>
      <div className='text-center py-8 text-purple-700/90 font-bold text-2xl '>
        {' '}
        Người dùng nhận xét về TestBank{' '}
      </div>

      <Swiper
        testtef={testimonialRef}
        {...testimonialSwiperConfig}
        className=' text-center h-full   '
      >
        <SwiperSlide>
          <div>
            <div className='relative w-fit text-blue-900 font-semibold m-auto bg-slate-400/40 text-lg rounded-xl mb-10  p-5  after:border-slate-400/40 after:-translate-x-1/2  after:top-full after:left-1/2 after:absolute   after:border-solid after:border-l-transparent after:border-r-transparent after:border-l-[10px] after:border-r-[10px]  after:borer-r-8 after:border-t-[20px]'>
              &quot; Mình đang rất cần một website có các đề trắc nghiệm thực tế để đánh giá năng
              lực, và testbank có đầy đủ điều đó. &quot;
            </div>
            <div className='w-[200px] h-[200px]  m-auto  '>
              {' '}
              <img
                className='w-full h-full rounded-full object-cover'
                loading='lazy'
                src={guyImage}
              />{' '}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div>
            <div className='relative  text-blue-900 font-semibold w-fit m-auto bg-slate-400/40 text-lg rounded-xl mb-10  p-5  after:border-slate-400/40 after:-translate-x-1/2  after:top-full after:left-1/2 after:absolute   after:border-solid after:border-l-transparent after:border-r-transparent after:border-l-[10px] after:border-r-[10px]  after:borer-r-8 after:border-t-[20px]'>
              &quot; Mình là giáo viên nên việc tạo đề thi trắc nghiệm là điều rất cần thiết,
              testbank có thể tạo đề thi hoàn toàn miễn phí mình rất thích điều đó. &quot;
            </div>
            <div className='w-[200px] h-[200px]  m-auto  '>
              {' '}
              <img
                className='w-full h-full rounded-full object-cover'
                loading='lazy'
                src={womenImage}
              />{' '}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div>
            <div className='relative  text-blue-900 font-semibold w-fit m-auto bg-slate-400/40 text-lg rounded-xl mb-10  p-5  after:border-slate-400/40 after:-translate-x-1/2  after:top-full after:left-1/2 after:absolute   after:border-solid after:border-l-transparent after:border-r-transparent after:border-l-[10px] after:border-r-[10px]  after:borer-r-8 after:border-t-[20px]'>
              &quot; Rất cảm ơn Testbank đã cho em một nơi để có thể luyện thêm đề thi khi cần thiết
              ạ &quot;
            </div>
            <div className='w-[200px] h-[200px]  m-auto  '>
              {' '}
              <img
                className='w-full h-full rounded-full object-cover'
                loading='lazy'
                src={studentImage}
              />{' '}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className='relative  text-blue-900 font-semibold w-fit m-auto bg-slate-400/40 text-lg rounded-xl mb-10  p-5  after:border-slate-400/40 after:-translate-x-1/2  after:top-full after:left-1/2 after:absolute   after:border-solid after:border-l-transparent after:border-r-transparent after:border-l-[10px] after:border-r-[10px]  after:borer-r-8 after:border-t-[20px]'>
              &quot; Là một người đang học tiếng anh. Tại testbank có những đề thi rất vừa sức để
              tôi có thể luyện tập thêm mà không cần phải bỏ tiền ra để mua như những nơi khác
              &quot;
            </div>
            <div className='w-[200px] h-[200px]  m-auto  '>
              {' '}
              <img
                className='w-full h-full rounded-full object-cover'
                loading='lazy'
                src={employeeImage}
              />{' '}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button className={clsx(TESTIMONIAL_SWIPER_BUTTON.NEXT, testimonialButtonStyleNext)}>
        <IoIosArrowForward />
      </button>
      <button className={clsx(TESTIMONIAL_SWIPER_BUTTON.PREV, testimonialButtonStylePrev)}>
        <IoIosArrowBack />
      </button>
    </div>
  );
};

export default Testimonial;

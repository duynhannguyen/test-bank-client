import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Banner = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <div className='max-w-full h-[84px] px-6 relative  '>
      <div className='w-full h-full flex justify-center gap-4 items-center text-lg font-semibold '>
        {isAuthenticated ? (
          <p> Hãy để sự học của bạn phát triển ngay bây giờ </p>
        ) : (
          <>
            <p> Bắt đầu tạo đề thi và giải đề chỉ với vài thao tác </p>
            <Link className='px-4 py-3 text-white bg-black rounded-md no-underline ' to='/login'>
              {' '}
              Đăng nhập ngay{' '}
            </Link>
          </>
        )}
      </div>

      <img
        loading='lazy'
        className=' w-full h-full object-contain absolute top-0 left-0 -z-10 text-transparent bg-yellow-100/60'
        src='https://fps.cdnpk.net/autopromos/gam/banner-middle.svg'
        title='banner-bg'
      />
    </div>
  );
};

export default Banner;

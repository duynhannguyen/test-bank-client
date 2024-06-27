import {
  FaSquareXTwitter,
  FaSquarePinterest,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
  FaSquareFacebook
} from 'react-icons/fa6';
import Container from '~/components/Container';

const Contact = () => {
  return (
    <div>
      <Container className='flex w-full  bg-white h-[250px] py-[40px] px-[20px]  '>
        <div className='text-left flex-grow '>
          <ul className=' m-0 p-0 list-none text-left leading-8 font-semibold text-xl text-black  '>
            Thông tin
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Về chúng tôi
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Thông tin việc làm{' '}
            </li>
          </ul>
        </div>

        <div className='flex-grow'>
          <ul className=' list-none m-0 p-0 text-left leading-8 font-semibold text-xl text-black/50/80 '>
            {' '}
            Chính sách{' '}
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Điều khoản sử dụng{' '}
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Chính sách thoản thuận{' '}
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Chính sách bảo mật{' '}
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Chính sách Cookies{' '}
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Thông tin bản quyển{' '}
            </li>
          </ul>
        </div>

        <div className='flex-grow'>
          <ul className=' list-none m-0 p-0 text-left leading-8 font-semibold text-xl text-black '>
            Hỗ trợ
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              FAQ{' '}
            </li>
            <li className='text-black font-medium text-sm hover:text-black/50 cursor-pointer '>
              {' '}
              Thông tin liên hệ{' '}
            </li>
          </ul>
        </div>
        <div className='flex-grow'>
          <p className='text-left leading-8 font-semibold text-xl text-black'> Mạng xã hội</p>
          <ul className=' list-none m-0 p-0 flex gap-2   '>
            {' '}
            <li className='  '>
              <FaSquareFacebook className='text-blue-500 w-6 h-6 hover:opacity-50  cursor-pointer  ' />
            </li>
            <li>
              <FaSquareXTwitter className=' w-6 h-6  hover:opacity-50 cursor-pointer ' />
            </li>
            <li>
              <FaSquarePinterest className='text-red-500 w-6 h-6 hover:opacity-50 cursor-pointer ' />
            </li>
            <li>
              <FaSquareInstagram className=' w-6 h-6 bg-gradient-to-r from-purple-500  to-red-500 text-white p-[3px] rounded hover:opacity-50  cursor-pointer ' />
            </li>
            <li>
              {' '}
              <FaYoutube className='text-red-500 w-6 h-6 hover:opacity-50 cursor-pointer ' />
            </li>
            <li>
              {' '}
              <FaLinkedin className='text-blue-500 w-6 h-6 hover:opacity-50 cursor-pointer' />
            </li>
          </ul>
        </div>
      </Container>
      <div className='border-t-[2px] border-gray-200 leading-[100px] align-middle text-center text-xs text-gray-400 '>
        Copyright 2023 Testbank
      </div>
    </div>
  );
};

export default Contact;

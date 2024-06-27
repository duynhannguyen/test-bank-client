const ExamCategory = () => {
  return (
    <section className='  px-28 py-20 '>
      <div className='text-center font-bold mb-5 '>
        <h1 className='text-3xl'>
          {' '}
          Những <span className='text-blue-500'> tiêu chí </span> cốt lõi của TestBank{' '}
        </h1>
        <h3 className='text-gray-300 text-lg'>
          TestBank sẽ luôn cố gắng phát triển dựa trên những tiêu chí này{' '}
        </h3>
      </div>

      <div className='grid grid-rows-2 grid-cols-3 grid-flow-row gap-6   '>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'> &#x1F4CB; </span>
          </div>
          <h2 className='text-base mb-3 '> Ngân hàng câu hỏi và bài tập vô hạn </h2>
          <p className='text-xs text-gray-400 font-medium '>
            Mỗi giáo viên có thể tạo ra vô số đề thi
          </p>
        </div>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'>&#x1F4BB; </span>
          </div>
          <h2 className='text-base mb-3 '> Giao diện dễ sử dụng </h2>
          <p className='text-xs text-gray-400 font-medium '>
            Nhờ vào đội ngũ thiết kế có nhiều kinh nghiệm
          </p>
        </div>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'> &#x1F4B8; </span>
          </div>
          <h2 className='text-base mb-3 '> Hoàn toàn miễn phí </h2>
          <p className='text-xs text-gray-400 font-medium '>
            TestBank là một website phi lợi nhuận
          </p>
        </div>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'> &#x1F3AE; </span>
          </div>
          <h2 className='text-base mb-3 '> Game trắc nghiệm </h2>
          <p className='text-xs text-gray-400 font-medium '>
            Tích hợp game trắc nghiệm giúp cho việc học trở nên dễ dàng
          </p>
        </div>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'> &#x1F4D4; </span>
          </div>
          <h2 className='text-base mb-3 '> Cá nhân hóa Đề thi,bài kiểm tra </h2>
          <p className='text-xs text-gray-400 font-medium '>
            Người dùng có thể tự tạo riêng cho mình một bộ sưu tập đề kiểm tra để có thể luyện tập
            thường xuyên
          </p>
        </div>
        <div className=' min-h-[200px]  bg-[#f8fafb] rounded-md shadow p-6 '>
          <div className='w-12 h-12 bg-gray-200/70 flex justify-center items-center rounded-md mb-4  '>
            <span className='text-2xl'> &#x26A1; </span>
          </div>
          <h2 className='text-base mb-3 '> Không thu thập thông tin của người dùng </h2>
          <p className='text-xs text-gray-400 font-medium '>
            TestBank chỉ thu thập những thông tin cần thiết phục vụ cho việc sử dụng của người dùng
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExamCategory;

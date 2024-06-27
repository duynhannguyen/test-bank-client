const StudyGroupMemberList = ({ membetList = [] }) => {
  const list = membetList.map(member => (
    <div
      key={member.id}
      id={member.id}
      className='flex border-b border-blue-500/40  gap-3 p-2 items-center'
    >
      {' '}
      <div className='animate-get-code-success-bg-fade-in '>
        <img
          className=' w-7 h-7 rounded-full  object-cover'
          src={member.picture || '../src/assets/default-avatar/user.png'}
        />
      </div>
      <div className='text-[12px] font-semibold hover:text-blue-500/80 animate-get-code-success-bg-fade-in '>
        {' '}
        {member.lastName} {member.firstName}
      </div>
    </div>
  ));

  return list;
};

export default StudyGroupMemberList;

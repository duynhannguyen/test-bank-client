import { useState } from 'react';
import SimpleHeader from '~/layouts/SimpleHeader';
import TestGate from './_TestGate';
import TestDoingRoom from './_TestDoingRoom';

const Test = () => {
  const [recordData, setRecordData] = useState(null);
  const [roomId, setRoomId] = useState(null);

  return (
    <>
      <SimpleHeader />
      {recordData ? (
        <TestDoingRoom recordData={recordData} roomId={roomId} />
      ) : (
        <TestGate handleSetRecord={data => setRecordData(data)} getRoomId={setRoomId} />
      )}
    </>
  );
};

export default Test;

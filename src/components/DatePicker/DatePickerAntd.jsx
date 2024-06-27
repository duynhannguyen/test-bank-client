import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const DatePickerAntd = ({ setDayOfBirthValue, dayOfBirthValue }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const onHandleChangeDate = (date, dateString) => {
    setDayOfBirthValue(dateString);
  };
  return (
    <Space direction='vertical' size={12}>
      <DatePicker
        onChange={onHandleChangeDate}
        defaultValue={dayjs(dayOfBirthValue, dateFormatList)}
        format={dateFormatList}
      />
    </Space>
  );
};

export default DatePickerAntd;

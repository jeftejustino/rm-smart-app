import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import PropTypes from 'prop-types';

import {Container, Button, Text} from './styles';

export default function DatePicker({defaultDate, enabledTime, onDateChange}) {
  const [date, setDate] = useState(defaultDate);
  const [dateFormatted, setDateFormatted] = useState();
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      if (enabledTime) setShowTime(true);
    }
  };
  const onChangeTime = (event, selectedDate) => {
    setShowTime(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  function showDatePicker() {
    setShow(true);
  }

  useEffect(() => {
    onDateChange(date);
    if (enabledTime) {
      setDateFormatted(format(date, "dd/LL/Y 'às' HH:mm"));
    } else {
      setDateFormatted(format(date, 'dd/LL/Y'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Container>
      <Button
        onPress={() => {
          showDatePicker();
        }}>
        <Text>{dateFormatted}</Text>
      </Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode="date"
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}

      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode="time"
          is24Hour
          display="default"
          onChange={onChangeTime}
        />
      )}
    </Container>
  );
}

DatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  defaultDate: PropTypes.object.isRequired,
  enabledTime: PropTypes.bool,
};

DatePicker.defaultProps = {
  enabledTime: true,
};

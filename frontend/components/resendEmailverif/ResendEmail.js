import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
const ResendVerification = ({ email }) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isTimerActive && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive, secondsLeft]);

  const handleResend = async () => {
    setSecondsLeft(60);
    setIsTimerActive(true);
    await axios.post(`${baseUrl}/resendEmail`, {
      email,
    });
    console.log(email, 'test');
  };

  return (
    <>
      {isTimerActive && secondsLeft > 0 && (
        <Text style={{ color: '#6B7280', fontSize: 15 }}>
          {secondsLeft} secondes
        </Text>
      )}
      {(!isTimerActive || secondsLeft === 0) && (
        <Text
          style={{
            fontFamily: 'poppins',
            fontStyle: 'normal',
            fontSize: FontSize.medium,
            fontWeight: 'bold',
            color: Colors.red,
            marginLeft: 5,
            textDecorationLine: 'underline',
          }}
          onPress={handleResend}
        >
          Renvoyer
        </Text>
      )}
    </>
  );
};
export default ResendVerification;

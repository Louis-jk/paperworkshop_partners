import * as React from 'react';
import {View, Text, Alert} from 'react-native';

const Timer = ({minutes, setMinutes, seconds, setSeconds, onFailConfirm}) => {
  const [timeOver, setTimeOver] = React.useState(false);

  React.useEffect(() => {
    setTimeOver(false);
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          Alert.alert(
            '인증번호 입력시간이 초과되었습니다.',
            '인증번호를 다시 전송해주세요.',
            [
              {
                text: '확인',
                onPress: () => {
                  onFailConfirm();
                  setTimeOver(true);
                },
              },
            ],
          );
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <>
      {!timeOver ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 12,
              color: '#111',
              marginRight: 5,
            }}>
            남은시간 :
          </Text>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 12,
              color: '#111',
              marginRight: 5,
            }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
          <Text style={{fontFamily: 'SCDream4', fontSize: 11, color: '#ccc'}}>
            (인증번호 입력까지 남은시간)
          </Text>
        </View>
      ) : (
        <View
          style={{
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 12,
              color: '#ff5e78',
              marginRight: 5,
            }}>
            입력시간이 초과되었습니다.
          </Text>
        </View>
      )}
    </>
  );
};

export default Timer;

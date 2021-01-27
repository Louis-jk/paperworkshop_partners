import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

import DetailHeader from '../DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [category03, setCategory03] = React.useState(null);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: 'rgba(0, 161, 112, 0.07)',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 15, color: '#000000'}}>누적건수</Text>
            <Text style={{fontSize: 15, color: '#00A170'}}>99,999건</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 15, color: '#000000'}}>누적 견적 금액</Text>
            <Text style={{fontSize: 15, color: '#00A170'}}>999,999,000원</Text>
          </View>
        </View>
        {/* 날짜 선택 Area */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '30%',
              marginRight: 5,
            }}>
            <Picker
              selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
              onValueChange={(itemValue, itemIndex) => {
                setCategory01(itemValue);
              }}
              style={{color: '#A2A2A2'}}
              mode="dropdown">
              <Picker.Item label="2019년" value="2019" />
              <Picker.Item label="2020년" value="2020" />
              <Picker.Item label="2021년" value="2021" />
            </Picker>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '25%',
              marginRight: 5,
            }}>
            <Picker
              selectedValue={category02} //제일 위 선택란에 누른 아이템이 표시된다
              onValueChange={(itemValue, itemIndex) => {
                setCategory02(itemValue);
              }}
              style={{color: '#A2A2A2'}}
              mode="dropdown">
              <Picker.Item label="1월" value="1" />
              <Picker.Item label="2월" value="2" />
              <Picker.Item label="3월" value="3" />
              <Picker.Item label="4월" value="4" />
              <Picker.Item label="5월" value="5" />
              <Picker.Item label="6월" value="6" />
              <Picker.Item label="7월" value="7" />
              <Picker.Item label="8월" value="8" />
              <Picker.Item label="9월" value="9" />
              <Picker.Item label="10월" value="10" />
              <Picker.Item label="11월" value="11" />
              <Picker.Item label="12월" value="12" />
            </Picker>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '45%',
            }}>
            <Picker
              selectedValue={category03} //제일 위 선택란에 누른 아이템이 표시된다
              onValueChange={(itemValue, itemIndex) => {
                setCategory03(itemValue);
              }}
              style={{color: '#A2A2A2'}}
              itemStyle={{fontSize: 12}}
              mode="dropdown">
              <Picker.Item label="시/도 전체" value="" />
              <Picker.Item label="서울" value="1" />
              <Picker.Item label="부산" value="2" />
              <Picker.Item label="대구" value="3" />
              <Picker.Item label="인천" value="4" />
              <Picker.Item label="광주" value="5" />
              <Picker.Item label="세종/대전/청주" value="6" />
              <Picker.Item label="울산" value="7" />
              <Picker.Item label="경기" value="8" />
              <Picker.Item label="강원" value="9" />
              <Picker.Item label="충청" value="10" />
              <Picker.Item label="전라북도" value="11" />
              <Picker.Item label="전라남도" value="12" />
              <Picker.Item label="경상북도" value="13" />
              <Picker.Item label="경상남도" value="14" />
              <Picker.Item label="제주" value="15" />
            </Picker>
          </View>
        </View>

        {/* // 날짜 선택 Area */}
        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
            width: Dimensions.get('window').width,
          }}
        />
        <View
          style={{
            height: 6,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('window').width,
            marginBottom: 20,
          }}
        />
        {/* // 경계 라인 */}

        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 15, color: '#111111'}}>낙찰 건 수</Text>
            <Text style={{fontSize: 15, color: '#00A170'}}>50건</Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#F5F5F5',
              width: Dimensions.get('window').width,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 15, color: '#111111'}}>납품 실적 금액</Text>
            <Text style={{fontSize: 15, color: '#00A170'}}>99,999,000원</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  partnerInfoBox: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontSize: 15,
    color: '#00A170',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
  },
});

export default index;

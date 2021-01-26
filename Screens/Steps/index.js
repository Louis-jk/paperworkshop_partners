import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';

// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  console.log('Steps props :', props);

  const [category01, setCategory01] = React.useState(null);
  const [value, setValue] = React.useState(null);

  console.log('category01 : ', category01);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
        {/* 카테고리 선택 및 검색 부분 */}
        <View
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#F5F5F5',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49.5%',
              }}>
              <Picker
                selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory01(itemValue);
                }}
                style={{color: '#A2A2A2'}}
                mode="dropdown">
                <Picker.Item label="패키지" value="package" />
                <Picker.Item label="일반인쇄물" value="printing" />
              </Picker>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '49.5%',
              }}>
              <Picker
                selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory01(itemValue);
                }}
                style={{color: '#A2A2A2'}}
                mode="dropdown">
                <Picker.Item label="전체" value="package" />
                <Picker.Item label="일반인쇄물" value="printing" />
              </Picker>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                backgroundColor: '#fff',
                width: '27%',
              }}>
              <Picker
                selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory01(itemValue);
                }}
                style={{color: '#A2A2A2'}}
                mode="dropdown">
                <Picker.Item label="제목" value="package" />
                <Picker.Item label="회사" value="printing" />
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder="검색어를 입력하세요."
                style={{
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  paddingHorizontal: 10,
                  width: '65%',
                  marginRight: 5,
                }}
              />
              <TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00A170',
                    borderRadius: 4,
                  }}>
                  <Text style={{color: '#fff', paddingHorizontal: 20}}>
                    검색
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/* // 카테고리 선택 및 검색 부분 */}

        {/* 리스트 출력 부분 */}
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep}>입찰중</Text>
                <Text style={styles.listDday}>D-Day</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep02Badge}>
                  <Text style={styles.listStep02BadgeText}>견적 확정 대기</Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep02Badge}>
                  <Text style={styles.listStep02BadgeText}>
                    계약금 입금 대기
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep02Badge}>
                  <Text style={styles.listStep02BadgeText}>
                    계약금 입금 대기
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep03Badge}>
                  <Text style={styles.listStep03BadgeText}>
                    계약금 입금 완료
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep03Badge}>
                  <Text style={styles.listStep03BadgeText}>
                    계약금 입금 완료
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep03Badge}>
                  <Text style={styles.listStep03BadgeText}>
                    계약금 입금 완료
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep02}>파트너 선정</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderStep')}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <View style={styles.listStep03Badge}>
                  <Text style={styles.listStep03BadgeText}>
                    계약금 입금 완료
                  </Text>
                </View>
                <Text style={styles.listTitle}>
                  [인쇄+디자인] 중소기업 박람회 리플렛 제...
                </Text>
                <Text style={styles.listDesc}>
                  칼라 박스 - B형 십자 (경기/김성규)
                </Text>
              </View>
              <View>
                <Text style={styles.listStep03}>마감</Text>
                <Text style={styles.listDday02}>D-25</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* // 리스트 출력 부분 */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  picker: {
    width: 180,
  },
  listWrap: {
    paddingVertical: 20,
  },
  listTitle: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontSize: 14,
    color: '#00A170',
  },
  listDday: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  listStep02: {
    fontSize: 14,
    color: '#275696',
  },
  listDday02: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#000000',
  },
  listStep03: {
    fontSize: 14,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  listStep02Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#00A170',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep02BadgeText: {
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  listStep03Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep03BadgeText: {
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});

export default index;

import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Header from '../Common/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '제작 요청'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>제작 요청</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '납품 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>납품 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {title: '수령 완료'},
              })
            }
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
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 2020.12.30
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>수령 완료</Text>
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
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },
  listStep: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#000000',
  },
  listDday: {
    fontFamily: SCDream4,
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  listStep04Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(0, 161, 112, 0.07)',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep04BadgeText: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#00A170',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default index;

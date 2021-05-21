import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';

import DetailHeader from '../Common/DetailHeader';
import Estimate from '../../src/api/Estimate';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.pe_id;
  const cate1 = props.route.params.cate1;


  const [isLoading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState(null);

  const getEstimateMoreDetailAPI = () => {
    setLoading(true);
    Estimate.getMoreDetail('proc_my_real_estimate_detail2', pe_id)
      .then((res) => {
        
        if (res.data.result === '1' && res.data.count > 0) {
          console.log("resres ??? ", res);
          setDetail(res.data.item);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getEstimateMoreDetailAPI();
    // if (cate1 === '1') {
    //   getEstimateMoreDetailAPI('proc_my_real_estimate_detail2');
    // } else if (cate1 === '0') {
    //   getEstimateMoreDetailAPI('proc_my_real_estimate_detail');
    // } else {
    //   getEstimateMoreDetailAPI('proc_my_real_estimate_detail3');
    // }
  }, []);

  
  // 이미지 모달창
  const ImageModal = ({toggleModal, isVisible, imgPath}) => {
    let extension = '';
    if (imgPath !== null) {
      extension = imgPath.slice(imgPath.lastIndexOf('.'));
    }

    return (
      <View>
        <Modal
          isVisible={isVisible}
          // onBackdropPress={toggleModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            {extension !== '.gif' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width - 40}
                source={{uri: `${imgPath}`}}
              />
            ) : (
              <FastImage
                source={{uri: `${imgPath}`}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 250,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: SCDream4, fontSize: 13, color: '#fff'}}>
              닫기
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(null);

  // 이미지 모달 핸들러
  const imageModalHandler = (path) => {
    setModalVisible(!isModalVisible);
    setImgPath(path);
  };


  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            elevation: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <ActivityIndicator size="large" color="#00A170" />
        </View>
      )}
      {detail !== null && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <ImageModal
            imgPath={imgPath}
            isVisible={isModalVisible}
            toggleModal={imageModalHandler}
          />
          <View style={styles.wrap}>
            <Text
              style={{
                fontFamily: SCDream4,
                fontSize: 16,
                color: '#00A170',
                marginBottom: 20,
              }}>
              기본 정보
            </Text>
            <View style={[styles.infoBox]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>제목</Text>
                <Text style={styles.detailsDesc}>{detail.basic.title}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>분류</Text>
                <Text style={styles.detailsDesc}>{detail.basic.ca_name}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>견적 마감일</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic.estimate_date}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>납품 희망일</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic.delivery_date}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>디자인 의뢰</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic.design_print === 'P'
                    ? '인쇄만 의뢰'
                    : '인쇄 + 디자인 의뢰'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic.favor_area === 'seoul'
                    ? '서울'
                    : detail.basic.favor_area === 'busan'
                    ? '부산'
                    : detail.basic.favor_area === 'daegu'
                    ? '대구'
                    : detail.basic.favor_area === 'incheon'
                    ? '인천'
                    : detail.basic.favor_area === 'gwangju'
                    ? '광주'
                    : detail.basic.favor_area === 'sejong'
                    ? '세종'
                    : detail.basic.favor_area === 'ulsan'
                    ? '울산'
                    : detail.basic.favor_area === 'gyeongi'
                    ? '경기'
                    : detail.basic.favor_area === 'gangwon'
                    ? '강원'
                    : detail.basic.favor_area === 'choongcheong'
                    ? '충청'
                    : detail.basic.favor_area === 'jeonra'
                    ? '전라'
                    : detail.basic.favor_area === 'gyeongsang'
                    ? '경상'
                    : detail.basic.favor_area === 'jeju'
                    ? '제주'
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>첨부파일</Text>
              {detail.basic.pe_file === null || detail.basic.pe_file === '' ? (
                <Text style={styles.detailsDesc}>첨부파일이 없습니다.</Text>
              ) : null}
            </View>
            {(detail.basic.pe_file && detail.basic.type_name === 'jpg' ||  detail.basic.pe_file && detail.basic.type_name === 'png') ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => imageModalHandler(detail.basic.pe_file)}>
                    <Image
                      source={{uri: `${detail.basic.pe_file}`}}
                      resizeMode="cover"
                      style={{
                        width: 114,
                        height: 114,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) 
              :
              detail.basic.pe_file && detail.basic.type_name === 'gif' ? (
                <TouchableOpacity
                  onPress={() => imageModalHandler(details.pe_file)}>
                  <FastImage
                    source={{uri: `${details.pe_file}`}}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                      width: 114,
                      height: 114,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              )
              : 
              detail.basic.pe_file &&
              (detail.basic.type_name !== 'jpg' ||
              detail.basic.type_name !== 'png' ||
              detail.basic.type_name !== 'gif') ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  fileDownloadHandler(detail.basic.pe_file, detail.basic.pe_source_file)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}                      
                  resizeMode="cover"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                />
                <Text style={{fontFamily: SCDream4}}>
                  {detail.basic.pe_source_file}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

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
            }}
          />
          {/* // 경계 라인 */}

          <View style={[styles.wrap, {marginVertical: 10}]}>
            <Text
              style={{
                fontFamily: SCDream4,
                fontSize: 16,
                color: '#00A170',
                marginBottom: 20,
              }}>
              상세정보
            </Text>
            <View style={[styles.infoBox, {marginBottom: 10}]}>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>타입</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic.ca_type_name}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>규격(가로/세로/높이)</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic2.pwidth}/{detail.basic2.plength}/
                  {detail.basic2.pheight}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>수량</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic2.cnt
                    ? detail.basic2.cnt
                    : detail.basic2.cnt_etc
                    ? detail.basic2.cnt_etc
                    : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>목형</Text>
                <Text style={styles.detailsDesc}>
                  {detail.basic2.wood_pattern === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              {detail.basic.ca_id === '12' ? (
                <>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>싸바리형태</Text>
                    <Text style={styles.detailsDesc}>
                      {detail.basic2.stype ? detail.basic2.stype : '없음'}
                    </Text>
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>속지 판지두께</Text>
                    <Text style={styles.detailsDesc}>
                      {detail.basic2.board_tk ? detail.basic2.board_tk : '없음'}
                    </Text>
                  </View>
                </>
              ) : null}
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>인쇄도수</Text>
                <Text style={styles.detailsDesc}>
                  {detail.print.print_frequency
                    ? detail.print.print_frequency
                    : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>인쇄교정</Text>
                <Text style={styles.detailsDesc}>
                  {detail.print.proof_printing === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>인쇄감리</Text>
                <Text style={styles.detailsDesc}>
                  {detail.print.print_supervision === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>지류명</Text>
                <Text style={styles.detailsDesc}>
                  {detail.feeder.feeder_name}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>지종</Text>
                <Text style={styles.detailsDesc}>
                  {detail.feeder.paper_name}
                </Text>
              </View>
              {detail.feeder.paper_name2 ?
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>지종상세</Text>
                <Text style={styles.detailsDesc}>
                  {detail.feeder.paper_name2}
                </Text>
              </View> : null }

              {(detail.basic.ca_id === '10' || detail.basic.ca_id === '11') && detail.feeder.paper_goal ? (
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>골</Text>
                  <Text style={styles.detailsDesc}>
                    {detail.feeder.paper_goal}
                  </Text>
                </View>
              ) : null}

              {(detail.basic.ca_id === '10' || detail.basic.ca_id === '11') && detail.feeder.paper_goal_etc ? (
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>골(직접입력)</Text>
                  <Text style={styles.detailsDesc}>
                    {detail.feeder.paper_goal_etc}
                  </Text>
                </View>
              ) : null}

              {detail.basic.ca_id !== '10' && detail.feeder.paper_weight ? (
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>평량</Text>
                  <Text style={styles.detailsDesc}>
                    {detail.feeder.paper_weight}
                  </Text>
                </View>
              ) : null}

              {detail.basic.ca_id !== '10' && detail.feeder.paper_weight_etc ? (
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>평량(직접입력)</Text>
                  <Text style={styles.detailsDesc}>
                    {detail.feeder.paper_weight_etc}
                  </Text>
                </View>
              ) : null}
             
             {detail.feeder.paper_color ?
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>색상</Text>
                <Text style={styles.detailsDesc}>
                  {detail.feeder.paper_color}
                </Text>
              </View> : null }

              {detail.feeder.paper_color_etc ?
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>색상(직접입력)</Text>
                <Text style={styles.detailsDesc}>
                  {detail.feeder.paper_color_etc}
                </Text>
              </View> : null }

              <View style={styles.details}>
                <Text style={styles.detailsTitle}>박가공</Text>
                <Text style={styles.detailsDesc}>
                  {detail.end.park_processing === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>형압</Text>
                <Text style={styles.detailsDesc}>
                  {detail.end.press_design === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>부분 실크</Text>
                <Text style={styles.detailsDesc}>
                  {detail.end.partial_silk === 'Y' ? '있음' : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>코팅</Text>
                <Text style={styles.detailsDesc}>
                  {detail.end.coating ? detail.end.coating : '없음'}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>첨부파일</Text>
                {detail.basic2.pe_file2 === null ||
                detail.basic2.pe_file2 === '' ? (
                  <Text style={styles.detailsDesc}>첨부파일이 없습니다.</Text>
                ) : null}
              </View>
              {(detail.basic2.pe_file2 && detail.basic2.type_name2 === 'jpg' ||  detail.basic2.pe_file2 && detail.basic2.type_name2 === 'png') ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => imageModalHandler(detail.basic2.pe_file2)}>
                      <Image
                        source={{uri: `${detail.basic2.pe_file2}`}}
                        resizeMode="cover"
                        style={{
                          width: 114,
                          height: 114,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) 
                :
                detail.basic2.pe_file2 && detail.basic2.type_name2 === 'gif' ? (
                  <TouchableOpacity
                    onPress={() => imageModalHandler(basic2.pe_file2)}>
                    <FastImage
                      source={{uri: `${detail.basic2.pe_file2}`}}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{
                        width: 114,
                        height: 114,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                )
                : 
                detail.basic2.pe_file2 &&
                (detail.basic2.type_name2 !== 'jpg' ||
                detail.basic2.type_name2 !== 'png' ||
                detail.basic2.type_name2 !== 'gif') ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    fileDownloadHandler(detail.basic2.pe_file2, detail.basic2.pe_source_file2)
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../src/assets/icon_down.png')}                      
                    resizeMode="cover"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      marginRight: 5,
                    }}
                  />
                  <Text style={{fontFamily: SCDream4}}>
                    {detail.basic2.pe_source_file2}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {/* <TouchableOpacity
            onPress={() => Alert.alert('제출')}
            activeOpacity={0.8}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>견적 조정</Text>
            </View>
          </TouchableOpacity> */}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  infoBox: {},
  infoStepDesc: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: SCDream4,
    fontSize: 16,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailsTitle: {
    fontFamily: SCDream4,
    width: 145,
    fontSize: 14,
    marginRight: 10,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#000',
  },
  detailsTitle02: {
    fontFamily: SCDream4,
    width: 200,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: SCDream4,
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 25,
  },
  orderInfoDesc: {
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  wd50per: {
    width: '50%',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#707070',
  },
  submitBtn: {
    borderRadius: 5,
    backgroundColor: '#00A170',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: SCDream4,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  submitBtnBorder: {
    borderWidth: 1,
    borderColor: '#00A170',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnBorderText: {
    fontFamily: SCDream4,
    fontSize: 16,
    color: '#00A170',
    textAlign: 'center',
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

export default Detail;

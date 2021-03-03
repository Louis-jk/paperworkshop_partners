// action type
const USER_ID = 'USER_ID';
const USER_PWD = 'USER_PWD';
const USER_NAME = 'USER_NAME';
const USER_MOBILE = 'USER_MOBILE';
const USER_EMAIL = 'USER_EMAIL';
const USER_MOBILE_CFM = 'USER_MOBILE_CFM';
const USER_TYPE = 'USER_TYPE';
const USER_COMPANY = 'USER_COMPANY';
const USER_PROFILE_IMG = 'USER_PROFILE_IMG';
const USER_ESTIMATE_CNT = 'USER_ESTIMATE_CNT';

// action method
export const UserId = (payload) => ({type: USER_ID, payload});
export const UserPwd = (payload) => ({type: USER_PWD, payload});
export const UserName = (payload) => ({type: USER_NAME, payload});
export const UserMobile = (payload) => ({type: USER_MOBILE, payload});
export const UserEmail = (payload) => ({type: USER_EMAIL, payload});
export const UserMobileCfm = (payload) => ({type: USER_MOBILE_CFM, payload});
export const UserType = (payload) => ({type: USER_TYPE, payload});
export const UserCompany = (payload) => ({type: USER_COMPANY, payload});
export const UserProfileImg = (payload) => ({type: USER_PROFILE_IMG, payload});
export const UserEstimateCnt = (payload) => ({
  type: USER_ESTIMATE_CNT,
  payload,
});

// initialize
const initialize = {
  mb_id: null,
  mb_name: null,
  mb_hp: null,
  mb_email: null,
  mb_1: null,
  mb_level: null,
  mb_2: null,
  mb_profile_img: null,
  estimate_cnt: 0,
};

// reducer create
export default function setJoinInfo(state = initialize, action) {
  switch (action.type) {
    case USER_ID:
      return {
        ...state,
        mb_id: action.payload,
      };
    case USER_PWD:
      return {
        ...state,
        mb_password: action.payload,
      };
    case USER_NAME:
      return {
        ...state,
        mb_name: action.payload,
      };
    case USER_MOBILE:
      return {
        ...state,
        mb_hp: action.payload,
      };
    case USER_EMAIL:
      return {
        ...state,
        mb_email: action.payload,
      };
    case USER_MOBILE_CFM:
      return {
        ...state,
        mb_1: action.payload,
      };
    case USER_TYPE:
      return {
        ...state,
        mb_level: action.payload,
      };
    case USER_COMPANY:
      return {
        ...state,
        mb_2: action.payload,
      };
    case USER_PROFILE_IMG:
      return {
        ...state,
        mb_profile_img: action.payload,
      };
    case USER_ESTIMATE_CNT:
      return {
        ...state,
        estimate_cnt: action.payload,
      };
    default:
      return state;
  }
}

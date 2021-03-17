// action type
const USER_NAME = 'USER_NAME';
const USER_MOBILE = 'USER_MOBILE';
const USER_EMAIL = 'USER_EMAIL';
const USER_COMPANY = 'USER_COMPANY';
const USER_ID = 'USER_ID';
const USER_MOBILE_CFM = 'USER_MOBILE_CFM';
const USER_TYPE = 'USER_TYPE';
const USER_PROFILE = 'USER_PROFILE';
const USER_ESTIMATE_CNT = 'USER_ESTIMATE_CNT';
const USER_PTYPE = 'USER_PTYPE';
const USER_PROFILE_IMG = 'USER_PROFILE_IMG';

// action method
export const UserId = (payload) => ({type: USER_ID, payload});
export const UserName = (payload) => ({type: USER_NAME, payload});
export const UserMobile = (payload) => ({type: USER_MOBILE, payload});
export const UserEmail = (payload) => ({type: USER_EMAIL, payload});
export const UserMobileCfm = (payload) => ({type: USER_MOBILE_CFM, payload});
export const UserType = (payload) => ({type: USER_TYPE, payload});
export const UserCompany = (payload) => ({type: USER_COMPANY, payload});
export const UserProfile = (payload) => ({type: USER_PROFILE, payload});
export const UserPtype = (payload) => ({type: USER_PTYPE, payload});
export const UserProfileImg = (payload) => ({type: USER_PROFILE_IMG, payload});
export const UserEstimateCnt = (payload) => ({
  type: USER_ESTIMATE_CNT,
  payload,
});

// initialize
const initialize = {
  mb_name: null,
  mb_hp: null,
  mb_email: null,
  mb_2: null,
  mb_id: null,
  mb_1: null,
  mb_level: null,
  mb_profile: null,
  ptype: null,
  estimate_cnt: '0',
  profileImg: null,
};

// reducer create
export default function setJoinInfo(state = initialize, action) {
  switch (action.type) {
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
    case USER_COMPANY:
      return {
        ...state,
        mb_2: action.payload,
      };
    case USER_ID:
      return {
        ...state,
        mb_id: action.payload,
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
    case USER_PROFILE:
      return {
        ...state,
        mb_profile: action.payload,
      };
    case USER_PTYPE:
      return {
        ...state,
        ptype: action.payload,
      };
    case USER_ESTIMATE_CNT:
      return {
        ...state,
        estimate_cnt: action.payload,
      };
    case USER_PROFILE_IMG:
      return {
        ...state,
        profileImg: action.payload,
      };
    default:
      return state;
  }
}

// action type
const JOIN_ID = 'JOIN_ID';
const JOIN_PWD = 'JOIN_PWD';
const JOIN_NAME = 'JOIN_NAME';
const JOIN_MOBILE = 'JOIN_MOBILE';
const JOIN_MOBILE_CFM = 'JOIN_MOBILE_CFM';
const JOIN_EMAIL = 'JOIN_EMAIL';
const JOIN_COMPANY = 'JOIN_COMPANY';

// action method
export const joinId = (payload) => ({type: JOIN_ID, payload});
export const joinPwd = (payload) => ({type: JOIN_PWD, payload});
export const joinName = (payload) => ({type: JOIN_NAME, payload});
export const joinMobile = (payload) => ({type: JOIN_MOBILE, payload});
export const joinMobileCfm = (payload) => ({type: JOIN_MOBILE_CFM, payload});
export const joinEmail = (payload) => ({type: JOIN_EMAIL, payload});
export const joinCompany = (payload) => ({type: JOIN_COMPANY, payload});

// initialize
const initialize = {
  mb_id: null,
  mb_password: null,
  mb_name: null,
  mb_hp: null,
  mb_1: null,
  mb_email: null,
  mb_2: null,
};

// reducer create
export default function setJoinInfo(state = initialize, action) {
  switch (action.type) {
    case JOIN_ID:
      return {
        ...state,
        mb_id: action.payload,
      };
    case JOIN_PWD:
      return {
        ...state,
        mb_password: action.payload,
      };
    case JOIN_NAME:
      return {
        ...state,
        mb_name: action.payload,
      };
    case JOIN_MOBILE:
      return {
        ...state,
        mb_hp: action.payload,
      };
    case JOIN_MOBILE_CFM:
      return {
        ...state,
        mb_1: action.payload,
      };
    case JOIN_EMAIL:
      return {
        ...state,
        mb_email: action.payload,
      };
    case JOIN_COMPANY:
      return {
        ...state,
        mb_2: action.payload,
      };
    default:
      return state;
  }
}

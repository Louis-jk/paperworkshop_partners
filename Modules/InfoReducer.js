// action type
const FCM_TOKEN = 'FCM_TOKEN';

// action method
export const setFcmToken = (payload) => ({type: FCM_TOKEN, payload});

// initialize
const initialize = {
  fcmToken: null,
};

// reducer create
export default function setInfo(state = initialize, action) {
  switch (action.type) {
    case FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.payload,
      };
    default:
      return state;
  }
}

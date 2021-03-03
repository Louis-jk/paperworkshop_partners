import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onSignIn(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getDetail(cate1) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_cate_list',
        cate1,
      }),
    });
  },
};

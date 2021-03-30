import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getList(type, step, company_id, cate1, ca_id, sfl, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_list',
        type,
        step,
        company_id,
        cate1,
        ca_id,
        sfl,
        search,
      }),
    });
  },
  getDetail(pe_id, company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_detail',
        pe_id,
        company_id,
      }),
    });
  },
  getMoreDetail(method, pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        pe_id,
      }),
    });
  },
};

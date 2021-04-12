import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 통계 가져오기
  getStatistics(company_id, year, month, location) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_statistics',
        company_id,
        year,
        month,
        location,
      }),
    });
  },
};

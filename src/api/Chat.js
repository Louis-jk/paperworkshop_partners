import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 채팅방 글 히스토리 가져오기
  getChatHistory(pm_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_chat_list',
        pm_id,
      }),
    });
  },
  // 채팅 메세지 보내기
  sendMessage(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 채팅방 리스트
  getChatRoomList(company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_message_list',
        company_id,
      }),
    });
  },
  // 채팅방 나가기
  goOutChatRoom(pm_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_chat_out',
        pm_id,
      }),
    });
  },
};

// 1. 변이 이름을 상수로 선언
// p.244 Flux 패턴에서는 변이 이름을 상수로 사용하는 것이 일반적인 방법이라고 한다.
// const FETCH_MEMOS = 'FETCH_MEMOS';
import {
  FETCH_MEMOS,
  ADD_MEMO,
  DELETE_MEMO,
  EDIT_MEMO,
  SET_EDITING_ID,
  RESET_EDITING_ID
} from './mutations-types';

export default {
  // 2. FETCH_MEMOS 변수를 변이 이름으로 가지는 변이 함수를 작성
  [FETCH_MEMOS](state, payload) {
    state.memos = payload;
  },
  [ADD_MEMO](state, payload) {
    state.memos.push(payload);
  },
  [DELETE_MEMO](state, id) {
    // fiter가 아니라 findIndex이다...
    const targetIndex = state.memos.findIndex(v => v.id === id);
    state.memos.splice(targetIndex, 1);
  },
  [EDIT_MEMO](state, payload) {
    const { id, content } = payload;
    const targetIndex = state.memos.findIndex(v => v.id === id);
    const targetMemo = state.memos[targetIndex];
    //
    state.memos.splice(targetIndex, 1, { ...targetMemo, content });
  },
  // 추가된 변이 타입에 대한 함수 선언
  [SET_EDITING_ID](state, id) {
    state.editingId = id;
  },
  [RESET_EDITING_ID](state) {
    // 초기값 0으로 설정
    state.editingId = 0;
  }
};

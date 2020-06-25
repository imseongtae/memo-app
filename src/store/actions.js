// 1. 사용하려는 axios 라이브러리를 가져온다.
import axios from 'axios';
// FETCH_MEMOS 상수를 가져온다
import {
  FETCH_MEMOS,
  ADD_MEMO,
  DELETE_MEMO,
  EDIT_MEMO
} from './mutations-types';

// 2. MemoApp 컴포넌트에서 사용한 axios 인스턴스를 동일하게 가져옴
const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
});

// 3. 사용할 함수를 정의
export function fetchMemos({ commit }) {
  // 4. 기존 MemoApp 컴포넌트의 created 훅에서 실행 함수를 가져옴
  memoAPICore.get('/').then(res => {
    // 5. API 호출 결과의 데이터와 함께 FETCH_MEMOS 라는 이름의 mutation의 커밋을 함
    // 6. mutations-types에 선언된 상수로 FETCH_MEMOS의 유형을 변경
    commit(FETCH_MEMOS, res.data);
  });
}

export function addMemo({ commit }, payload) {
  // 1. axios 객체의 post 메소드를 이용하여 데이터를 추가한다.
  memoAPICore.post('/', payload).then(res => {
    // 2. 정상적인 메모를 생성 후 결과값을 memos에 추가
    // 3. ADD_MEMO 변이를 호출하고, API를 통해 받아온 메모 데이터를 넘겨줌
    commit(ADD_MEMO, res.data);
  });
}

export function deleteMemo({ commit }, id) {
  memoAPICore.delete(`/${id}`).then(() => {
    commit(DELETE_MEMO, id);
  });
}

export function updateMemo({ commit }, payload) {
  const { id, content } = payload;
  memoAPICore.put(`${id}`, { content }).then(() => {
    commit(EDIT_MEMO, payload);
  });
}

export default {
  fetchMemos,
  addMemo,
  deleteMemo,
  updateMemo
};

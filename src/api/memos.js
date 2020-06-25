import { memos } from './index';

export function fetchMemosAPI() {
  return memos.get('/');
}

export function addMemoAPI(memoData) {
  return memos.post('/', memoData);
}

export function deleteMemoAPI(memoId) {
  // return memos.delete('/', memoId); // 이렇게 오류를 냄
  return memos.delete(`/${memoId}`);
}

export function updateMemoAPI(memoId, memoData) {
  return memos.put(`${memoId}`, memoData);
}

export default {
  fetchMemosAPI,
  addMemoAPI,
  deleteMemoAPI,
  updateMemoAPI
};

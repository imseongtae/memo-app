import {
  fetchMemosAPI,
  addMemoAPI,
  deleteMemoAPI,
  updateMemoAPI
} from '../api/memos';
import {
  FETCH_MEMOS,
  ADD_MEMO,
  DELETE_MEMO,
  EDIT_MEMO
} from './mutations-types';

export async function fetchMemos({ commit }) {
  try {
    const { data } = await fetchMemosAPI();
    commit(FETCH_MEMOS, data);
  } catch (error) {
    console.error(error);
  }
}

export async function addMemo({ commit }, payload) {
  try {
    const { data } = await addMemoAPI(payload);
    commit(ADD_MEMO, data);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMemo({ commit }, id) {
  try {
    await deleteMemoAPI(id);
    commit(DELETE_MEMO, id);
  } catch (error) {
    console.error(error);
  }
}

export async function updateMemo({ commit }, payload) {
  try {
    const { id, content } = payload;
    await updateMemoAPI(id, { content });
    commit(EDIT_MEMO, payload);
  } catch (error) {
    console.error(error);
  }
}

export default {
  fetchMemos,
  addMemo,
  deleteMemo,
  updateMemo
};

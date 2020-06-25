<template>
  <div class="memo-app">
    <!-- <memo-form v-on:addMemo="addMemo" /> -->
    <!-- 컴포넌트의 addMemo 메소드를 자식 컴포넌트인 
      MemoForm에서 작성한 addMemo 이벤트의 콜백함수로 연결 -->
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <!-- Memo 컴포넌트를 추가 -->
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @deleteMemo="deleteMemo"
        @updateMemo="updateMemo"
        :editingId="editingId"
        @setEditingId="SET_EDITING_ID"
        @resetEditingId="RESET_EDITING_ID"
      />
    </ul>
  </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

// axios
// import axios from 'axios';
// mapActions 헬퍼 함수를 import
import { mapActions, mapState, mapMutations } from 'vuex';
import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types';
// const memoAPICore = axios.create({
//   baseURL: 'http://localhost:8000/api/memos'
// });

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
  },
  data() {
    return {
      // memos: [] // 기존 데이터 삭제
    };
  },
  computed: {
    // editingId 값을 컴포넌트에 매핑
    ...mapState(['memos', 'editingId'])
  },
  created() {
    this.init();
  },
  methods: {
    // mapActions 헬퍼 함수에 사용할 actions 함수를 주입
    ...mapActions(['fetchMemos', 'addMemo', 'deleteMemo', 'updateMemo']),
    ...mapMutations([SET_EDITING_ID, RESET_EDITING_ID]),
    init() {
      this.fetchMemos();
    },
    // 기존 addMemo 함수는 위치에 따라 오버라이딩 될 수도 있으므로 삭제
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString);
    }
    // updateMemo(payload) {
    // const { id, content } = payload;
    // const targetIndex = this.memos.findIndex(v => v.id === id);
    // const targetMemo = this.memos[targetIndex];
    // 1. 수정 대상과 일치하는 id 값과 수정된 단락에 대해 데이터를 delete put과 함께 요청
    // memoAPICore.put(`/${id}`, { content }).then(() => {
    // 2. 요청 후, MemoApp 컴포넌트의 memos 데이터에서도 해당하는 데이터를 업데이트함
    // this.memos.splice(targetIndex, 1, { ...targetMemo, content });
    // });
    // }
  }
};
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>

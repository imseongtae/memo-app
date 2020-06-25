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

import { mapActions, mapState, mapMutations } from 'vuex';
import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types';

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
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
    }
  }
};
</script>

<style scoped>
.memo-list {
  padding: 20px 0;
  margin: 0;
}
</style>

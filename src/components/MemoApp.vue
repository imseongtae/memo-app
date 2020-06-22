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
      />
    </ul>
  </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
  },
  data() {
    return {
      memos: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    },
    addMemo(payload) {
      // MemoForm에서 올려받은 데이터를 먼저 컴포넌트 내부 데이터에 추가
      this.memos.push(payload);
      // 문자열로 변환 후, localStorage에 저장
      this.storeMemo();
    },
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString);
    },
    deleteMemo(id) {
      // 1. 자식 컴포넌트에서 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다
      const targetIndex = this.memos.findIndex(v => v.id === id);
      // 2. 찾은 인덱스 번호에 해당하는 메모 데이터를 삭제
      this.memos.splice(targetIndex, 1);
      // 3. 삭제된 후의 데이터를 다시 로컬스토리지에 저장
      this.storeMemo();
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

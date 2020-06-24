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
      />
    </ul>
  </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

// axios
import axios from 'axios';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
});

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
      // 1. 기존 localStorage를 사용하는 코드 주석처리
      // this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
      // 2. 생성한 Axios 객체의 get 메소드를 이용하여 데이터 받아오기
      memoAPICore.get('/').then(res => {
        // 3. 받아온 데이터를 memos에 저장
        this.memos = res.data;
      });
    },
    addMemo(payload) {
      // 1. axios 객체의 post 메소드를 이용하여 데이터를 추가한다.
      memoAPICore.post('/', payload).then(res => {
        // 2. 정상적인 메모를 생성 후 결과값을 memos에 추가
        this.memos.push(res.data);
      });
    },
    storeMemo() {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString);
    },
    deleteMemo(id) {
      // 1. 자식 컴포넌트에서 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다
      const targetIndex = this.memos.findIndex(v => v.id === id);
      // 삭제하는 대상과 일치하는 id 값을 delete 메소드와 함께 요청한다.
      memoAPICore.delete(`/${id}`).then(() => {
        // 2. 찾은 인덱스 번호에 해당하는 메모 데이터를 삭제
        this.memos.splice(targetIndex, 1);
      });
    },
    updateMemo(payload) {
      const { id, content } = payload;
      const targetIndex = this.memos.findIndex(v => v.id === id);
      const targetMemo = this.memos[targetIndex];
      // 1. 수정 대상과 일치하는 id 값과 수정된 단락에 대해 데이터를 delete put과 함께 요청
      memoAPICore.put(`/${id}`, { content }).then(() => {
        // 2. 요청 후, MemoApp 컴포넌트의 memos 데이터에서도 해당하는 데이터를 업데이트함
        this.memos.splice(targetIndex, 1, { ...targetMemo, content });
      });
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

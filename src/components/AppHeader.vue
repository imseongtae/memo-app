<template>
  <div class="app-header">
    <h1>메모 애플리케이션</h1>
    <p>
      <strong>{{ getMemoCount }}</strong> 개
    </p>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
// 1. mapGetters 헬퍼 함수 추가
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    // getMemoCount() {
    //   return this.memos.length;
    // }
    // ...mapState(['memos'])
    // 2. 사용할 함수를 mapGetters 헬퍼함수를 통해 컴포넌트에 매핑
    ...mapGetters(['getMemoCount'])
  }
};
</script>

<style scoped>
.app-header {
  overflow: hidden;
  padding: 52px 0 27px;
}
.app-header h1 {
  float: left;
  font-size: 24px;
  text-align: center;
}

.app-header p {
  float: right;
  padding-top: 6px;
  font-size: 18px;
  vertical-align: bottom;
}
.app-header p strong {
  color: #ff5a00;
}
</style>

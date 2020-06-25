<template>
  <li class="memo-item">
    <strong>{{ memo.title }}</strong>
    <!-- p태그에 더블클릭 이벤트 추가 -->
    <p @dblclick="handleDbClick">
      <template v-if="!isEditing">
        {{ memo.content }}
      </template>
      <!-- 2. 수정 필드를 위한 태그 추가 -->
      <input
        v-else
        type="text"
        ref="content"
        :value="memo.content"
        @keydown.enter="updateMemo"
        @blur="handleBlur"
      />
    </p>

    <button type="button" @click="deleteMemo">
      <i class="fas fa-times"></i>
    </button>
  </li>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    memo: {
      type: Object
    },
    // 부모 컴포넌트로부터 내려받은 editingId 추가
    editingId: {
      type: Number
    }
  },
  // 수정 중 여부 데이터는 삭제
  // data() {
  //   return {
  //     isEditing: false
  //   };
  // },
  computed: {
    isEditing() {
      // 현재 메모가 수정 중인 여부를 computed를 통해 계산
      return this.memo.id === this.editingId;
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate =>', this.$refs.content);
  },
  updated() {
    console.log('updated =>', this.$refs.content);
  },
  methods: {
    deleteMemo() {
      // memo id를 deleteMemo 함수의 파라미터로 전달
      const id = this.memo.id;
      this.$emit('deleteMemo', id);
    },
    handleDbClick() {
      // this.isEditing = true;
      // console.log('handleDbClick =>', this.$refs.content);
      this.$emit('setEditingId', this.memo.id);
      this.$nextTick(() => {
        this.$refs.content.focus();
      });
    },
    updateMemo(e) {
      const id = this.memo.id;
      const content = e.target.value.trim();
      if (content.length <= 0) return false;
      this.$emit('updateMemo', { id, content });
      // this.isEditing = false;
      // 수정완료 후 인풋에서 포커스 제거
      this.$refs.content.blur();
    },
    handleBlur() {
      // this.isEditing = false;
      this.$emit('resetEditingId');
    }
  }
};
</script>

<style scoped>
.memo-item {
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: 24px;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  list-style: none;
}
.memo-item button {
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: #e5e5e5;
  border: 0;
}
.memo-item strong {
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: normal;
  word-break: break-all;
}
.memo-item p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
}

.memo-item p input[type='text'] {
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  border: 1px solid #999;
}
</style>

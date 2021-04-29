<template>
  <div class="about">
    <template v-if="detail">
      <h1>{{ detail.text }}</h1>
      <div>创建时间：{{ detail.time }}</div>
    </template>
    <div v-else class="empty">别看了这里啥也没有</div>
  </div>
</template>

<script lang="ts">
// <script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// export const detail = state.todoList.find(
//   (_item: { key: string | string[] }) => _item.key == item
// );

export default defineComponent({
  name: "About",
  data: () => ({}),
  setup() {
    const route = useRoute();
    const { state } = useStore();
    const { item } = route.params;
    return {
      detail: computed(() =>
        state.todoList.find(
          (_item: { key: string | string[] }) => _item.key == item
        )
      ),
    };
  },
});
</script>

<style lang="less">
@import url("../styles/var.less");
.about {
  text-align: center;
  h1 {
    color: @color-primary;
  }
}
</style>

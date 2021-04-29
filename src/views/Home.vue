<template>
  <div class="home">
    <h1 class="title">
      {{ $t(`route.dashboard`) }}
    </h1>
    <van-button type="primary" @click="changeLang">主要按钮</van-button>
    <div class="todo-list">
      <div class="input">
        <input
          class="input__inner"
          type="text"
          v-model="value"
          :placeholder="placeholder"
          @keydown.enter="handleAdd"
        />
      </div>
      <ul class="list">
        <template v-if="showList">
          <list-item
            v-for="(item, index) of list"
            :key="`li-${index}-${item.key}`"
            :item-id="item.key"
            @remove="removeItem(index)"
            @view="viewItem"
            >{{ item.text }}</list-item
          >
        </template>
        <div v-else class="empty">{{ emptyText }}</div>
      </ul>
    </div>
    <div>
      <img
        class="user-poster"
        src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
      />
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />
          待付款
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          待接单
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />
          待发货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />
          已发货
        </van-col>
      </van-row>

      <van-cell-group class="user-group">
        <van-cell icon="records" title="全部订单" is-link />
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="points" title="我的积分" is-link />
        <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
        <van-cell icon="gift-o" title="我收到的礼物" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { mapMutations, useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { setI18nLanguage } from "@/plugins/i18n";
import ListItem from "../components/list-item.vue";
import { getHash, formatDate } from "@/utils/utils";
import { Row, Col, Icon, Cell, CellGroup, Card } from "vant";

export default defineComponent({
  name: "Home",
  components: {
    ListItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data: () => ({
    value: "",
    placeholder: "请输入内容，以回车键确认",
    emptyText: "曾经笑容灿烂如今却空空如也",
  }),
  setup() {
    const router = useRouter();
    const store = useStore();
    const { locale } = useI18n();
    const { addTodoListItem, removeTodoListItem } = mapMutations([
      "addTodoListItem",
      "removeTodoListItem",
    ]);
    const viewItem = (id: string) => {
      router.push(`/about/${id}`);
    };
    return {
      list: computed(() => store.state.todoList),
      addItem: addTodoListItem,
      removeItem: removeTodoListItem,
      viewItem,
      locale,
    };
  },
  methods: {
    changeLang() {
      let _lang = this.locale === "zh-cn" ? "en" : "zh-cn";
      setI18nLanguage(_lang);
    },
    // 添加条目
    handleAdd() {
      if (!this.value) {
        return;
      }
      const item = {
        text: this.value,
        key: getHash(8),
        time: formatDate(new Date()),
      };
      this.addItem(item);
      this.value = "";
      console.log("listlistlist", this.list, this.$t);
    },
  },
  computed: {
    showList(): boolean {
      return !!(this.list && this.list.length);
    },
  },
});
</script>

<style lang="less">
@import url("../styles/var.less");
.home .title {
  color: @color-primary;
  margin: 64px 0 12px;
  font-family: monospace, system-ui, auto;
  font-size: 36px;
  text-align: center;
}
.todo-list {
  margin: 0 auto;
  width: 60%;
  min-width: 480px;
  max-width: 720px;
  text-align: center;
  box-shadow: 0 2px 12px 0 fade(@color-primary, 20%);

  ::-webkit-input-placeholder {
    color: @color-gray-100;
    font-size: 16px;
  }

  .input,
  .input__inner {
    width: 100%;
  }
  .input__inner {
    border: 2px solid mix(@color-primary, @color-gray-100);
    font-size: 22px;
    padding: 12px 20px;
    font-style: italic;
    box-sizing: border-box;
  }
  .list {
    margin: 0 0 12px;
    padding: 12px;
    border: 1px solid @color-border;

    .empty {
      padding: 20px 0;
      font-size: 14px;
      color: @color-gray-200;
      font-style: italic;
    }

    .item {
      list-style: none;
      text-align: left;
      position: relative;
      line-height: 20px;
      font-size: 18px;
      padding-right: 150px;

      &:not(:last-child) {
        padding-bottom: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid @color-border;
      }

      &-text {
        width: 100%;
        display: inline-block;
        padding-left: 28px;
        box-sizing: border-box;
      }
    }

    .item-actions {
      position: absolute;
      top: -2px;
      right: 0;
    }

    .checkbox {
      position: absolute;
      left: 0;
    }

    .button {
      padding: 4px 8px;
      font-size: 14px;
    }

    .checked {
      color: @color-gray-200;
      &::after {
        content: "";
        display: block;
        width: calc(100% - 20px);
        height: 1px;
        background-color: @color-gray-100;
        transform: translateY(-14px);
        margin-left: 20px;
        margin-top: -1px;
      }
    }
  }
}
</style>

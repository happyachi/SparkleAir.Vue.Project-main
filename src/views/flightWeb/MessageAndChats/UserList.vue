<template>
  <div class="user-list" :style="{ background: userListColor.userList.bg }">
    <table style="padding-top: 5px">
      <tbody>
        <tr
          v-for="user in participants"
          :key="user.id"
          @click="clickCustomer(user.id)"
        >
          <td style="text-align: center">
            <img :src="user.imageUrl" class="img-msg" />
          </td>
          <td
            class="user-element"
            :style="{ color: userListColor.userList.text }"
          >
            {{ user.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useChatStore } from "@/stores/MessageAndChatStore.js";

export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
    colors: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chatStore: useChatStore(),
    };
  },
  computed: {
    userListColor() {
      const defaultColors = {
        userList: {
          bg: "#FFFFFF",
          text: "#000000",
        },
      };
      return Object.assign(defaultColors, this.colors);
    },
  },
  methods: {
    clickCustomer(customerId) {
      let customer = this.participants.filter((x) => x.id == customerId)[0];
      this.chatStore.customerName = customer.name;
      this.chatStore.customerId = customerId;
      this.chatStore.getMeaasegByMemberId(customerId);
    },
  },
};
</script>

<style scoped>
.user-list {
  height: 100%;
  overflow: auto;
  padding-left: 5px;
  padding-top: 8px;
}
.img-msg {
  border-radius: 50%;
  width: 50px;
  margin-right: 5px;
}
.user-element {
  font-size: 20px;
  vertical-align: middle;
}
</style>

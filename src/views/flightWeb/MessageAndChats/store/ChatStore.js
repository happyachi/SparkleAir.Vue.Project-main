import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const customerName = ref("");
  const customerId = ref();
  const messageListRef = ref([]);

  const getMeaasegByMemberId = async (memberId) => {
    const response = await fetch(
      `http://localhost:8889/api/MessageAndChats/getMessageByMemberId?memberId=${memberId}`
    );

    const messageListJson = await response.json();
    messageListRef.value = [];
    messageListJson.forEach((element) => {
      messageListRef.value.push({
        type: "text",
        author: element.companyStaffId != null ? "me" : element.memberId,
        data: { text: `${element.messageContent}` },
      });
    });
    console.log(messageListRef.value);
  };

  return { customerName, customerId, messageListRef, getMeaasegByMemberId };
});

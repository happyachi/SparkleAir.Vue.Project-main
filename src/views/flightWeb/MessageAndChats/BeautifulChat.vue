<script>
import LauncherVue from "./Launcher.vue";
import { useChatStore } from "@/stores/MessageAndChatStore.js";
import { connection, start } from "@/utils/signalR";

export default {
  name: "app",
  components: { LauncherVue },
  data() {
    return {
      chatStore: useChatStore(),
      connectionId: "",
      participants: [
        // {
        //   id: "9",
        //   name: "Sparkle",
        //   imageUrl:
        //     "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4",
        // },
        // {
        //   id: "12",
        //   name: "Support",
        //   imageUrl:
        //     "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
        // },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [],
      // messageList: [
      //   { type: "text", author: `me`, data: { text: `Say yes!` } },
      //   { type: "text", author: `10`, data: { text: `No.` } },
      //   { type: "text", author: `10`, data: { text: `No.` } },
      //   { type: "text", author: `12`, data: { text: `No2.` } },
      //   { type: "text", author: `12`, data: { text: `No2.` } },
      // ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      // dark: {
      //   header: {
      //     bg: "#34495e",
      //     text: "#ecf0f1",
      //   },
      //   launcher: {
      //     bg: "#34495e",
      //   },
      //   messageList: {
      //     bg: "#2c3e50",
      //   },
      //   sentMessage: {
      //     bg: "#7f8c8d",
      //     text: "#ecf0f1",
      //   },
      //   receivedMessage: {
      //     bg: "#95a5a6",
      //     text: "#ecf0f1",
      //   },
      //   userInput: {
      //     bg: "#34495e",
      //     text: "#ecf0f1",
      //   },
      //   userList: {
      //     bg: "#2c3e50",
      //     text: "#ecf0f1",
      //   },
      // },
      colors: {
        header: {
          bg: "#365386",
          text: "#ffffff",
        },
        launcher: {
          bg: "#365386",
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#365386",
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867",
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  methods: {
    sendMessage(text) {
      console.log(6688);
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;

        // this.onMessageWasSent({
        //   author: "support",
        //   type: "text",
        //   data: { text },
        // });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      //this.messageList = [...this.messageList, message];
      console.log(message.data.text);
      fetch(`http://localhost:8889/api/MessageAndChats/createMessage`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
        },
        body: JSON.stringify({
          id: 0,
          messageBoxId: 0,
          sendTime: "2024-03-30T15:38:08.034Z",
          messageContent: message.data.text,
          memberId: this.chatStore.customerId,
          companyStaffId: 1,
          isReaded: true,
          readedTime: "2024-03-30T15:38:08.034Z",
          ConnectionId: "",
        }),
      });
      this.chatStore.getMeaasegByMemberId(this.chatStore.customerId);
    },

    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
      this.getMeaasegByMemberId(10); //先預設會員為10
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = true;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log("Emit typing event");
    },
    editMessage(message) {
      const m = this.messageList.find((m) => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    async getMeaasegByMemberId(memberId) {
      const response = await fetch(
        `http://localhost:8889/api/MessageAndChats/getMessageByMemberId?memberId=${memberId}`
      );

      const messageListJson = await response.json();
      this.chatStore.messageListRef = [];
      messageListJson.forEach((element) => {
        this.chatStore.messageListRef.push({
          type: "text",
          author: element.companyStaffId != null ? "me" : element.MemberId,
          data: { text: `${element.messageContent}` },
        });
      });
    },
    async getAllMembers() {
      console.log(123456);
      const response = await fetch(
        `http://localhost:8889/api/MessageAndChats/getAllMembers`
      );
      const membersListJson = await response.json();
      membersListJson.forEach((member) => {
        this.participants.push({
          id: member.memberId,
          name: member.memberName,
          imageUrl: "src/flightWeb/static/image/user.png",
        });
      });
      console.log(this.participants);
    },
    setEmployeeConnectionId(connectionId) {
      fetch(
        `http://localhost:8889/api/MessageAndChats/setEmployeeConnectionId?connectionId=${connectionId}`
      );
    },
  },
  mounted() {
    start();
    const widgetIcon = document.querySelector("#widgetIcon");
    // widgetIcon.classList.add('d-none');
    console.log(widgetIcon);
    this.getAllMembers();
    connection.on("SendConnectionId", (res) => {
      this.connectionId = res;
      this.setEmployeeConnectionId(this.connectionId);
      console.log(this.connectionId);
    });

    connection.on("SendMessageList", (res) => {
      if (res[0].MemberId == this.chatStore.customerId) {
        this.chatStore.messageListRef = [];
        res.forEach((element) => {
          this.chatStore.messageListRef.push({
            type: "text",
            author: element.CompanyStaffId != null ? "me" : element.MemberId,
            data: { text: `${element.MessageContent}` },
          });
        });
        console.log(this.chatStore.messageListRef);
      }
    });
  },
};
</script>
<template>
  <LauncherVue
    :always-scroll-to-bottom="alwaysScrollToBottom"
    :close="closeChat"
    :colors="colors"
    :is-open="isChatOpen"
    :message-list="chatStore.messageListRef"
    :message-styling="messageStyling"
    :new-messages-count="newMessagesCount"
    :on-message-was-sent="onMessageWasSent"
    :open="openChat"
    :participants="participants"
    :show-close-button="true"
    :show-launcher="true"
    :show-emoji="false"
    :show-file="false"
    :show-typing-indicator="showTypingIndicator"
    :show-edition="false"
    :show-deletion="false"
    :show-confirmation-deletion="true"
    :confirmation-deletion-message="'Are you sure? (you can customize this message)'"
    :title-image-url="titleImageUrl"
    :disable-user-list-toggle="true"
    :title="1"
    @onType="handleOnType"
    @edit="editMessage"
  ></LauncherVue>
</template>
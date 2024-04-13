<script>
import LauncherVue from "./Launcher.vue";
import { useChatStore } from "@/stores/MessageAndChatStore.js";
import { useMemberStore } from "@/stores/members";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { connection, start } from "@/utils/signalR";

export default {
  name: "app",
  components: { LauncherVue },
  data() {
    return {
      chatStore: useChatStore(),
      memberStore: useMemberStore(),
      memberData: getSessionTokenData("memberToken"),
      connectionId: "",
      participants: [
        {
          id: "0",
          name: "Sparkle",
          imageUrl: "/src/sparkle/SparkleLogoicon.png",
        },
        // {
        //   id: "12",
        //   name: "Support",
        //   imageUrl:
        //     "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
        // },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: "/src/sparkle/SparkleLogoicon.png",

      messageList: [],
      // messageList: [
      //   { type: "text", author: `me`, data: { text: `Say yes!` } },
      //   { type: "text", author: `10`, data: { text: `No.` } },
      //   { type: "text", author: `10`, data: { text: `No.` } },
      //   { type: "text", author: `12`, data: { text: `No2.` } },
      //   { type: "text", author: `12`, data: { text: `No2.` } },
      // ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff",
        },
        launcher: {
          bg: "#4e8cff",
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#4e8cff",
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
          memberId: this.memberData.MemberId,
          companyStaffId: 0,
          isReaded: true,
          readedTime: "2024-03-30T15:38:08.034Z",
          ConnectionId: this.connectionId,
        }),
      });

      // const data = JSON.stringify({
      //   MemberId: this.memberData.MemberId,
      //   Message: message.data.text,
      //   ConnectionId: this.connectionId,
      // });

      // connection.invoke("SendMessage", data).catch(function (err) {
      //   return console.error(err);
      // });
      // this.getMeaasegByMemberId(this.memberData.MemberId);
    },

    openChat() {
      // called when the user clicks on the fab button to open the chat
      (this.memberData = getSessionTokenData("memberToken")),
        console.log(this.memberData);
      this.isChatOpen = true;
      this.newMessagesCount = 0;
      this.getMeaasegByMemberId(this.memberData.MemberId); //先預設會員為10
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
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
      this.messageList = [];
      messageListJson.forEach((element) => {
        this.messageList.push({
          type: "text",
          author: element.companyStaffId == null ? "me" : "0",
          data: { text: `${element.messageContent}` },
        });
      });
    },
  },
  mounted() {
    start();
    connection.on("SendConnectionId", (res) => {
      this.connectionId = res;
      console.log(this.connectionId);
    });
    connection.on("SendMessageList", (res) => {
      this.messageList = [];
      res.forEach((element) => {
        console.log(element);
        this.messageList.push({
          type: "text",
          author: element.CompanyStaffId == null ? "me" : "0",
          data: { text: `${element.MessageContent}` },
        });
      });
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
    :message-list="messageList"
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
    :title="'Sparkle即時客服'"
    @onType="handleOnType"
    @edit="editMessage"
  ></LauncherVue>
</template>

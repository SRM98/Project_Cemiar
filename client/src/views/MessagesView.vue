<template>
  <div class="TextView">
    <h1>Hi {{ fullName }}</h1>
    <div v-if="messages.length > 0">
      <div id="messagesContainer" class='messages'>
        <MessageLayout v-for='(message, index) in messages' :key='index' :class='["message", { right: true }]'
          :text='message.text' :sender='message.sender' />
      </div>
    </div>
    <div v-else>
      <p>No messages available.</p>
    </div>
    <MessageInput @updateMessagesEvent="updateMessages" />
  </div>
</template>


<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import router from '@/router';
import Message from '@/models/Message';
import MessageInput from '@/components/MessageInput.vue';
import MessageLayout from '@/components/MessageLayout.vue';

@Options({
  components: {
    MessageInput,
    MessageLayout
  },
})

export default class MessagesView extends Vue {

  fullName = "";
  messages: Array<Message> = [];

  created() {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      this.fullName = JSON.parse(userData).name;
      this.fetchMessages();
    } else {
      router.push({ name: 'home' })
    }
  }

  updateMessages(messages: Array<Message>) {
    this.messages = messages
  }

  updated() {
    this.scrollDown();
  }

  scrollDown() {
    var objDiv = document.getElementById("messagesContainer");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  async fetchMessages() {
    try {
      const response = await fetch('http://localhost:3000/messages',);
      const data = await response.json();
      this.messages = data as Array<Message>;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Georama', sans-serif;
}

body {
  margin: 0;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messages {
  height: 550px;
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

.message+.message {
  margin-top: 1rem;
}

.message.right {
  margin-left: auto;
}
</style>
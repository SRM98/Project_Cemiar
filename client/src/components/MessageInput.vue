<template>
    <div class='chat-box'>
        <input v-model='message' placeholder='Write a message' type='text' />
        <button @click='sendMessage' :disabled='message === ""'>Send</button>
    </div>
</template>
  
<script lang="ts">
import { Vue } from 'vue-class-component';
export default class MessageInput extends Vue {

  message = ""

  async sendMessage() {
            try {
                if (this.message.trim() !== '') {
                    const response = await fetch('http://localhost:3000/message', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json;charset=UTF-8',
                        },
                        body: JSON.stringify({
                            "sender": JSON.parse(sessionStorage.getItem("userData")!).email, "text": this.message,
                        }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        const messages = data
                        this.$emit('updateMessagesEvent', messages);
                    } else {
                        return Promise.reject(new Error("Error"));
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
            this.message = '';
        }
}
</script>

<style scoped>
.chat-box {
  width: 100%;
  display: flex;
}

input {
  width: min(100%, 20rem);
  flex-grow: 1;
}

button:disabled {
  opacity: 0.5;
}
</style>
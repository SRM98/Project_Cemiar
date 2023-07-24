<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
import { decodeCredential } from 'vue3-google-login'
import router from '@/router';

const callback: CallbackTypes.CredentialCallback = (response) => {
  const userData = decodeCredential(response.credential)
  sessionStorage.setItem("userData", JSON.stringify(userData));
  router.push({name : 'messages'})
};
</script>


<script lang="ts">
export default {
  name: 'SignInButton',
}
</script>


<template>
  <GoogleLogin :callback="callback"/>
</template>
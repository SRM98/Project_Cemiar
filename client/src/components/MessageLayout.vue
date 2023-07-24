<script>
export default {
  name: 'MessageLayout',
  props: [
    'text',
    'sender', 
  ]
}
</script>

<template>
    <div
        :class='["message"]'
    >
      <h5>{{ sender }}</h5>
      {{ text }}
    </div>
  </template>

<style scoped>
.message {
  background: #e7e7e7;
  border-radius: 10px;
  padding: 1rem;
  width: fit-content;
}

h5 {
  margin: 0 0 .5rem 0;
}
</style>
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="js" setup>
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const letterModel = defineModel('letter')
</script>

<template>
  <div>
    <button v-for="letter in alphabet" :key="letter" @click="letterModel = letter">
      {{ letter }}
    </button>
  </div>
</template>

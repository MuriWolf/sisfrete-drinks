<script lang="js" setup>
// import { ref } from 'vue'
const searchText = defineModel('searchText')
</script>

<template>
  <input v-model="searchText" type="text" name="" id="" placeholder="Digite o nome do drink aqui" />
</template>

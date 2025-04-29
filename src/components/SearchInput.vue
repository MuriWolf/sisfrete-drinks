<script lang="js" setup>
// import { ref } from 'vue'
const searchText = defineModel('searchText')
</script>

<template>
  <input v-model="searchText" type="text" name="" id="" placeholder="Digite o nome do drink aqui" />
</template>

<style scoped lang="scss">
input {
  all: unset;
  color: var(--color-dark);
  min-width: none;
  width: 100%;
  max-width: 540px;
  background-color: var(--color-secondary);
  padding: 0.25rem;
  border-radius: 0.125rem;
}
</style>

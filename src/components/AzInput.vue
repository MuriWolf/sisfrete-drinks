<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="js" setup>
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const letterModel = defineModel('letter')
</script>

<template>
  <div class="layout-az-input">
    <button
      v-for="letter in alphabet"
      :key="letter"
      @click="letterModel = letter"
      v-bind:style="letter === letterModel ? 'filter: brightness(0.75)' : ''"
    >
      {{ letter.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.layout-az-input {
  display: flex;
  width: min-content;
  align-items: center;
  background-color: var(--color-secondary);
  border-radius: 0.125rem;

  button {
    border: none;
    background-color: var(--color-secondary);
    padding: 0.35rem;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      filter: brightness(1.5);
    }

    &:active {
      filter: brightness(0.75);
    }
  }
}
</style>

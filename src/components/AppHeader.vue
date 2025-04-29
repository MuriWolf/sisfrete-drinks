<script lang="js" setup></script>

<template>
  <header>
    <h1>Sisfrete Drinks</h1>
    <slot></slot>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: var(--color-primary);
  padding: 2rem;
  border-bottom: 0.25rem solid var(--color-secondary);

  h1 {
    font-family: 'DM Serif Display';
    text-align: center;
    font-size: 2.25rem;
  }
}
</style>

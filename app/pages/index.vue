<script setup lang="ts">
useHead({ title: 'scorpio-logs' });
</script>

<template>
  <main class="home">
    <h1>scorpio-logs</h1>
    <p>Raid log analyzer for ESO.</p>
  </main>
</template>

<style lang="scss" scoped>
.home {
  display: grid;
  gap: 0.75rem;
  place-content: center;
  flex: 1;
  padding: 1rem;
  text-align: center;

  p {
    color: var(--color-text-muted);
  }
}
</style>

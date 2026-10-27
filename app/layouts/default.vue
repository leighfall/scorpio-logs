<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
</style>

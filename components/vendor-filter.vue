<template>
  <div class="vendor-filter">
    <div class="vendor-filter__header">
      <div class="vendor-filter__title">
        Фильтр:
        <span @click="$emit('update:filter', 'byAlphabet')" class="vendor-filter__name">По альбомам</span>
        <span @click="$emit('update:filter', 'favorites')" class="vendor-filter__name">Избранное</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      default: 'byAlphabet'
    }
  }
}
</script>

<style scoped lang="scss">
  .vendor-filter {
    &__header {
      margin: 0 0 1.5rem;
    }

    &__title {
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 1.9rem;
    }

    &__name {
      margin: 0 0.5rem;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>

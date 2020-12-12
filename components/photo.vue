<template>
  <div class="photos__col">
    <div class="photos__icons">
      <a @click.prevent="$emit('removePhotoFromFav', photo)" href="#" class="photos__icon">
        <i class="fas fa-times"></i>
      </a>
      <a @click.prevent="$emit('addPhotoToFav', photo)" href="#" class="photos__icon">
        <i class="fas fa-heart"></i>
      </a>
    </div>
    <img class="photos__pic" :src="photo.url" :alt="photo.title" />
  </div>
</template>

<script>
export default {
  props: {
    photo: Object
  }
}
</script>

<style lang="scss" scoped>
</style>
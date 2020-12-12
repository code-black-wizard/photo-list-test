<template>
  <div class="photo">
    <img class="photo__pic" :src="photo.thumbnailUrl" :alt="photo.title" />
    <div class="photo__inner">
      <h3 class="photo__title">{{ photo.title }}</h3>
      <div class="photo__icons">
        <a @click.prevent="$emit('removePhotoFromFav', photo)" href="#" class="photo__action">
          <i class="fas fa-times"></i>
        </a>
        <a @click.prevent="$emit('addPhotoToFav', photo)" href="#" class="photo__action">
          <i class="fas fa-heart"></i>
        </a>
      </div>
    </div>
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

  .photo {
    display: flex;
    align-items: center;
    background: #F7F8F9;
    border-radius: 10px;
    padding: 5px;

    &__pic {
      max-width: 100%;
      margin-right: 10px;
    }

    &__title {
      color: #1C214C;
      text-transform: capitalize;
    }

    &__action {
      color: #1B204F;
      font-size: 18px;
    }
  }

</style>
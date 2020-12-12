<template>
  <div class="wrap">
    <div class="wrap__popup">
      <div class="wrap__popup-content">
        <VendorFilter :filter.sync="filter" />
        <div class="wrap__popup-inner" v-if="loading">
          <template v-if="filter === 'byAlphabet'">
            <!-- формирую строки с данными в алфавитном порядке  -->
            <div :data-key="key" class="wrap__row" v-for="(photos, key) in getPhotos" :key="key">
              <h2 class="wrap__caption">{{key}}</h2>
              <Photo @removePhotoFromFav="removePhotoFromFav" @addPhotoToFav="addPhotoToFav" v-for="photo in photos" :key="photo.id" :photo="photo" />
            </div>
          </template>
          <template v-else>
            <div class="wrap__col" v-for="photo in favorites" :key="photo.id">
              <Photo @removePhotoFromFav="removePhotoFromFav" @addPhotoToFav="addPhotoToFav" :photo="photo" />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="wrap__bg"></div>
  </div>
</template>

<script>
import VendorFilter from '@/components/vendor-filter'
import Photo from '@/components/Photo'

export default {
  components: { VendorFilter, Photo },

  data() {
    return {
      // создаю коллекцию данных в алфавитном порядке
      photos: {
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: []
      },
      // массив избранных
      favorites: [],
      filter: 'byAlphabet',
      loading: false,
      error: null
    }
  },

  computed: {
    getPhotos() {
      // фильтрую обьект от пустых полей
      return Object.fromEntries(Object.entries(this.photos).filter(photo => photo[1].length))
    }
  },

  watch: {
    filter() {
      localStorage.setItem('filter', this.filter)
    },
    favorites: {
      handler() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      },
      deep: true
    }
  },

  methods: {
    async fetchData() {
      this.loading = false
      try {
        const data = await this.$axios.$get('http://jsonplaceholder.typicode.com/photos', {
          params: {
            _limit: 32
          }
        })
        this.loading = true

        // добавляю данные в алфавитном порядке
        for (let key in this.photos) {
          data.forEach(item => {
            if (key === item.title[0]) {
              this.photos[key].push(item)
            }
          })
        }
      } catch (err) {
        console.log(err)
        this.error = err
      }
    },
    addPhotoToFav(photo) {
      // если в массиве избранных фотографий нету фото с переданным id - добавляю 
      if (!this.favorites.some(fav => fav.id === photo.id)) {
        this.favorites.push(photo)
      }
    },
    removePhotoFromFav(photo) {
      // если в массиве избранных фотографий есть фото с переданным id - удаляю 
      if (this.favorites.some(fav => fav.id === photo.id)) {
        this.favorites.splice(this.favorites.indexOf(photo), 1)
      }
    }
  },

  created() {
    this.fetchData()
    if (localStorage.getItem('filter')) {
      this.filter = localStorage.getItem('filter')
    }
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'))
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    position: relative;
    height: 100vh;
    display: flex;

    &__popup {
      font-weight: 700;
      font-family: Open Sans, Roboto, sans-serif;
      width: 1300px;
      height: 600px;
      margin: auto;
      padding: 3.6rem 4.8rem 6rem;
      font-size: 1.2rem;
      background: #ffffff;
      border-radius: 1.2rem;
      box-sizing: border-box;
      &-inner {
        display: flex;
        flex-wrap: wrap;
      }
      &-content {
        overflow-y: auto;
        height: 100%;
      }
    }

    &__bg {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      background: rgba(27, 32, 79, 0.2);
    }

    &__row {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      margin-bottom: 15px;
      flex-basis: 22%;
    }

    &__col {
      flex-basis: 22%;
      padding: 0 15px;
      margin-bottom: 15px;
    }

    &__caption {
      color: #1B204F;
      text-transform: uppercase;
    }
  }
</style>

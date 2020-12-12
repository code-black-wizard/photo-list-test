<template>
  <div class="photos">
    <select v-model="filter" class="photos__filters">
      <option value="byAlphabet">By Alphabet</option>
      <option value="favorites">Favorites</option>
    </select>
    <template v-if="loading">
      <template v-if="filter === 'byAlphabet'">
        <!-- формирую строки с данными в алфавитном порядке  -->
        <div :data-key="key" class="photos__row" v-for="(photos, key) in getPhotos" :key="key">
          <h2 class="photos__caption">{{key}}</h2>
          <Photo @removePhotoFromFav="removePhotoFromFav" @addPhotoToFav="addPhotoToFav" v-for="photo in photos" :key="photo.id" :photo="photo" />
        </div>
      </template>
      <template v-else>
        <div class="photos__row">
          <Photo @removePhotoFromFav="removePhotoFromFav" @addPhotoToFav="addPhotoToFav" v-for="photo in favorites" :key="photo.id" :photo="photo" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Photo from '@/components/Photo'

export default {
  components: { Photo },
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
            _limit: 20
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
      this.favorites.splice(this.favorites.indexOf(photo), 1)
    }
  },
  computed: {
    getPhotos() {
      // фильтрую обьект от пустых полей
      return Object.fromEntries(Object.entries(this.photos).filter(photo => photo[1].length))
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

<style lang="scss">

  .photos {
    margin-top: 75px;
    &__filters {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
    }
    &__row {
      display: flex;
      margin-bottom: 15px;
    }
    &__col {
      padding: 0 15px;
      flex-basis: 25%;
      position: relative;
    }
    &__pic {
      max-width: 100%;
    }
    &__icons {
      display: flex;
      position: absolute;
      top: 10px;
      right: 25px;
      min-width: 40px;
      justify-content: space-between;
    }
    &__icon {
      font-size: 20px;
    }
  }

</style>

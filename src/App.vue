<template>
  <!-- navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid justify-content-center">
      <h3 class="navbar-brand text-white">Bookshelf Apps</h3>
    </div>
  </nav>
  <!-- end navbar -->
  <!-- form -->
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-8 offset-2">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Masukkan Buku Baru</h3>
            <form>
              <div class="mb-3">
                <label for="judul" class="form-label">Judul</label>
                <input type="text" class="form-control" id="judul" v-model="judul">
              </div>
              <div class="mb-3">
                <label for="penulis" class="form-label">Penulis</label>
                <input type="text" class="form-control" id="penulis" v-model="penulis">
              </div>
              <div class="mb-3">
                <label for="tahun" class="form-label">Tahun</label>
                <input type="number" class="form-control" id="tahun" v-model="tahun">
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="isDone" v-model="isDone">
                <label class="form-check-label" for="isDone">Selesai dibaca</label>
              </div>
              <button type="button" class="btn btn-primary" @click="add">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end form -->
  <list :books="books" @emitDone="done" @emitDestroy="destroy"/>
</template>

<script>
import List from './components/List.vue'

export default {
    components: { List },
    data() {
        return {
            judul: "",
            penulis: "",
            tahun: "",
            isDone: false,
            books: []
        };
    },
    mounted() {
      const items = localStorage.getItem('BOOKSHELF_APPS')
      this.books = items ? JSON.parse(items) : []
    },
    methods: {
        add() {
            this.books.unshift({
                judul: this.judul,
                penulis: this.penulis,
                tahun: this.tahun,
                isDone: this.isDone,
            });
            this.judul = "";
            this.penulis = "";
            this.tahun = "";
            this.isDone = false;
            console.log(this.books);
            this.saveToLocalStorage()

        },
        done(bookIndex) {
          this.books = this.books.filter((item, index) => {
            if (index == bookIndex) {
              item.isDone = !item.isDone
            }

            return item
          })
          this.saveToLocalStorage()

        },
        destroy(bookIndex) {
          this.books = this.books.filter((item, index) => {
            if (index != bookIndex) {
              return item
            }
          })
          this.saveToLocalStorage()
        },
        saveToLocalStorage() {
          localStorage.setItem('BOOKSHELF_APPS', JSON.stringify(this.books))
        }
    },
}
</script>
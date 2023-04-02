<template>
  <!-- list belum dibaca -->
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-8 offset-2">
        <div class="card">
          <div class="card-body">
            <h3>Belum selesai dibaca</h3>
            <!-- list -->
            <template v-for="(book, index) in books" :key="index">
              <div class="card mt-3" v-if="!book.isDone">
                <div class="card-body">
                  <h5 class="card-title">{{ book.judul }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{{ book.tahun }}</h6>
                  <p class="card-text mb-2">{{ book.penulis }}</p>
                  <button href="#" class="btn btn-success" @click="emitDone(index)">Selesai baca</button>
                  <button href="#" class="btn btn-danger mx-2" @click="emitDestroy(index)">Hapus buku</button>
                </div>
              </div>
            </template>
            <!-- end list -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  end list belum dibaca -->
  <!-- list sudah dibaca -->
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-8 offset-2">
        <div class="card">
          <div class="card-body">
            <h3>Selesai dibaca</h3>
            <!-- list -->
            <template v-for="(book, index) in books" :key="index">
                <div class="card mt-3" v-if="book.isDone">
                  <div class="card-body">
                    <h5 class="card-title">{{ book.judul }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ book.tahun }}</h6>
                    <p class="card-text mb-2">{{ book.penulis }}</p>
                    <button href="#" class="btn btn-success" @click="emitDone(index)">Belum Selesai baca</button>
                    <button href="#" class="btn btn-danger mx-2" @click="emitDestroy(index)">Hapus buku</button>
                  </div>
                </div>
              </template>
            <!-- end list -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  end list sudah dibaca -->
</template>

<script>
export default {
    props: {
        books: {
            type: Array
        }
    },
    emits: ["emitDone", "emitDestroy"],
    setup(props, {emit}) {
      const emitDone = (index) => {
        emit('emitDone', index)
      }

      const emitDestroy = (index) => {
        emit('emitDestroy', index)
      }

      return {emitDone, emitDestroy}
    }

}
</script>
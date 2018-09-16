Vue.component('etalase-item', {
  template:
  `
  <div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-sm-6 item" v-for="item in items">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="https://via.placeholder.com/328x219" alt="placeholder"></a>
              <div class="card-body">
                <h5 class="card-title">
                  <a class="text-dark font-weight-bold" href="#">
                    {{ item.name }}
                  </a>
                </h5>
                <p class="card-text text-muted">Rp {{ item.price }}</p>
                <p class="card-text">{{ item.description }}</p>
              </div>
              <a href="#" class="btn btn-primary btn-sm" v-on:click="addToCart(item)">Add to Cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: [ 'selectedcategory', 'allitems', 'searchresults' ],
  data() {
    return {
      items: [],
      allItems: []
    }
  },
  methods: {
    addToCart: function (item) {
      this.$emit('add-cart', item)
    },
  },
  created() {
    let self = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/categories',
    })
      .then(categories => {
        for (let i = 0; i < categories.data.data.length; i++) {
          for (let j = 0; j < categories.data.data[i].items.length; j++) {
            self.items.push(categories.data.data[i].items[j])
            self.allItems.push(categories.data.data[i].items[j])
          }
        }
        self.$emit('items-for-search', self.allItems)
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    selectedcategory: function(newCat, oldCat) {
      if (newCat === '') {
        this.items = this.allItems
      } else {
        this.items = []
        newCat.items.forEach(item => {
          this.items.push(item)
        })
      }
    },
    allitems: function(newVal, oldVal) {
      this.items = this.allItems
      this.$emit('clear-category')
    },
    searchresults: function(newVal, oldVal) {
      this.items = newVal
    }
  }
})
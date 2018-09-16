const searchbar = {
  template:
  `
  <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" id="navBarSearchForm" type="text" placeholder="Search product..."
      aria-label="Search" v-model="searchQuery">
    <button class="btn btn-outline-light my-2 my-sm-0" type="button" v-on:click="search(searchQuery)">Search</button>
  </form>
  `,
  props: [ 'itemsforsearch' ],
  data() {
    return {
      searchQuery: '',
      allItems: []
    }
  },
  methods: {
    search: function(query){
      let arr = []
      let filter = new RegExp(`${query}`, 'i');
      for (let i = 0; i < this.allItems.length; i++) {
        if (filter.test(this.allItems[i].name)) {
          arr.push(this.allItems[i])
        }
      }
      this.$emit('search-result', arr)
    }
  },
  watch: {
    itemsforsearch: function(newVal, oldVal) {
      this.allItems = this.itemsforsearch
    }
  }
}
const category = {
  template:
  `
  <ul class="navbar-nav mr-auto">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownName" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        Category
      </a>
      <div class="dropdown-menu dropdown-menu-left">
        <a class="nav-link text-dark" href="#" v-on:click="allCategory">All Categories</a>
        <a class="nav-link text-dark" href="#" v-for="category in categories" v-on:click="filterCategory(category)">{{
          category.name }}</a>
      </div>
    </li>
  </ul>
  `,
  data() {
    return {
      categories: []
    }
  },
  methods : {
    filterCategory: function (category) {
      this.$emit('filter-category', category)
    },
    allCategory: function () {
      this.items = []
      this.items = this.allItems
      this.selectedCategory = ''
      this.$emit('all-items')
    }
  },
  created() {
    let self = this;

    axios({
      method: 'get',
      url: 'http://localhost:3000/categories',
    })
      .then(categories => {
        for (let i = 0; i < categories.data.data.length; i++) {
          self.categories.push(categories.data.data[i])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
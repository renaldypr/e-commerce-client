const app = new Vue({
  el: '#app',
  data: {
    selectedCategory: '',
    allItems: false,
    parentCart: [],
    itemsForSearching: [],
    searchResults: []
  },
  methods: {
    filterCategory: function(category) {
      this.selectedCategory = category
    },
    selectAllItems: function() {
      if (this.allItems === true) {
        this.allItems = false
      } else {
        this.allItems = true
      }
    },
    clearCategory: function() {
      this.selectedCategory = ''
    },
    addToCart: function(item) {
      let inCart = false
      for (var i = 0; i < this.parentCart.length; i++) {
        if (this.parentCart[i]._id === item._id) {
          inCart = true
          var tempItem = this.parentCart[i]
          break;
        }
      }

      if (!inCart) {
        item.quantity = 1
        this.parentCart.push(item)
      } else {
        this.parentCart.splice(i, 1)
        tempItem.quantity += 1
        this.parentCart.push(tempItem)
      }
    },
    deleteItem: function(itemId) {
      var index = this.parentCart.findIndex(e => e._id === itemId);
      this.parentCart.splice(index, 1)
    },
    emptyCart: function() {
      this.parentCart = []
    },
    itemsForSearch: function(items) {
      this.itemsForSearching = items
    },
    goSearch: function(items) {
      this.searchResults = items
    }
  }
})
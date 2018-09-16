const profile = {
  template:
  `
  <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ activeUser() }}'s Transactions</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Items</th>
                <th scope="col">Total Spending</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in myTransactions">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ convertDate(transaction.transactionDate) }}</td>
                <td>
                  <ul>
                    <li v-for="item in transaction.items">
                      {{ item.name }} - Rp {{ item.price }}
                    </li>
                  </ul>
                </td>
                <td style="color: red"><b>Rp {{ transaction.totalPrice }}</b></td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
  `,
  props: [ 'newtransaction' ],
  data() {
    return {
      activeUser : function() {
        return localStorage.getItem('user')
      },
      myTransactions: []
    }
  },
  methods: {
    getToken: function() {
      return localStorage.getItem('token')
    },
    convertDate: function(date) {
      let newFormat = String(new Date(date)).split(' ').slice(0,4).join('-')
      return newFormat
    },
    convertItem: function(items) {
      let result = []
      items.forEach(item => {
        result.push()
      })
    }
  },
  created() {
    let self = this;
    axios({
      method: 'get',
      url: 'http://localhost:3000/transactions',
      headers: {
        token: self.getToken()
      }
    })
      .then(transactions => {
        for (let i = 0; i < transactions.data.data.length; i++) {
          if (transactions.data.data[i].user.email === localStorage.getItem('email')) {            
            self.myTransactions.push(transactions.data.data[i])
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    newtransaction: function() {
      this.myTransactions = []
      let self = this;
        axios({
          method: 'get',
          url: 'http://localhost:3000/transactions',
          headers: {
            token: self.getToken()
          }
        })
          .then(transactions => {
            for (let i = 0; i < transactions.data.data.length; i++) {
              if (transactions.data.data[i].user.email === localStorage.getItem('email')) {             
                self.myTransactions.push(transactions.data.data[i])
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
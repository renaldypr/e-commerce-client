const login = {
  template: 
  `
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert" v-if="errorMsg">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ errorMsg }}</div>
            <div class="alert alert-success" role="alert" v-if="successMsg">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ successMsg }}</div>
            <div class="form-group">
              <input id="email" type="email" class="form-control" placeholder="Email" required="required" v-model="emailLogin">
            </div>
            <div class="form-group">
              <input id="password" type="password" class="form-control" placeholder="Password" required="required" v-model="passwordLogin">
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-primary btn-block" v-on:click="login()">Log in</button>
            </div>
            <p class="text-center">or login via </p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      emailLogin: '',
      passwordLogin: '',
      errorMsg: '',
      successMsg: ''
    }
  },
  methods: {
    login: function() {
      if(this.emailLogin === '' || this.passwordLogin === '') {
        this.errorMsg = 'please insert your email & password!'
      } else {
        let self = this;
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            email: this.emailLogin,
            password: this.passwordLogin
          }
        })
          .then(data => {
            self.emailLogin = ''
            self.passwordLogin = ''
            self.successMsg = 'Login success!'
  
            localStorage.setItem('email', data.data.email)
            localStorage.setItem('user', data.data.user)
            localStorage.setItem('token', data.data.token)
  
            self.$emit('is-login', true)
  
            //window.location.reload()
          })
          .catch(err => {
            this.errorMsg = 'Invalid email or password!'
          })
      }

    }
  }
}
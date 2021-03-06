<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <AuthLogoComponent />
       
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          sign in you account
        </a>
      </p>
    </div>
    <div>
      
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="register" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="name" class="sr-only">Your Name</label>
          <input v-model="name" id="name" name="name" type="name" autocomplete="name" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your first and last name">
        </div>
        <div>
          <label for="username" class="sr-only">Username</label>
          <input v-model="username" id="username" name="username" type="username" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Choose a Username">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>
      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Register
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import authController from "../controllers/AuthController";
import AuthLogoComponent from "../components/Global/AuthLogoComponent";

export default {
  name: 'RegisterViewComponent',
  components: {
    AuthLogoComponent
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      name: '',
      username: '',
      password: '',
      errors: [],
      instanceToast: {}
    }
  },
  methods: {
    register(){
      this.$Progress.start();
      var self = this;
      authController.register(
        {
          name: this.name,
          username: this.username,
          password: this.password,
        },
        (response) => {
          if(response.status === "OK"){
            this.instanceToast = this.$toast.open(response.message);
            this.$router.push({name: "LoginView"});
            this.$Progress.finish();
          } else {
            // error
            let errormessage;
            try{
              errormessage = response.payload.message;
            } catch(e){
              errormessage = response.message;                
            }
            self.instanceToast = this.$toast.open({
              type: "error",
              message: errormessage
              }
            );
            self.$Progress.fail();
          }
        }
      );
    }
  }
}
</script>

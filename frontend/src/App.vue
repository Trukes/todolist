<template>
  <div id="app">
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
    <div v-if="$route.fullPath !== '/login' && $route.fullPath !== '/register'">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <!-- Mobile menu button-->
              <button
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <!-- Icon when menu is closed. -->
                <!--
                  Heroicon name: outline/menu

                  Menu open: "hidden", Menu closed: "block"
                -->
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <!-- Icon when menu is open. -->
                <!--
                  Heroicon name: outline/x

                  Menu open: "block", Menu closed: "hidden"
                -->
                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
            >
              <div class="flex-shrink-0 flex items-center">
                <h1 class="font-extrabold text-white">To Do List</h1>

                <!-- <img
                  class="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  class="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                /> -->
              </div>
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                  <router-link
                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    to="/"
                    >Dashboard</router-link
                  >
                </div>
              </div>
            </div>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >

              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button
                    class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                    @click="toggle"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="avatarUser"
                      alt=""
                    />
                  </button>
                </div>
                <!--
                  Profile dropdown panel, show/hide based on dropdown state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
                <div
                  :class="`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition ease-${
                    dropdown ? 'out' : 'in'
                  } duration-${dropdown ? '100' : '75'} transform opacity-${
                    dropdown ? '100' : '0'
                  } scale-${dropdown ? '100' : '95'} ${
                    !dropdown ? 'hidden' : ''
                  }`"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <!-- <div :class="`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition ease-${dropdown ? 'out' : 'in'} duration-${dropdown ? '100' : '75'} transform opacity-${dropdown ? '100' : '0'} scale-${dropdown ? '100' : '95'}`" > -->
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    @click="logout"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="sm:hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              to="/"
              >Dashboard</router-link
            >
          </div>
        </div>
      </nav>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import authController from "./controllers/AuthController";
import * as avatarholder from 'avatarholder';

export default {
  name: "App",
  components: {},
  data: function () {
    return {
      dropdown: false,
    };
  },
  computed: {
    avatarUser: function() {
      return avatarholder.generateAvatar(authController.getUserFullName());
    },
  },
  methods: {
    toggle: function () {
      this.dropdown = !this.dropdown;
    },
    logout: function () {
      var self = this;
      authController.logout(function () {
        self.$router.push({ name: "LoginView" });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<!-- <template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script> -->


<template>
  <div id="app">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <!-- <img src="@/assets/blibli_logo.jpeg" alt="Blibli Logo" /> -->
           
            <img src="@/assets/blibli.webp" alt="Blibli Logo" />

        </div>
        <div class="navbar-actions">
          <router-link to="/seller/faq">
            <button class="faq-button">FAQ</button>
          </router-link>
          <button @click="handleLoginLogout" class="auth-button">{{ buttonLabel }}</button>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import './assets/style.css';

export default {
  computed: {
    buttonLabel() {
      return this.$route.path === '/' ? 'Login' : 'Logout';
    },
  },
  methods: {
    handleLoginLogout() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      } else {
        this.$router.push('/home'); 
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.faq-button,
.auth-button {
  display: inline-block;
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer;
  font-size: 16px; 
  text-align: center;
  box-sizing: border-box;

  background-color: #155fc0;
  color: white;
  border: none;
}


.faq-button:hover {
  background-color: #203cdc;
}


.auth-button:hover {
  background-color: #0056b3;
}

.navbar-actions {
  display: flex;
  align-items: center; 
  gap: 10px; 
}
</style>





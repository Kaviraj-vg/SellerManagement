<template>
    <div class="seller-id-form-view">
      <!-- <h2>Enter Seller ID</h2> -->
      <form @submit.prevent="goToViewProducts">
        <!-- <input v-model="sellerId" placeholder="Seller ID" type="number" required /> -->
        <button type="submit">View Products</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sellerId: localStorage.getItem('sellerId'),
      };
    },
    methods: {
      goToViewProducts() {
        if (this.sellerId) {
          this.$router.push({
            name: 'ViewProducts',
            params: { sellerId: this.sellerId },
          });
        } else {
          alert('Please enter a valid Seller ID.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .seller-id-form-view {
    padding: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #2874f0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1c5bb8;
  }
  </style>
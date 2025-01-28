<template>
    <div class="delete-product-form">
      <h2>Delete Product</h2>
      <form @submit.prevent="goToConfirmDelete">
        <!-- <input v-model="sellerId" placeholder="Seller ID" type="number" required /> -->
        <input v-model="productId" placeholder="Product ID" type="number" required />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sellerId: localStorage.getItem('sellerId'),
        productId: '',
      };
    },
    methods: {
      goToConfirmDelete() {
        if (this.sellerId && this.productId) {
          this.$router.push({
            name: 'ConfirmDelete',
            params: { sellerId: this.sellerId, productId: this.productId },
          });
        } else {
          alert('Please enter both Seller ID and Product ID.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .delete-product-form {
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
    background-color: #ff4444; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #cc0000; 
  }
  </style>
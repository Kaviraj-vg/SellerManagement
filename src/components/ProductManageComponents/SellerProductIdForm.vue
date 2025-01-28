<template>
    <div class="seller-product-id-form">
      <!-- <h2>Enter Seller ID and Product ID</h2> -->
      <form @submit.prevent="goToUpdatePage">
        <!-- <input v-model="sellerId" placeholder="Seller ID" type="number" required /> -->
        <input v-model="productId" placeholder="Product ID" type="number" required />
        <button type="submit">Update Product</button>
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
      goToUpdatePage() {
        if (this.sellerId && this.productId) {
          this.$router.push({
            name: 'UpdateProduct',
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
  .seller-product-id-form {
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
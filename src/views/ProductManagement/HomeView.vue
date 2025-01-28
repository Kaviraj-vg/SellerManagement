<template>
    <div class="home">
      <h1>Product Management</h1>
      <div class="button-container">
        <button @click="navigateTo('AddProduct')">Add Product</button>
        <button @click="navigateTo('SellerProductIdForm')">Update Product</button>
        <button @click="navigateTo('SellerIdFormView')">View Products</button>
        <button @click="navigateTo('DeleteProductForm')">Delete Product</button>
        <button @click="navigateTo('LowStockForm')">Low Stock Products</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route }); // Navigate to the respective route
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Full viewport height */
    background-color: #f5f5f5; 
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 30px;
    color: #2874f0; 
    font-size: 2.5rem;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Space between buttons */
    width: 300px; /* Fixed width for buttons */
  }
  
  button {
    padding: 15px 20px;
    background-color: #2874f0; /* Primary color */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #1c5bb8; /* Darker shade on hover */
  }
  </style>
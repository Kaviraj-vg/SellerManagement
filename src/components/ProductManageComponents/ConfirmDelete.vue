<template>
    <div class="confirm-delete">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this product?</p>
      <button @click="deleteProduct">Yes, Delete</button>
      <button @click="cancelDelete">Cancel</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['sellerId', 'productId'], 
    data() {
      return {
        message: '',
      };
    },
    methods: {
      async deleteProduct() {
        try {
          const response = await axios.delete(
            `http://localhost:8080/api/products/${this.sellerId}/${this.productId}`
          );
          if (response.status === 200 || response.status === 204) {
            this.message = 'Product deleted successfully!';
            setTimeout(() => {
              this.$router.push({ name: 'Home' }); 
            }, 2000);
          } else {
            this.message = 'Failed to delete product. Please try again.';
          }
        } catch (error) {
          this.message = 'Failed to delete product. Please try again.';
          console.error(error);
        }
      },
      cancelDelete() {
        this.$router.push({ name: 'Home' }); 
      },
    },
  };
  </script>
  
  <style scoped>
  .confirm-delete {
    padding: 20px;
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:first-of-type {
    background-color: #ff4444; 
    color: white;
  }
  
  button:first-of-type:hover {
    background-color: #cc0000; 
  }
  
  button:last-of-type {
    background-color: #2874f0; 
    color: white;
  }
  
  button:last-of-type:hover {
    background-color: #1c5bb8; 
  }
  
  p {
    margin-top: 20px;
    color: green;
  }
  </style>
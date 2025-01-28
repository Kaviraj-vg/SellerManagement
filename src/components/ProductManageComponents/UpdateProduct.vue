<template>
    <div class="update-product">
      <h2>Update Product</h2>
      <form @submit.prevent="submitUpdate">
        <input v-model="product.name" placeholder="Name" required />
        <input v-model="product.description" placeholder="Description" required />
        <input v-model="product.color" placeholder="Color" required />
        <input v-model="product.size" placeholder="Size" required />
        <input v-model="product.price" placeholder="Price" type="number" required />
        <input v-model="product.discount" placeholder="Discount" type="number" required />
        <input v-model="product.stockQuantity" placeholder="Stock Quantity" type="number" required />
        <button type="submit">Submit Update</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['sellerId', 'productId'], // Receive sellerId and productId from route params
    data() {
      return {
        product: {
          name: '',
          description: '',
          color: '',
          size: '',
          price: 0,
          discount: 0,
          stockQuantity: 0,
        },
        message: '',
      };
    },
    created() {
      this.fetchProductDetails(); 
    },
    methods: {
      async fetchProductDetails() {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/products/${this.sellerId}/${this.productId}`
          );
          if (response.status === 200) {
            this.product = response.data; 
          } else {
            this.message = 'Failed to fetch product details. Please try again.';
          }
        } catch (error) {
          this.message = 'Failed to fetch product details. Please try again.';
          console.error(error);
        }
      },
  
      async submitUpdate() {
        try {
          const response = await axios.put(
            `http://localhost:8080/api/products/${this.sellerId}/${this.productId}`,
            this.product
          );
          if (response.status === 200) {
            this.message = 'Product updated successfully!';
          } else {
            this.message = 'Failed to update product. Please try again.';
          }
        } catch (error) {
          this.message = 'Failed to update product. Please try again.';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .update-product {
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
  
  p {
    margin-top: 20px;
    color: green;
  }
  </style>
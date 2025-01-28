<template>
    <div class="low-stock-products">
      <h2>Low Stock Products for Seller ID: {{ sellerId }}</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ul v-if="products.length > 0">
          <li v-for="product in products" :key="product.productId" class="product-item">
            <p><strong>Name:</strong> {{ product.name }}</p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>Color:</strong> {{ product.color }}</p>
            <p><strong>Size:</strong> {{ product.size }}</p>
            <p><strong>Price:</strong> {{ product.price }}</p>
            <p><strong>Discount:</strong> {{ product.discount }}</p>
            <p><strong>Stock Quantity:</strong> {{ product.stockQuantity }}</p>
          </li>
        </ul>
        <p v-else>No low-stock products found for this seller.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['sellerId'], 
    data() {
      return {
        products: [],
        loading: true,
      };
    },
    created() {
      this.fetchLowStockProducts(); 
    },
    methods: {
      async fetchLowStockProducts() {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/products/${this.sellerId}/low-stock`
          );
          if (response.status === 200) {
            this.products = response.data; 
          } else {
            console.error('Failed to fetch low-stock products.');
          }
        } catch (error) {
          console.error('Error fetching low-stock products:', error);
        } finally {
          this.loading = false; 
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .low-stock-products {
    padding: 20px;
  }
  
  .product-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  p {
    margin: 5px 0;
  }
  </style>
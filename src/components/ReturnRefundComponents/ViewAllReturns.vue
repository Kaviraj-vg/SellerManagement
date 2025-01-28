<template>
    <div class="view-all-returns">
      <h2>All Return Details</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ul v-if="returns.length > 0">
          <li v-for="returnRequest in returns" :key="returnRequest.id" class="return-item">
            <p><strong>Return ID:</strong> {{ returnRequest.id }}</p>
            <p><strong>Order ID:</strong> {{ returnRequest.orderId }}</p>
            <p><strong>Seller ID:</strong> {{ returnRequest.sellerId }}</p>
            <p><strong>Product ID:</strong> {{ returnRequest.productId }}</p>
            <p><strong>Customer ID:</strong> {{ returnRequest.customerId }}</p>
            <p><strong>Reason:</strong> {{ returnRequest.reason }}</p>
            <p><strong>Status:</strong> {{ returnRequest.status }}</p>
          </li>
        </ul>
        <p v-else>No return requests found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        returns: [], 
        loading: true, 
      };
    },
    created() {
      this.fetchAllReturns(); 
    },
    methods: {
      async fetchAllReturns() {
        try {
          const response = await axios.get('http://localhost:8082/api/returns');
          if (response.status === 200) {
            this.returns = response.data; 
          } else {
            console.error('Failed to fetch return requests.');
          }
        } catch (error) {
          console.error('Error fetching return requests:', error);
        } finally {
          this.loading = false; 
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .view-all-returns {
    padding: 20px;
    text-align: center;
  }
  
  .return-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  p {
    margin: 5px 0;
  }
  </style>
<template>
    <div class="view-returns">
      <h2>View Return Requests by Seller ID</h2>
  
      <form @submit.prevent="fetchReturnRequests">
        <input v-model="sellerId" placeholder="Enter Seller ID" required />
        <button type="submit">Submit</button>
      </form>
  
      <table v-if="returnRequests.length > 0">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in returnRequests" :key="request.returnId">
            <td>{{ request.orderId }}</td>
            <td>{{ request.productId }}</td>
            <td>{{ request.reason }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </table>
  
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sellerId: '', 
        returnRequests: [], 
        message: '', 
      };
    },
    methods: {
      
      async fetchReturnRequests() {
        if (!this.sellerId) {
          this.message = 'Please enter a valid Seller ID.';
          return;
        }
  
        try {
          const response = await axios.get(
            `http://localhost:8082/api/returns/seller/${this.sellerId}`
          );
          this.returnRequests = response.data; 
          this.message = '';
        } catch (error) {
          this.message = 'Failed to fetch return requests. Please try again.';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .view-returns {
    padding: 20px;
  }
  
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
  p {
    margin-top: 20px;
    color: red;
  }
  </style>
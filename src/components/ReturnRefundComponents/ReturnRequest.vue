<template>
    <div class="return-request">
      <h2>Return Request</h2>
      <form @submit.prevent="submitReturnRequest">
        <input v-model="returnRequest.orderId" placeholder="Order ID" type="number" required />
        <input v-model="returnRequest.sellerId" placeholder="Seller ID" type="number" required />
        <input v-model="returnRequest.productId" placeholder="Product ID" type="number" required />
        <input v-model="returnRequest.customerId" placeholder="Customer ID" type="number" required />
        <input v-model="returnRequest.reason" placeholder="Reason for Return" required />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        returnRequest: {
          orderId: null,
          sellerId: null,
          productId: null,
          customerId: null,
          reason: '',
        },
      };
    },
    methods: {
      async submitReturnRequest() {
        try {
          const response = await axios.post(
            'http://localhost:8082/api/returns',
            this.returnRequest
          );
          console.log(response.status)
          if (response.status === 201) {
            alert('Your request has been sent successfully!');
            this.resetForm(); 
          } else {
            alert('Failed to send the request. Please try again.');
          }
        } catch (error) {
          alert('Failed to send the request. Please try again.');
          console.error(error);
        }
      },
      resetForm() {
        this.returnRequest = {
          orderId: null,
          sellerId: null,
          productId: null,
          customerId: null,
          reason: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .return-request {
    padding: 20px;
    text-align: center;
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
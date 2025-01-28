<template>
    <div class="warranty-claim">
      <h2>Warranty Claim</h2>
  
      <!-- Warranty Claim Form -->
      <form @submit.prevent="submitWarrantyClaim">
        <div class="form-group">
          <label for="orderId">Order ID:</label>
          <input
            type="text"
            id="orderId"
            v-model="warrantyClaim.orderId"
            required
            placeholder="Enter Order ID"
          />
        </div>
  
        <div class="form-group">
          <label for="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            v-model="warrantyClaim.productId"
            required
            placeholder="Enter Product ID"
          />
        </div>
  
        <div class="form-group">
          <label for="dateOfPurchase">Date of Purchase:</label>
          <input
            type="date"
            id="dateOfPurchase"
            v-model="warrantyClaim.dateOfPurchase"
            required
            placeholder="YYYY-MM-DD"
          />
        </div>
  
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Submitting..." : "Submit Claim" }}
        </button>
      </form>
  
      <!-- Display response message -->
      <p v-if="responseMessage" :class="responseClass">{{ responseMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        warrantyClaim: {
          orderId: '',
          productId: '',
          dateOfPurchase: '',
        },
        isSubmitting: false, 
        responseMessage: '', 
        responseClass: '', 
      };
    },
    methods: {
     
      async submitWarrantyClaim() {
        this.isSubmitting = true; 
        this.responseMessage = ''; 
  
        try {
          const response = await axios.post(
            'http://localhost:8082/api/returns/warranty/claim',
            this.warrantyClaim
          );
          this.responseMessage = response.data; 
          this.responseClass = 'success';
        } catch (error) {
          if (error.response) {
            this.responseMessage = error.response.data; 
          } else {
            this.responseMessage = "An error occurred while processing the warranty claim.";
          }
          this.responseClass = 'error';
        } finally {
          this.isSubmitting = false; 
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .warranty-claim {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  h2 {
    color: #2874f0;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #2874f0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    margin: 20px auto;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  p {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
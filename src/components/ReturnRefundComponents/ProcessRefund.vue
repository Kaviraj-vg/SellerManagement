<template>
    <div class="process-refund">
      <h2>Process Refund</h2>
      <form @submit.prevent="processRefund">
        <input v-model="returnId" placeholder="Return ID" type="number" required />
        <button type="submit">Refund</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        returnId: null,
        message: '',
      };
    },
    methods: {
      async processRefund() {
        if (!this.returnId) {
          alert('Please enter a valid Return ID.');
          return;
        }
  
        try {
          const response = await axios.post(
            `http://localhost:8082/api/returns/${this.returnId}/refund`
          );
          if (response.status === 200) {
            this.message = 'Refund processed successfully!';
          } else {
            this.message = 'Failed to process refund. Please try again.';
          }
        } catch (error) {
          this.message = 'Failed to process refund. Please try again.';
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .process-refund {
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
  
  p {
    margin-top: 20px;
    color: rgb(19, 41, 238);
  }
  </style>
<template>
  <div class="add-product-request">
    <h2>Add Product Request</h2>
    <form @submit.prevent="submitRequest">
      <input v-model="product.name" placeholder="Name" required />
      <input v-model="product.description" placeholder="Description" required />
      <input v-model="product.color" placeholder="Color" required />
      <input v-model="product.size" placeholder="Size" required />
      <input v-model="product.price" placeholder="Price" type="number" required />
      <input v-model="product.discount" placeholder="Discount" type="number" required />
      <input v-model="product.stockQuantity" placeholder="Stock Quantity" type="number" required />
      <!-- <input v-model="product.sellerId" placeholder="Seller ID" type="number" required /> -->
      <button type="submit">Submit Request</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        color: '',
        size: '',
        price: '',
        discount: '',
        stockQuantity: '',
        sellerId: localStorage.getItem('sellerId'),
      },
      message: '',
    };
  },
  methods: {
    async submitRequest() {
      const productDTO = {
        name: this.product.name,
        description: this.product.description,
        color: this.product.color,
        size: this.product.size,
        price: parseFloat(this.product.price), 
        discount: parseFloat(this.product.discount), 
        stockQuantity: parseInt(this.product.stockQuantity, 10), 
        sellerId: parseInt(this.product.sellerId, 10), 
      };

      try {
        const response = await axios.post('http://localhost:8080/api/products/add', productDTO);
        if (response.status === 201) {
          this.message = 'Product addition request submitted for approval.';
          this.product = {
            name: '',
            description: '',
            color: '',
            size: '',
            price: '',
            discount: '',
            stockQuantity: '',
            sellerId: '',
          };
        } else {
          this.message = 'Failed to submit request. Please try again.';
        }
      } catch (error) {
        this.message = 'Failed to submit request. Please try again.';
        console.error('Error submitting request:', error);
      }
    },
  },
};
</script>

<style scoped>
.add-product-request {
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
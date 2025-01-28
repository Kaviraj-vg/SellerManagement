




<template>
  <div class="update-return-status">
    <h2>Update Return Status</h2>
    <form @submit.prevent="submitStatusUpdate">
      <input v-model="returnId" placeholder="Return ID" type="number" required />
      <select v-model="selectedStatus" required>
        <option disabled value="">Select Status</option>
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <button type="submit">Submit</button>
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
      selectedStatus: '',
      statusOptions: ['PENDING', 'APPROVED', 'REJECTED', 'PROCESSED', 'DEFECTIVE'],
      message: '',
    };
  },
  methods: {
    async submitStatusUpdate() {
      if (!this.returnId || !this.selectedStatus) {
        alert('Please enter a valid Return ID and select a status.');
        return;
      }

      try {
        const response = await axios.put(
          `http://localhost:8082/api/returns/${this.returnId}/status/${this.selectedStatus}`
        );
        if (response.status === 200) {
          this.message = 'Return status updated successfully!';
        } else {
          this.message = 'Failed to update return status. Please try again.';
        }
      } catch (error) {
        this.message = 'Failed to update return status. Please try again.';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.update-return-status {
  padding: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

input,
select {
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
<template>
  <div class="delete-container">
    <div class="delete-card">
      <div class="delete-header">
        <h2>Delete Seller</h2>
        <p>Remove a seller from the system</p>
      </div>

      <form @submit.prevent="deleteSeller" class="delete-form">
        <div class="form-group">
          <label for="sellerId">Seller ID</label>
          <input 
            type="number" 
            id="sellerId" 
            v-model="sellerId" 
            placeholder="Enter Seller ID"
            required 
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-delete">
            Delete Seller
          </button>
        </div>
      </form>

      <div v-if="message" :class="['message', messageClass]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SellerDelete",
  data() {
    return {
      sellerId: null,
      message: '',
      messageClass: ''
    };
  },
  methods: {
    async deleteSeller() {
        console.log(this.sellerId);
      if (!this.sellerId) {
        this.message = 'Please enter a Seller ID';
        this.messageClass = 'error-message';
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8002/seller/remove/${this.sellerId}`, 
          { method: 'DELETE' }
        );

        if (response.ok) {
          this.message = `Seller with ID ${this.sellerId} deleted successfully`;
          this.messageClass = 'success-message';
          this.sellerId = null;
        } else {
          const errorData = await response.json();
          this.message = errorData.message || 'Failed to delete seller';
          this.messageClass = 'error-message';
        }
      } catch (error) {
        this.message = 'An error occurred while deleting seller';
        this.messageClass = 'error-message';
        console.error('Delete seller error:', error);
      }
    }
  }
};
</script>

<style scoped>
.delete-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.delete-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 30px;
}

.delete-header {
  text-align: center;
  margin-bottom: 25px;
}

.delete-header h2 {
  color: #333;
  margin-bottom: 10px;
}

.delete-header p {
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #f44336;
}

.btn-delete {
  width: 100%;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.message {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>

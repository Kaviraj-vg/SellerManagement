<template>
  <div class="view-main">
    <h2>View Details</h2>
    <div class="button-container">
      <button @click="navigateTo('ReturnRequest')">Request</button>
      <button @click="navigateTo('UpdateReturnStatus')">Processing</button>
      <button @click="navigateTo('ProcessRefund')">Refund</button>
      <button @click="navigateTo('ViewReturnsBySeller')">View By ID</button>
      <button @click="navigateTo('ViewAllReturns')">View All</button>
      <button @click="navigateTo('WarrantyClaim')">Warranty</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName }); 
    },
  },
};
</script>

<style scoped>
.view-main {
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    background-color: #f5f5f5; 
    padding: 20px;
}

h1 {
    margin-bottom: 30px;
    color: #2874f0; 
    font-size: 2.5rem;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px; 
  }
  
  button {
    padding: 15px 20px;
    background-color: #2874f0; 
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #1c5bb8; 
  }
</style>
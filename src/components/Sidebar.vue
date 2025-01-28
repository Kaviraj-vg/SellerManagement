<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>Portal Menu</h2>
    </div>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <a href="#" @click="handleClick(item)" class="sidebar-link" :class="{ 'active-link': isActive(item.path) }">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(item) {
      if (item.name === 'Seller') {
        const sellerId = prompt('Please enter the Seller ID:');
        if (sellerId) {
          localStorage.setItem('sellerId', sellerId);
          this.$router.push(item.path); 
        }
      } else {
        this.$router.push(item.path); 
      }
    },
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>
  
  <style scoped>
  .sidebar {
    position: sticky;
    top: 0;
    width: 250px;
    background: #f9fafb; 
    border-right: 1px solid #e5e7eb; 
    height: 70vh;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
    overflow-y: auto; 
  }
  
  .sidebar-header {
    background: linear-gradient(90deg, #0056b3, #007bff);

    color: #ffffff; 
    padding: 20px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar li {
    margin: 0;
  }
  
  .sidebar-link {
    display: block;
    padding: 15px 20px;
    color: #4b5563; /* Neutral gray */
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .sidebar-link:hover {
    background: #e0f2fe; /* Light blue */
    color: #1d4ed8; /* Blue text on hover */
  }
  
  .active-link {
    background: #1d4ed8; /* Active blue background */
    color: #ffffff; /* White text */
    font-weight: bold;
  }
  </style>







   
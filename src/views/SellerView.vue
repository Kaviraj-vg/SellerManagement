<template>
    <div class="seller-portal">
      <Sidebar :menuItems="menuItems" />
      <div class="content">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: { Sidebar },
    data() {
      return {
        menuItems: [
          { name: 'Dashboard', path: '/seller/dashboard' },
          { name: 'Product Management', path: '/seller/product-management' },
          { name: 'Manage Returns & Refunds', path: '/seller/manage-returns' },
          { name: 'Support Tickets', path: '/seller/support-tickets' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .seller-portal {
    display: flex;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  </style>
  
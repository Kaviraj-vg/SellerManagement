<template>
    <div class="admin-portal">
      <Sidebar :menuItems="menuItems" />
      <div class="content">
        <router-view />
        <!-- <button @click="goToSellerPortal">Go To Seller Portal</button> -->
      </div>
    </div>
  </template>
  
  <!-- <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: { Sidebar },
    data() {
      return {
        menuItems: [
          { name: 'Seller Approval', path: '/admin/seller-approval' },
          { name: 'Product Approval', path: '/admin/product-approval' },
          { name: 'Delete Seller', path: '/admin/delete-approval' },
          { name: 'Seller', path: '/seller/dashboard' },
        ],
      };
    },
    methods: {
      goToSellerPortal() {
        this.$router.push('/seller/dashboard');
      },
    },
  };
  </script> -->


  <script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: { Sidebar },
  data() {
    return {
      menuItems: [
        { name: 'Seller Approval', path: '/admin/seller-approval' },
        { name: 'Product Approval', path: '/admin/product-approval' },
        { name: 'Delete Seller', path: '/admin/delete-approval' },
        { name: 'Seller', path: '/seller/dashboard' },
      ],
    };
  },
  methods: {
    handleMenuClick(menuItem) {
      if (menuItem.name === 'Seller') {
        const sellerId = prompt('Please enter the Seller ID:');
        if (sellerId) {
          localStorage.setItem('sellerId', sellerId);
          this.$router.push(menuItem.path); 
        }
      } else {
        this.$router.push(menuItem.path);
      }
    },
  },
};
</script>

  
  <style scoped>
  .admin-portal {
    display: flex;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  </style>
  
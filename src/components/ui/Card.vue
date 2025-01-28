<template>
    <div class="card p-4 bg-white rounded-lg shadow-md">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
  };
  </script>
  
  <style scoped>
  .card {
    margin: 1rem 0;
    border: 1px solid #ddd;
  }
  </style>
  
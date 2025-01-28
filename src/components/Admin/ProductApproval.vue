<template>
  <div class="product-approval">
    <div class="product-approval-header">
      <h1>Product Approval</h1>
    </div>
    <div class="product-approval-list">
      <div class="product-approval-format-header">
        <p>Product ID (SKU)</p>
        <p>Name</p>
        <p>Description</p>
        <p>Color</p>
        <p>Size</p>
        <p>Price</p>
        <p>Discounted Price</p>
        <p>Stock Quantity</p>
        <p>Seller ID</p>
        <p>Status</p>
        <p>Action</p>
      </div>
      <hr />
      <div
        v-for="prod in product"
        :key="prod.productId"
        class="product-approval-item"
      >
        <p>{{ prod.sku }}</p>
        <p>{{ prod.name }}</p>
        <p>{{ prod.description }}</p>
        <p>{{ prod.color }}</p>
        <p>{{ prod.size }}</p>
        <p>{{ prod.price }}</p>
        <p>{{ prod.discountedPrice }}</p>
        <p>{{ prod.stockQuantity }}</p>
        <p>{{ prod.sellerId }}</p>
        <p :class="getStatusClass(prod.status)">{{ prod.status }}</p>
        <div class="action-buttons">
          <button @click="handleApproveProduct(prod.productId)" class="approve-btn">
            Approve
          </button>
          <button @click="handleRejectProduct(prod.productId)" class="reject-btn">
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useProductApprovalStore from "../../stores/ProductApprovalStores.js";
import { mapActions, mapState } from "pinia";

export default {
  computed: {
    ...mapState(useProductApprovalStore, ["product"]),
  },
  methods: {
    ...mapActions(useProductApprovalStore, [
      "fetchPendingProducts",
      "approveProduct",
      "rejectProduct",
    ]),

    async handleApproveProduct(id) {
      await this.approveProduct(id);
    },

    async handleRejectProduct(id) {
      await this.rejectProduct(id);
    },

    getStatusClass(status) {
      if (status === "Pending") return "status-pending";
      if (status === "Approved") return "status-approved";
      if (status === "Rejected") return "status-rejected";
      return "status-unknown";
    },
  },
  created() {
    this.fetchPendingProducts();
  },
};
</script>

<style>
/* Overall Container */
.product-approval {
  font-family: "Segoe UI", Arial, sans-serif;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header */
.product-approval-header {
  text-align: center;
  margin-bottom: 20px;
}

.product-approval-header h1 {
  font-size: 2rem;
  color: #333333;
}

/* List Container */
.product-approval-list {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header Row */
.product-approval-format-header {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  font-weight: bold;
  color: #555555;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}

/* Product Items */
.product-approval-item {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.product-approval-item:last-child {
  border-bottom: none;
}

/* Status Classes */
.status-pending {
  color: #ff9800;
  font-weight: bold;
}

.status-approved {
  color: #4caf50;
  font-weight: bold;
}

.status-rejected {
  color: #f44336;
  font-weight: bold;
}

.status-unknown {
  color: #9e9e9e;
  font-weight: bold;
}

/* Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.approve-btn {
  background-color: #4caf50;
  color: white;
}

.approve-btn:hover {
  background-color: #45a049;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reject-btn {
  background-color: #f44336;
  color: white;
}

.reject-btn:hover {
  background-color: #e53935;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-approval-format-header,
  .product-approval-item {
    grid-template-columns: repeat(3, 1fr);
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="seller-approval">
    <div class="seller-approval-header">
      <h1>Seller Approval</h1>
    </div>
    <div class="seller-approval-list">
      <div class="seller-approval-format-header">
        <p>Name</p>
        <p>KYC Type</p>
        <p>KYC Document</p>
        <p>KYC Status</p>
        <p>Created At</p>
        <p>Action</p>
      </div>
      <hr />
      <div v-for="seller in sellers" :key="seller.id" class="seller-approval-item">
        <p>{{ seller.name }}</p>
        <p>{{ seller.kycType }}</p>
        <p>
          <a :href="seller.kycDoc" target="_blank" class="kyc-doc-link">
            View Document
          </a>
        </p>
        <p :class="getKycStatusClass(seller.status)">
          {{ seller.status }}
        </p>
        <p>{{ seller.createdAt }}</p>
        <div class="action-buttons">
          <button @click="handleApproveSeller(seller.id)" class="approve-btn">
            Approve
          </button>
          <button @click="handleRejectSeller(seller.id)" class="reject-btn">
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSellerApprovalStore from "@/stores/SellerApprovalStore.js";
import { mapActions, mapState } from "pinia";

export default {
  computed: {
    ...mapState(useSellerApprovalStore, ["sellers"]),
  },
  methods: {
    ...mapActions(useSellerApprovalStore, [
      "fetchPendingSellers",
      "approveSeller",
      "rejectSeller",
    ]),

    async handleApproveSeller(id) {
      await this.approveSeller(id);
    },

    async handleRejectSeller(id) {
      await this.rejectSeller(id);
    },

    getKycStatusClass(status) {
      if (status === "Pending") return "status-pending";
      if (status === "Approved") return "status-approved";
      if (status === "Rejected") return "status-rejected";
      return "status-pending";
    },
  },
  created() {
    this.fetchPendingSellers();
  },
};
</script>

<style>
/* Overall Container */
.seller-approval {
  font-family: "Segoe UI", Arial, sans-serif;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header Section */
.seller-approval-header {
  text-align: center;
  margin-bottom: 20px;
}

.seller-approval-header h1 {
  font-size: 2rem;
  color: #333333;
  margin: 0;
}

/* List Section */
.seller-approval-list {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Table Header */
.seller-approval-format-header {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 10px 0;
  font-weight: bold;
  color: #555555;
}

/* Item Styling */
.seller-approval-item {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.seller-approval-item:last-child {
  border-bottom: none;
}

/* Link Styling */
.kyc-doc-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.kyc-doc-link:hover {
  text-decoration: underline;
}

/* Status Styling */
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

/* Button Styling */
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

/* Responsiveness */
@media (max-width: 768px) {
  .seller-approval-format-header,
  .seller-approval-item {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>

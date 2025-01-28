import { defineStore } from "pinia";

const useProductApprovalStore = defineStore("productApproval", {
  state: () => ({
    product: [], 
    error: null,
  }),
  actions: {
    // Fetch products with pending status
    async fetchPendingProducts() {
      try {
        const response = await fetch("http://localhost:8080/api/products/pending");
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        this.product = await response.json(); 
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching pending products:", error);
      }
    },

    // Approve a product by ID
    async approveProduct(productId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/requests/${productId}/process?status=ACCEPTED`,
          { method: "PUT" }
        );
        if (!response.ok) {
          throw new Error(`Failed to approve product: ${response.statusText}`);
        }
        // Optionally refetch pending products or update local state
        this.fetchPendingProducts();
      } catch (error) {
        this.error = error.message;
        console.error("Error approving product:", error);
      }
    },

    
    async rejectProduct(productId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/requests/${productId}/process?status=REJECTED`,
          { method: "PUT" }
        );
        if (!response.ok) {
          throw new Error(`Failed to reject product: ${response.statusText}`);
        }
       
        this.fetchPendingProducts();
      } catch (error) {
        this.error = error.message;
        console.error("Error rejecting product:", error);
      }
    },
  },
});

export default useProductApprovalStore;

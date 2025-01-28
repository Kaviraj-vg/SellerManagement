import { defineStore } from 'pinia'

const useSellerApprovalStore = defineStore('sellerApproval', {
  state: () => ({
    sellers: [],
  }),
  
  actions: {
    async fetchPendingSellers() {
     
      try {

        fetch('http://localhost:8002/seller/pending',{
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            }
        }).then((res)=>{
            res.json().then((response)=>{
                this.sellers=response;
            })
        }).catch((res)=>{
            console.log(res);
        })
        // this.sellers = response.json();
        console.log(this.sellers);
        // this.sellers = response.data
        } catch (error) {
            this.error = error.message
            console.error('Failed to fetch pending sellers:', error)
        }
    },
    
    async approveSeller(sellerId) {
        try {
          const response = await fetch(`http://localhost:8002/seller/approve/${sellerId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to approve seller: ${response.statusText}`);
          }
      
          // Update local state
          const index = this.sellers.findIndex((seller) => seller.id === sellerId);
          if (index !== -1) {
            this.sellers.splice(index, 1);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          this.error = error.message;
          console.error('Failed to approve seller:', error);
        }
      },
    
    async rejectSeller(sellerId) {
      try {
        const response = await fetch(`http://localhost:8002/seller/reject/${sellerId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to approve seller: ${response.statusText}`);
          }

        // Update local state
        const index = this.sellers.findIndex(seller => seller.id === sellerId)
        if (index !== -1) {
          this.sellers.splice(index, 1)
        }
        
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to reject seller:', error)
      }
    }
  }
})

export default useSellerApprovalStore;
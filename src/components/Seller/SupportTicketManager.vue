<template>
    <div id="app" class="container">
      <h1>Ticket Management</h1>
  
      <!-- Filters -->
      <div class="filters">
        <label for="statusFilter">Filter by Status:</label>
        <select v-model="statusFilter" id="statusFilter" @change="fetchTickets">
          <option value="">All</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>
  
      <!-- Ticket List -->
      <table class="ticket-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Customer Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in tickets"
            :key="ticket.ticketId"
            @click="viewTicket(ticket.ticketId)"
            class="ticket-row"
          >
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.description }}</td>
            <td>{{ ticket.status }}</td>
            <td>{{ ticket.priority }}</td>
            <td>{{ ticket.customerEmail }}</td>
            <td><button @click.stop="viewTicket(ticket.ticketId)">View</button></td>
          </tr>
        </tbody>
      </table>
  
      <!-- Ticket Details -->
  <div v-if="selectedTicket" class="ticket-detail">
    <h2>Ticket Details</h2>
    <div class="ticket-info">
      <div class="ticket-field">
        <strong>Title:</strong> <span>{{ selectedTicket.title }}</span>
      </div>
      <br>
      <div class="ticket-field">
        <strong>Description:</strong>
        <p>{{ selectedTicket.description }}</p>
      </div>
      <br>
      <div class="ticket-field">
        <strong>Status:</strong>
        <select v-model="selectedStatus">
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>
      <br>
  
      <div class="ticket-field">
        <strong>Priority:</strong> <span>{{ selectedTicket.priority }}</span>
      </div>
      <br>
  
      <div class="ticket-field">
        <strong>Customer Email:</strong>
        <span>{{ selectedTicket.customerEmail }}</span>
      </div>
      <br>
  
      <div class="ticket-field">
        <strong>Response:</strong>
        <textarea v-model="response" rows="4" placeholder="Write your response here..."></textarea>
      </div>
    </div>
    <div class="ticket-actions">
      <button @click="updateTicket">Update Ticket</button>
    
      <button @click="respondToTicket">Respond to Ticket</button>
    </div>
  </div>
  
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        tickets: [], 
        selectedTicket: null, 
        selectedStatus: '',
        response: '',
        statusFilter: '',
        apiUrl: "http://localhost:8084/api/tickets/",
        // sellerId: 101
        sellerId: localStorage.getItem('sellerId')

      };
    },
    mounted() {
      this.fetchTickets(); 
    },
    methods: {
      async fetchTickets() {
        try {
          let url = `${this.apiUrl}seller?sellerId=${this.sellerId}`;
          if (this.statusFilter) {
            url = `http://localhost:8084/api/tickets?sellerId=${this.sellerId}&status=${this.statusFilter}`; 
          }
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch tickets");
          this.tickets = await response.json(); 
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      },
  
      async viewTicket(ticketId) {
        try {
  

  
          const response = await fetch(`${this.apiUrl}${ticketId}`);
          if (!response.ok) throw new Error("Failed to fetch ticket details");
          const ticket = await response.json();
          this.selectedTicket = ticket;
          this.selectedStatus = ticket.status;
          this.response = ticket.response || '';
        } catch (error) {
          console.error("Error fetching ticket details:", error);
        }
      },
  
      async updateTicket() {
        try {
          const response = await fetch(
  
  
  
            `${this.apiUrl}${this.selectedTicket.ticketId}/status?status=${this.selectedStatus}`,
            { method: 'PUT' }
          );
          if (!response.ok) throw new Error("Failed to update ticket status");
          alert("Ticket status updated successfully");
          this.selectedTicket.status = this.selectedStatus;
          this.fetchTickets();
        } catch (error) {
          console.error("Error updating ticket status:", error);
        }
      },
  
      // Respond to a ticket
      async respondToTicket() {
        try {
          const response = await fetch(
            `${this.apiUrl}${this.selectedTicket.ticketId}/respond`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.response ),
            }
          );
          if (!response.ok) throw new Error("Failed to post response");
          alert("Response posted successfully");
          this.selectedTicket.response = this.response; 
        } catch (error) {
          console.error("Error responding to ticket:", error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  
  #app {
    background-color: #ffffff; 
    min-height: 100vh; 
    padding: 20px; 
    box-sizing: border-box; 
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #1e90ff;
    font-family: 'Arial', sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .filters {
    margin-bottom: 20px;
  }
  
  .ticket-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
  
  .ticket-table th,
  .ticket-table td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .ticket-row:hover {
    background-color: #e0f7fa;
  }
  
  .ticket-detail {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .ticket-actions button {
    background-color: #1e90ff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  }
  
  button {
    background-color: #1e90ff;
    color: white;
    padding: 10px;
    margin-right: 10px;
    border: none;
    cursor: pointer;
  }
  </style>
  
  
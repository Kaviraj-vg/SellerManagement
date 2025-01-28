<template>
  <div class="kyc-container">
    <div class="kyc-card">
      <div class="kyc-header">
        <h2>Seller Verification</h2>
        <p>Complete your KYC to become a verified seller</p>
      </div>

      <form @submit.prevent="submitForm" class="kyc-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              placeholder="Enter your full name"
              required 
            />
          </div>

          <div class="form-group">
            <label for="email">Business Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              placeholder="Your business email"
              required 
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              placeholder="Create a strong password"
              required 
            />
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="form.confirmPassword" 
              placeholder="Retype password"
              required 
            />
            <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
          </div>

          <div class="form-group">
            <label for="kycType">KYC Document Type</label>
            <select 
              id="kycType" 
              v-model="form.kycType" 
              required
            >
              <option value="" disabled>Select Document Type</option>
              <option value="Aadhar">Aadhar Card</option>
              <option value="GST">GST Certificate</option>
              <option value="PAN">PAN Card</option>
            </select>
          </div>

          <div class="form-group">
            <label for="kycDoc">KYC Document URL</label>
            <input 
              type="url" 
              id="kycDoc" 
              v-model="form.kycDoc" 
              placeholder="Upload document URL"
              required 
            />
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn-submit" 
            :disabled="isSubmitDisabled"
          >
            Submit KYC Application
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import kycStore from '../stores/kyc-store'

export default {
  computed: {
    ...mapState(kycStore, ['form']),
    
    passwordError() {
      const password = this.form.password;
      if (password.length < 8) {
        return "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number.";
      } else if (!/[!@#$%^&*]/.test(password)) {
        return "Password must contain at least one special character (!@#$%^&*).";
      }
      return "";
    },
    
    confirmPasswordError() {
      if (this.form.confirmPassword !== this.form.password) {
        return "Passwords do not match.";
      }
      return "";
    },

    isSubmitDisabled() {
      return !!this.passwordError || !!this.confirmPasswordError;
    },
  },
  methods: {
    ...mapActions(kycStore, ['submitKycForm']),
    submitForm() {
      if (this.isSubmitDisabled) {
        console.error("Cannot submit due to validation errors.");
        return;
      }
      this.submitKycForm();
    },
  },
};
</script>

<style scoped>
.kyc-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.kyc-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
  padding: 30px;
}

.kyc-header {
  text-align: center;
  margin-bottom: 25px;
}

.kyc-header h2 {
  color: #333;
  margin-bottom: 10px;
}

.kyc-header p {
  color: #666;
  font-size: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-actions {
  margin-top: 20px;
  text-align: center;
}

.btn-submit {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #357abd;
}

.error-message {
  color: red;
  font-size: small;
}

</style>
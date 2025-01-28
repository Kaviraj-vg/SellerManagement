<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Login</h2>
        <p>Access your dashboard</p>
      </div>

      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Enter your email"
            required 
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Enter your password"
            required 
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-login">
            Login
          </button>
        </div>

        <div class="form-footer">
          <p>
            Don't have an account? 
            <a href="#" @click.prevent="goToRegistration">
              Register Here
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
        email: "",
        password: ""
    };
  },
  methods: {

    goToRegistration(){
      this.$router.push('/kyc'); 
    },

    async login() {
  try {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      this.$router.push('/admin/seller-approval');
    } else if (this.email && this.password) {
      console.log(this.email, this.password);
      const response = await fetch(
        `http://localhost:8002/seller/login?email=${encodeURIComponent(this.email)}&password=${encodeURIComponent(this.password)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage); 
        return;
      }

      const sellerId = await response.json();
      localStorage.setItem('sellerId', sellerId);
      console.log('Login successful, Seller ID:', sellerId);
      this.$router.push('/seller/dashboard');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    alert('An error occurred during login. Please try again.');
  }
}

  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  padding: 30px;
}

.login-header {
  text-align: center;
  margin-bottom: 25px;
}

.login-header h2 {
  color: #333;
  margin-bottom: 10px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4a90e2;
}

.btn-login {
  width: 100%;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #357abd;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.form-footer a {
  color: #4a90e2;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
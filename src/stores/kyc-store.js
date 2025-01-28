import { defineStore } from "pinia";

export default defineStore("kycStore", {
  state: () => ({
    form: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      kycType: "",
      kycDoc: "",
      kycStatus: "Pending"
    }
  }),
  actions: {
    async submitKycForm() {
      try {
        if (this.form.password !== this.form.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const { 
          name, 
          email, 
          password, 
          kycType, 
          kycDoc, 
          kycStatus 
        } = this.form;

        const response = await fetch("http://localhost:8002/seller/addSeller", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            kycType,
            kycDoc,
            kycStatus
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to submit: ${errorText}`);
        }

        // Reset form after successful submission
        this.resetForm();


      } catch (error) {
        console.error("Submission error:", error);
        // Optionally, add error handling logic
      }
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        kycType: "",
        kycDoc: "",
        kycStatus: "Pending"
      };
    }
  }
});
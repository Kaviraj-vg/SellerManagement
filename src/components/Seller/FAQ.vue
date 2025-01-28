<template>
    <div id="faq-page" class="container">
      <h1>FAQs & Documentation</h1>
  
      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <strong>Q: How do I add a new product?</strong>
            <p>A: Navigate to the "Products" section and click "Add New Product." Fill in the required details and save.</p>
          </li>
          <li>
            <strong>Q: How can I view my sales report?</strong>
            <p>A: Go to the "Dashboard" section and select the "Sales Report" tab for detailed insights.</p>
          </li>
          <li>
            <strong>Q: What should I do if I encounter an issue?</strong>
            <p>A: Use the "Support Tickets" feature to raise a query. Our team will get back to you promptly.</p>
          </li>
        </ul>
      </section>
  
      <section class="documentation-section">
        <h2>Documentation</h2>
        <p>
          Welcome to the seller documentation. Here, you can find detailed guides on how to use the platform:
        </p>
        <ul>
          <li><a href="#">Getting Started Guide</a></li>
          <li><a href="#">Managing Your Products</a></li>
          <li><a href="#">Understanding Sales Insights</a></li>
          <li><a href="#">Resolving Common Issues</a></li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "FaqPage",
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    color: #333;
    font-family: 'Arial', sans-serif;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #1e90ff;
    font-size: 2rem;
  }
  
  h2 {
    color: #333;
    margin-top: 20px;
    font-size: 1.5rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f9f9f9;
    border-left: 4px solid #1e90ff;
    border-radius: 4px;
  }
  
  li strong {
    color: #1e90ff;
  }
  
  a {
    color: #1e90ff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  
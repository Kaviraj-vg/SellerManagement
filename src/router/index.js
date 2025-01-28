import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SellerView from '@/views/SellerView.vue';
import AdminView from '@/views/AdminView.vue';
import ProductManagement from '@/components/Seller/ProductManagement.vue';
import ManageReturns from '@/components/Seller/ManageReturns.vue';
import SellerDashboard from '@/components/Seller/SellerDashboard.vue';
import SupportTicketManager from '@/components/Seller/SupportTicketManager.vue';
import FAQ from '@/components/Seller/FAQ.vue';
import SellerApproval from '@/components/Admin/SellerApproval.vue';
import ProductApproval from '@/components/Admin/ProductApproval.vue';
import KYCsignIn from '@/views/KYCsignIn.vue';
import AddProduct from '@/components/ProductManageComponents/AddProduct.vue';
import SellerProductIdForm from '@/components/ProductManageComponents/SellerProductIdForm.vue';
import UpdateProduct from '@/components/ProductManageComponents/UpdateProduct.vue';
import SellerIdFormView from '@/components/ProductManageComponents/SellerIdFormView.vue';
import ViewProducts from '@/components/ProductManageComponents/ViewProducts.vue';
import DeleteProductForm from '@/components/ProductManageComponents/DeleteProductForm.vue';
import ConfirmDelete from '@/components/ProductManageComponents/ConfirmDelete.vue';
import LowStockForm from '@/components/ProductManageComponents/LowStockForm.vue';
import LowStockProducts from '@/components/ProductManageComponents/LowStockProducts.vue';
import SellerDelete from '@/components/Admin/DeleteSeller.vue';
import HomePage from '@/views/ProductManagement/HomeView.vue';
import ReturnRequest from '@/components/ReturnRefundComponents/ReturnRequest.vue'; 
import UpdateReturnStatus from '@/components/ReturnRefundComponents/UpdateReturnStatus.vue'; 
import ProcessRefund from '@/components/ReturnRefundComponents/ProcessRefund.vue';
import ViewAllReturns from '@/components/ReturnRefundComponents/ViewAllReturns.vue';
import ViewReturnsBySeller from '@/components/ReturnRefundComponents/ViewReturnsBySeller.vue';
import WarrentyClaim from '@/components/ProductManageComponents/WarrentyClaim.vue';


const routes = [
  { path: '/', component: LoginView },
  { path: '/kyc', component: KYCsignIn },

  {
    path: '/seller',
    component: SellerView,
    children: [
      { path: 'dashboard', component: SellerDashboard },
      { path: 'product-management', component: ProductManagement },
      { path: 'manage-returns', component: ManageReturns },
      { path: 'support-tickets', component: SupportTicketManager },
      { path: 'faq', component: FAQ },
      {
        path: '/Home', 
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/add-product', 
        name: 'AddProduct',
        component: AddProduct,
      },
      {
        path: '/update-product', 
        name: 'SellerProductIdForm',
        component: SellerProductIdForm,
      },
      {
        path: '/update-product/:sellerId/:productId', 
        name: 'UpdateProduct',
        component: UpdateProduct,
        props: true, 
      },
      {
        path: '/view-products', 
        name: 'SellerIdFormView',
        component: SellerIdFormView,
      },
      {
        path: '/view-products/:sellerId', 
        name: 'ViewProducts',
        component: ViewProducts,
        props: true, 
      },
      {
        path: '/delete-product', 
        name: 'DeleteProductForm',
        component: DeleteProductForm,
      },
      {
        path: '/delete-product/:sellerId/:productId', 
        name: 'ConfirmDelete',
        component: ConfirmDelete,
        props: true, 
      },
      {
        path: '/low-stock', 
        name: 'LowStockForm',
        component: LowStockForm,
      },
      {
        path: '/low-stock/:sellerId', 
        name: 'LowStockProducts',
        component: LowStockProducts,
        props: true, 
      },

      {
        path: '/return-request',
        name: 'ReturnRequest',
        component: ReturnRequest,
      },
      {
        path: '/update-return-status',
        name: 'UpdateReturnStatus',
        component: UpdateReturnStatus,
      },
      {
        path: '/process-refund',
        name: 'ProcessRefund',
        component: ProcessRefund,
      },
      {
        path: '/view-all-returns',
        name: 'ViewAllReturns',
        component: ViewAllReturns,
      },
      {
        path: '/view-returns',
        name: 'ViewReturnsBySeller',
        component: ViewReturnsBySeller,
      },
      {
        path: '/warranty/claim',
        name: 'WarrantyClaim',
        component: WarrentyClaim,
      },
      
    ],
  },
  {
    path: '/admin',
    component: AdminView,
    children: [
      { path: 'seller-approval', component: SellerApproval },
      { path: 'product-approval', component: ProductApproval },
      { path: 'delete-approval', component: SellerDelete },

    ],
  },

  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

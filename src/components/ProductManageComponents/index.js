 import { createRouter, createWebHistory } from 'vue-router'
 import AddProduct from '@/components/AddProduct.vue';
 import SellerProductIdForm from '@/components/SellerProductIdForm.vue';
 import UpdateProduct from '@/components/UpdateProduct.vue';
 import SellerIdFormView from '@/components/SellerIdFormView.vue';
 import ViewProducts from '@/components/ViewProducts.vue';
 import DeleteProductForm from '@/components/DeleteProductForm.vue';
 import ConfirmDelete from '@/components/ConfirmDelete.vue';
 import LowStockForm from '@/components/LowStockForm.vue';
 import LowStockProducts from '@/components/LowStockProducts.vue';
 import AdminApprovalForm from '@/components/AdminApprovalForm.vue';
 import AdminApproval from '@/components/AdminApproval.vue';

 import HomePage from '@/views/HomeView.vue';
 
 const routes = [
   {
     path: '/', 
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
     path: '/admin-approval', 
     name: 'AdminApprovalForm',
     component: AdminApprovalForm,
   },
   {
     path: '/admin-approval/:productId', 
     name: 'AdminApproval',
     component: AdminApproval,
     props: true, 
   },
   
 ];
 
 const router = createRouter({
   history: createWebHistory(),
   routes,
 });
 
 export default router;

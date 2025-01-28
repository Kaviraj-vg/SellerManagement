import { createRouter, createWebHistory } from 'vue-router'; 
import ViewMain from '@/views/ViewMain.vue'; 
import ReturnRequest from '@/components/ReturnRequest.vue'; 
import UpdateReturnStatus from '@/components/UpdateReturnStatus.vue'; 
import ProcessRefund from '@/components/ProcessRefund.vue';
import ViewAllReturns from '@/components/ViewAllReturns.vue';
import ViewReturnsBySeller from '@/components/ViewReturnsBySeller.vue';

const routes = [
  {
    path: '/',
    name: 'ViewMain',
    component: ViewMain,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

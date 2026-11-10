import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/clientes-qr',
                    name: 'clientes-qr',
                    component: () => import('@/views/ClientesQR.vue')
                },
                {
                    path: '/punto-venta',
                    name: 'punto-venta',
                    component: () => import('@/views/PuntoVenta.vue')
                }
            ]
        }
    ]
});

export default router;

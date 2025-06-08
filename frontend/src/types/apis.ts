export const API_ROUTES = {
  API_BASE_URL: 'https://mern-stack-e-commerce-web.onrender.com',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  PRODUCT: {
    LIST: '/product/list',
    INFO: (id: string) => `/product/info/${id}`,
  },
  CART: {
    ADD: '/cart/add',
    GET: '/cart/get',
    REMOVE: (productId: string) => `/cart/${productId}`,
    UPDATE: (productId: string) => `/cart/${productId}`,
  },
  ORDER: {
    LIST: '/order/list',
    CREATE: '/order/create',
    INFO: (id: string) => `/order/info/${id}`,
  },
};
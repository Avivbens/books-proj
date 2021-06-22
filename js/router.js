import homePage from './pages/homePage.js';
import bookApp from './pages/bookApp.js';
import bookDetails from './pages/bookDetails.js';
import aboutPage from './pages/aboutPage.js';
import bookReview from './cmps/reviewAdd.js';

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/books/:id',
        component: bookDetails
    },
    {
        path: '/books/:id/review',
        component: bookReview
    },
]

export const router = new VueRouter({ routes })

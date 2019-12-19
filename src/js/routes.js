
import HomePage from '../pages/home.vue';
import HackerNewsPage from '../pages/HackerNews.vue'
import bestStories from '../pages/bestStories.vue'
import news from "../pages/news.vue"
import user from "../pages/user.vue"
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/HackerNews/',
    component: HackerNewsPage,
  },
  {
    path: '/bestStories/',
    component: bestStories,
  },
  {
    path: '/news/:id',
    component: news,

  },
  {
    path: '/user/:id',
    component: user,
  },

  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;

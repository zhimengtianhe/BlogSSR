import Vue from 'vue';
import Router from 'vue-router';
import Index from '../view/Index.vue';
import Faith from '../view/Faith.vue';

Vue.use(Router);

export function createRouter() {

	return new Router({

		mode: 'history',

		routes: [
			{
				path: '/',
				component: Index
			},
			{
				path: '/Faith',
				component: Faith
			}
		]

	});
}
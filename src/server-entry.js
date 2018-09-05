import { createApp } from './main.server.js';

export default context => {
	return new Promise((resolve, reject) => {

		const {
			app,
			router
		} = createApp();


		router.push(context.url);
s

		router.onReady(() => {

			const matchedComponents = router.getMatchedComponents();


			if(!matchedComponents.length) {

				return reject({
					code: 404
				});

			}


			resolve(app);

		}, reject);

	});
}
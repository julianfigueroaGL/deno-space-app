import { Router } from './deps.ts';
import { getAllPlanets } from './models/planets.ts';
import { getAllLaunches, getLaunchById, addLaunch, deleteLaunchById } from './models/launches.ts';

const router = new Router();

router.get('/', (ctx) => {
	ctx.response.body = 'NASA';
});

router.get('/planets', (ctx) => {
	ctx.response.body = getAllPlanets();
});

router.get('/launches', (ctx) => {
	ctx.response.body = getAllLaunches();
});

router.get('/launches/:id', (ctx) => {
	const { id } = ctx.params;

	if (id) {
		const launchList = getLaunchById(Number(id));
		if (launchList) {
			ctx.response.body = launchList;
		} else {
			ctx.throw(400, `Launch with ID ${id} does not exist!!!`);
		}
	}
});

router.delete('/launches/:id', (ctx) => {
	const { id } = ctx.params;

	if (id) {
		const result = deleteLaunchById(Number(id));
		ctx.response.body = { success: result };
	}
});

router.post('/launches', async (ctx) => {
	const body = await ctx.request.body();

	addLaunch(await body.value);

	ctx.response.body = {
		success: true,
	};
	ctx.response.status = 201;
});

export default router;

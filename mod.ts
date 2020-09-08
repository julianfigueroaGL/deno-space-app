import { Application, send, log } from './deps.ts';
import api from './api.ts';

const app = new Application();
const port = 8000;

await log.setup({
	handlers: {
		console: new log.handlers.ConsoleHandler('INFO'),
	},
	loggers: {
		default: {
			level: 'INFO',
			handlers: ['console'],
		},
	},
});

app.addEventListener('error', (event) => {
	log.error(event.error);
});

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.response.body = 'Internal Server Error';
		throw err;
	}
});

app.use(async (ctx, next) => {
	await next();
	const time = ctx.response.headers.get('X-Response-Time');
	log.info('Req Method: ', ctx.request.method);
	log.info('Req URL: ', ctx.request.url);
	log.info('Req time: ', time);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const delta = Date.now() - start;
	ctx.response.headers.set('X-Response-Time', `${delta}ms`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
	const filePath = ctx.request.url.pathname;
	const fileWhiteList = [
		'/index.html',
		'/javascripts/script.js',
		'/stylesheets/style.css',
		'/images/favicon.png',
		'/videos/space.mp4',
	];
	const options = {
		root: `${Deno.cwd()}/public`,
	};

	if (fileWhiteList.includes(filePath)) {
		await send(ctx, filePath, options);
	}
});

if (import.meta.main) {
	log.info(`starting server on port ${port}...`);
	await app.listen({
		port,
	});
}

import { assertEquals, assertNotEquals } from '../test_deps.ts';

import { filterHabitablePlanets } from './planets.ts';

const HABITABLE_PLANET = {
	koi_disposition: 'CONFIRMED',
	koi_prad: '1',
	koi_smass: '1',
	koi_srad: '1',
};

const NOT_CONFIRMED = {
	koi_disposition: 'FALSE_POSITIVE',
};

const TOO_LARGE_SOLAR_MASS = {
	koi_disposition: 'CONFIRMED',
	koi_prad: '1',
	koi_smass: '1.04',
	koi_srad: '1',
};

const TOO_LARGE_PLANETARY_RADIUS = {
	koi_disposition: 'CONFIRMED',
	koi_prad: '1.5',
	koi_smass: '1',
	koi_srad: '1',
};

const TOO_LARGE_SOLAR_RADIUS = {
	koi_disposition: 'CONFIRMED',
	koi_prad: '1',
	koi_smass: '1',
	koi_srad: '1.01',
};

Deno.test('filter only habitable planets', () => {
	const filtered = filterHabitablePlanets([
		HABITABLE_PLANET,
		NOT_CONFIRMED,
		TOO_LARGE_PLANETARY_RADIUS,
		TOO_LARGE_SOLAR_RADIUS,
		TOO_LARGE_SOLAR_MASS,
	]);

	assertEquals(filtered, [HABITABLE_PLANET]);
	assertNotEquals({ runtime: 'deno' }, { runtime: 'node' });
});


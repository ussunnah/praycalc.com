// data/build.js [entry point]
const fs = require('fs'),
 path = require('path'),
 dateFns = require('date-fns'),
 geolib = require('geolib'),
 backupExisting = require('./libs/backupExisting'),
 processCities = require('./libs/processCities'),
 processAirports = require('./libs/processAirports'),
 processZipcodes = require('./libs/processZipcodes'),
 createGeoFiles = require('./libs/createGeoFiles'),
 processIpAddress = require('./libs/processIpAddress'),
 createIpFiles = require('./libs/createIpFiles'),
 citiesSource = 'data/sources/cities500.txt',
 airportsSource = 'data/sources/airports_Worldwide.csv',
 zipcodesSource = 'data/sources/US.txt',
 ipAddressSource = 'data/sources/IP2LOCATION-LITE-DB11.CSV';

(async () => {
	console.log(`\n${dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\nBeginning data build.\n`);
    await backupExisting();
    const cityData = await processCities(citiesSource);
	const airportData = await processAirports(airportsSource, cityData);
	const zipcodeData = await processZipcodes(zipcodesSource, cityData);
	await createGeoFiles(cityData, airportData, zipcodeData);

	const ipData = await processIpAddress(ipAddressSource, cityData);
    await createIpFiles(ipData);
	console.log('\nData build complete.\n');
})();

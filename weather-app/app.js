// const yargs = require('yargs');

// const geocode = require('./geocode/geocode.js');

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

//33376856af05cd3d83e6c14d412c5254

const request = require('request');

request({
    url:'https://api.darksky.net/forecast/33376856af05cd3d83e6c14d412c5254/39.936521,-75.15489',
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather');
    } 
});
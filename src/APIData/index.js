const https = require('https');
const COVID19_API_URL = 'https://covid19.mathdro.id/api/';

const getCOVIDData = async () => {
    return new Promise((resolve, reject) => {
        https.get(COVID19_API_URL, callback => {
            callback.on("data", raw => {
                try {
                    const data = String(raw);
                    const json = JSON.parse(data);
                    const { data: { confirmed, recovered, deaths, lastUpdate } } = { data: { confirmed: json['confirmed'], recovered: json['recovered'], deaths: json['deaths'], lastUpdate: json['lastUpdate'] } };
                    const parsedData = { confirmed, recovered, deaths, lastUpdate };
                    resolve(parsedData);
                } catch (error) {
                    if (error) reject(error);
                }
            });
        });
    });
}

module.exports = { getCOVIDData };

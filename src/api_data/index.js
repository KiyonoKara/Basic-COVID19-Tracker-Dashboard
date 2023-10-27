const https = require('https');
const COVID19_API_URL = 'https://storage.googleapis.com/covid19-open-data/v3/latest/epidemiology.json';

const getCovidData = async () => {
    return new Promise((resolve, reject) => {
        https.get(COVID19_API_URL, callback => {
            let rawData = String();
            callback.on("data", raw => {
                try {
                    rawData += raw;
                } catch (error) {
                    reject(error);
                }
            });
            callback.on("end", () => {
                const json = JSON.parse(rawData);
                const data = json['data'];
                let [cumulativeConfirmed, cumulativeDeaths, cumulativeRecoveries] = [0, 0, 0]
                for (let index in data) {
                    if (data.hasOwnProperty(index)) {
                        if (data[index][1].length <= 2) {
                            // Column 6: "cumulative_confirmed"
                            // Column 7: "cumulative_deceased"
                            // Column 8: "cumulative_recovered"
                            cumulativeConfirmed += data[index][6] || 0;
                            cumulativeDeaths += data[index][7] || 0;
                            cumulativeRecoveries += data[index][8] || 0;
                        }
                    }
                }

                const { data: { confirmed, deaths, recoveries } } = { data: { confirmed: cumulativeConfirmed, deaths: cumulativeDeaths, recoveries: cumulativeRecoveries } };
                const cumulativeData = { confirmed, deaths, recoveries };
                resolve(cumulativeData);
            });
        });
    });
}

module.exports = { getCovidData };

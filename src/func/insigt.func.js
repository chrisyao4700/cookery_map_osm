const neatCsv = require('neat-csv');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const fs = require('fs');


class InsightFunc {

    /* Input would be the relative path for the csv file */
    /* Output would be an array data */
    static async readCsv(path) {
        return new Promise((resolve, reject) => {
            if (!path) reject(new Error('Cannot find file path'));
            fs.readFile(path, async (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                neatCsv(data)
                    .then(res => resolve(res))
                    .catch(e => reject(e));
            });
        });
    }

    static async readOsm(path) {
        return new Promise((resolve, reject) => {
            if (!path) reject(new Error('Cannot find file path'));
            fs.readFile(path, async (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                neatCsv(data)
                    .then(res => resolve(res))
                    .catch(e => reject(e));
            });
        });
    }

    static async writeCsv(data, path) {
        const csvWriter = createCsvWriter({path: path});
        await csvWriter.writeRecords(data);
        return true;


    }

    static async writeJson(data, path){
        const csvWriter = createCsvWriter({path: path});
        await csvWriter.writeRecords(data);
        return true;
    }
}

module.exports = InsightFunc;



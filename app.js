const InsightFunc = require('./src/func/insigt.func');
const DataFunc = require('./src/func/data.func');


const run = async () => {

    //set file name here.
    const input_filename = 'complaints.osm';
    const output_filename = 'report.json';

    const input_path = `./input/${input_filename}`;
    const output_path = `./output/${output_filename}`;
    const data = await InsightFunc.readOsm(input_path);
    // const reportData = DataFunc.performSearch(data);
    await InsightFunc.writeJson(data, output_path);
    console.log(`Report exported at ${output_path}`);


};
run();
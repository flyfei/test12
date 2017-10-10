
const execFile = require('child_process').execFile;
function initOrSend(data) {
	const pyFile = '/app/test12/py/wxManager.py';
	var params = [pyFile];
	if (data) {
		params.push(data);
	}
	const child = execFile('python', params, function (error, stdout, stderr) {
		if (error) {
			throw error;
		}
		console.log('1111', stdout);
	});
}
module.exports = {
	initOrSend
};
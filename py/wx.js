
const execFile = require('child_process').execFile;

module.exports = {
	initOrSend: funtion (data) {
		const pyFile = 'D:\\workspaces\\nodejs\\wxrobotmanager\\py\\wxManager.py';
		var params = [pyFile];
		if (data) {
			params.push(data);
		}
		const child = execFile('python', params, funtion (error, stdout, stderr) {
			if (error) {
				throw error;
			}
			console.log('1111', stdout);
		});
	}
};
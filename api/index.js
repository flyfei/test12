var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var initOrSend = require('../py/wx').initOrSend;

/* batchSend */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/batchsend', function(req, res, next) {
 	console.log('=========');
    if (req.busboy) {
    	console.log('=========1');
    	var data = {};
    	req.busboy.on('file', function (fieldname, file, fileName, encoding, mimeType) {
    		if(mimeType.substr(0,5) == "image"){
	          	var stream = fs.createWriteStream(path.join(__dirname, '../', 'static/upload', new Date().getTime() + path.extname(fileName)));
	          	file.pipe(stream);
	          	console.log('uploading %s -> %s', fileName, stream.path);
	          	console.log('mimeType:',mimeType);
	          	if (!data.files) {
	          		data.files = [];
	          	}
	          	data.files.push({
	            	name: fileName,
	            	path: '@img@' + stream.path
	          	});
        	}
      	}).on('field', function(key, value, keyTruncated, valueTruncated) {//处理其他非文件字段
	        console.log('key"', key);
	        console.log('value', value);
	        if (!data.texts) {
	        	data.texts = [];
	        }
	        if (key === 'text') {
				data.texts.push('@msg@' + value);
	        }
      	}).on('finish', function() {
         	console.log('finish----');
         	if ((data.files && data.files.length >= 1) || (data.texts && data.texts.length >= 1)) {
         		// rbEventEmitter.emit('LOCAL_FWD', JSON.stringify(data));
         		var dataa = '';
         		if (data.files) {
         			for (var i = 0; i < data.files.length; i++) {
         				dataa += (dataa ? (' ' + data.files[i]) : data.files[i]);
         			}
         		}
         		if (data.texts) {
         			for (var i = 0; i < data.texts.length; i++) {
         				dataa += (dataa ? (' ' + data.texts[i]) : data.texts[i]);
         			}
         		}
         		console.log(dataa);
         		initOrSend(dataa);
            	res.send({
	              	status: 'true',
	              	msg: '已经开始群发流程....'
            	})
         	} else {
	            res.send({
	            	status: 'false',
	            	msg: '没有发现数据'
	            })
         	}
      	})
		req.pipe(req.busboy)
	} else {
		console.log('uploadFile - busboy undefined.')
	    res.status(502)
	}
});

module.exports = router;

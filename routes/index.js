var express = require('express');
var _busboy = require('busboy');
var router = express.Router();
var inspect = require('util').inspect;
var path=require('path');
var fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/a',function(req,res,next){
    res.render('uploadfile',{title:'aaaa'});
})

router.post('/aa',function(req,res,next){
if(!/multipart\/form-data/i.test(req.headers['content-type'])){
		return res.end('wrong');
	}
    var filelength=req.header("content-length");
    var busboy = new _busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.pipe( fs.createWriteStream(path.join(__dirname,filename)));
        file.on('data', function(data) {
        });
        file.on('end', function() {
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
    });
    req.pipe(busboy);

})

router.get('/load',function(req,res,next){
    res.render('loading',{title:'l'});
})

module.exports = router;

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const colors = require('colors');

//;============================================================

const rootDir = process.cwd();


const server = http.createServer((req, res) => {

	let filePath = path.join(rootDir, 'public', req.url === '/' ? 'index.html' : req.url);
	const ext = path.extname(filePath);
	let contentType = '';


	switch (ext) {
		case '':
				res.setHeader("Content-type", 'text/html');
				return fs.readdir(rootDir, (err, data) => {
					data.forEach(file => {
						if (!path.extname(file)) {
							res.write('(*)' + file.toUpperCase() + '<br>');
						} else {
							res.write(file + '<br>');
						}
					})
					res.end();
				});
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		default:
			contentType = 'text/html';
	}


	if (!ext) {
		filePath += '.html';
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
				if (err) {
					res.writeHead(500, 'Not Found', {
						'Content-type': contentType
					});
					res.end('Error');
				} else {
					res.writeHead(200, 'Page was loaded', {
						'Content-type': contentType
					});
					res.end(data);
				}
			});
		} else {
			res.writeHead(200, 'Page was loaded', {
				'Content-type': contentType
			});
			res.end(content);
		}
	});

});


//;===========< SERVER START >=============================================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(colors.bgGreen.black(`Server was started on port: ${PORT}`));
});

//;===========</ SERVER END >=============================================================
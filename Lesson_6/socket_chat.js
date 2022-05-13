const socket = require('socket.io');
const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');



//;==============<SOCKET ON THE SERVER SIDE>==========================

const myServer = http.createServer((req, res) => {
	const indexPath = path.join(__dirname, 'index.html');
	const readStream = fs.createReadStream(indexPath);
	readStream.pipe(res);
});

const io = socket(myServer);

//;=== CONNECTION ====================================================

io.on('connection', (socket) => {
	//console.log(colors.bgYellow.black('Client from Server Side was connected'), colors.bgWhite.black(client)); //;_информация о клиенте

	socket.on('newUser', (newUser) => { //;_Подписываемся только на события, связанные с клиентом, название события должно соответствовать, как мы назвали событие, которое эмитим (emit) на сервере
		console.log(colors.bgMagenta.black('Данные о клиенте: ', newUser));

		const serverUserData = {
			nickname: newUser.nickname.split('').join(''),
			message: newUser.message.split('').join(''),
			incomeMsg: 'Присоединился к чату'
		};

		socket.broadcast.emit('serverMsg', serverUserData);
		socket.emit('serverMsg', serverUserData);

		//io.emit('serverMsg', serverUserData);


		//;=== DISCONNECTION ====================================================

	});

	socket.on('welcome', (userAll) => {

		socket.broadcast.emit('total', userAll);
		//socket.emit('total', userAll);
	});

	socket.on('off', (user) => {
		const msgOff = {
			nickname: user,
			message: 'Покинул чат'
		};
		socket.disconnect();

		socket.broadcast.emit('serverOff', msgOff);
		socket.emit('serverOff', msgOff);

		//io.emit('serverOff', msgOff);

	});


});


const PORT = process.env.PORT || 3000;

myServer.listen(PORT, () => {
	console.log(colors.bgGreen.black(`Server is started on port: ${PORT}`));
});
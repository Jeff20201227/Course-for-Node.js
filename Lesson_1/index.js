const colors = require('colors/safe');


const elColors = {
	green: 0,
	yellow: 1,
	red: 2,
}

let currentColor = elColors.green;

const changeColor = () => {
	currentColor++;
	if (currentColor > elColors.red) {
		currentColor = elColors.green;
	}
}

const nums = process.argv.slice(2);
let [num1, num2] = [nums[0], nums[1]];


if (num2 === undefined) {
	num2 = num1;
	num1 = num1 - num1;
}

function isNotNumber(arg1, arg2) {
	if (isNaN(arg1)) {
		console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение начала диапазона - не число!"));
		return false;
	} else if (isNaN(arg2)) {
		console.log(colors.bgYellow.red.bold("Ошибка ввода! Указанное значение конца диапазона - не число!"));
		return false;
	}
	return true;
}

function primeNums(arg1, arg2) {

	if (isNotNumber(arg1, arg2) == false) {
		return;
	}

	let i = +num1;
	let endNum = +num2;
	const primeArr = [];

	for (; i <= endNum; i++) {
		let isPrime = true;
		if (i > 2 && i % 2 != 0) {
			for (let j = 3; j * j <= i; j = j + 2) {
				if (i % j == 0) {
					isPrime = false;
					break;
				}
			}
		} else if (i != 2) {
			isPrime = false
		};
		if (isPrime == true) {

			switch (currentColor) {
				case elColors.green:
					primeArr.push(i + ' - зелёный');
					console.log(colors.bgGreen(' ') + colors.green(' ' + i));
					break;

				case elColors.yellow:
					primeArr.push(i + ' - жёлтый');
					console.log(colors.bgYellow(' ') + colors.yellow(' ' + i));
					break;

				case elColors.red:
					primeArr.push(i + ' - красный');
					console.log(colors.bgRed(' ') + colors.red(' ' + i));
					break;
			}

			changeColor();

		}
	}
	return primeArr;
}

function noPrimeNum(primeNum) {

	const arr = primeNums(num1, num2);
	if (arr.length == 0) {
		console.log(colors.bgRed.bold("Простые числа в указанном диапазоне отсутствуют..."));
	}

	console.log(arr);
}

noPrimeNum();
var readline = require('readline');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRandomIntInclusive(min, max) {
    // генерация рандомного числа из заданного интервала
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function helloStr() {
    // приветственное сообщение
    console.log('Я загадал число, попробуй угадать! 1 или 2? (q - выход, s - статистика): ');
}

function statInfo(fileLog) {
    console.log('-= Статистика =-');
    fs.readFile(fileLog, 'utf8', function (err, data) {
        if (err) {
            console.log('Не найден файл логов или он пустой.');
            return;
        }
        var arr = data.split('\n');
        var parties = arr.length - 1;
        var win = 0, loss = 0, maxWin = 0, maxLoss = 0, i = 0, j = 0;

        for (var key in arr) {
            if (arr[key] === 'WIN') {
                win++;
                i++;
            } else {
                if (i >= maxWin) {
                    maxWin = i;
                    i = 0;
                }
                i = 0;
            }
            if (arr[key] === 'LOSS') {
                loss++;
                j++;
            } else {
                if (j >= maxLoss) {
                    maxLoss = j;
                    j = 0;
                }
                j = 0;
            }
        }
        console.log('Сыграно партий: ' + parties);
        console.log('Выигранных партий ' + win);
        console.log('Проигранных партий ' + loss);
        console.log('Соотношение партий: ' + win + ':' + loss);
        console.log("Максимальне число побед подряд = " + maxWin);
        console.log("Максимальне число проигрышей подряд = " + maxLoss);
    });
}

if (argv.help) {
    console.log('Введите имя файла для логов (по-умолчанию log.txt)');
    process.exit();
} else {
    if (argv._[0]) {
        logFile = './lesson2/' + argv._[0];
    } else {
        var logFile = './lesson2/log.txt';
    }

    helloStr();

    rl.on('line', function (answer) {
        var compDigit = getRandomIntInclusive(1, 2);
        var resultGame;
        if (answer === 'q') {
            // выход
            this.close();
        } else if (answer === 's') {
            // статистика
            statInfo(logFile);
        } else {
            // игра
            if (parseInt(answer) === compDigit) {
                console.log('Угадал! ^_^');
                resultGame = 'WIN\n'
            } else {
                console.log('А вот и нет! :-Р Это число: ' + compDigit);
                resultGame = 'LOSS\n'
            }
            // записываем лог
            if (fs.existsSync(logFile)) {
                fs.appendFile(logFile, resultGame, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                fs.writeFile(logFile, resultGame, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            helloStr();
        }
    });
}

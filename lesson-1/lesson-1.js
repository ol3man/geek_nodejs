const chalk = require('chalk');
const beeper = require('beeper');

const warn = chalk.bold.red;
const mess = chalk.keyword('blue');

const name = 'Player!';
console.log(chalk.green('Hello %s'), name);
console.log(warn('Warning!'));
console.log(mess('You will listen to the sound!'));

(async async => {
    // "*" - beep; "-" - pause
    await beeper('*-*-**--**-*-***');
})();

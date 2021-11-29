
const action = require('./action');
const figlet = require('figlet');
const chalk = require('chalk');

figlet.text('Zendesk Ticket Viewer App', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.clear();
    console.log(chalk.greenBright(data));
    action.app();
});

























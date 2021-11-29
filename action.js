const axios = require('axios'),
    config = require('./config'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    Table = require('cli-table');




const listTickets = (url) => {
    let table = new Table({
        head: [chalk.bold.blue('Ticket ID'), chalk.bold.blue('Subject'), chalk.bold.blue('Status')]
        , colWidths: [15, 50, 15]
    });

    axios.get(url,
        {
            headers:
            {
                'Authorization': `Basic ${config.token}`
            }
        })
        .then((res) => {
            // return 'List Tickets';
            const output = res.data;
            Object.values(output.tickets).forEach(val => {
                let tempTable = [val.id, val.subject, val.status]
                table.push(tempTable);
            }
            );
            console.log(table.toString());
            const nextPageUrl = output.next_page;
            if (nextPageUrl != null) {
                nextPage(nextPageUrl);
            }
            else
                console.log(chalk.bold.greenBright("End of tickets"));


        })
        .catch((error) => {
            if (error) {
                switch (error.response.status) {
                    case 403:
                        console.log(chalk.bold.redBright("The user or the account doesn’t have the required permissions to use the API."));
                        break;
                    case 429:
                        console.log(chalk.redBright("The App usage limit has been exceeded"));
                        break;
                    case 503:
                        console.log(chalk.redBright("The Zendesk API is currently unavailable, please retry after some time"));
                        break;
                    default:
                        console.log(chalk.redBright(error.response.statusText));
                }
            }
        })
}

const showTicket = (ticketId) => {

    axios.get(config.showTicketUrl + ticketId, {
        headers: {
            'Authorization': `Basic ${config.token}`
        }
    })
        .then((res) => {
            // return "Valid Ticket ID";
            const output = res.data;
            console.log(chalk.bold.green("Subject: ") + output.ticket.subject + '\n' + chalk.bold.green('Description: ') + output.ticket.description);


        })
        .catch((error) => {
            // return error.response.statusText;
            if (error) {
                switch (error.response.status) {
                    case 403:
                        console.log(chalk.bold.redBright("The user or the account doesn’t have the required permissions to use the API."));
                        break;
                    case 404:
                        console.log(chalk.bold.redBright("Invalid Ticket ID"));
                        break;
                    case 429:
                        console.log(chalk.redBright("The App usage limit has been exceeded"));
                        break;
                    case 503:
                        console.log(chalk.redBright("The Zendesk API is currently unavailable, please retry after some time"));
                        break;
                    default:
                        console.log(chalk.redBright(error.response.statusText));

                }

            }


        })
}

const nextPage = (url) => {
    inquirer
        .prompt([
            {
                name: "option",
                type: "list",
                message: "choose an option",
                choices: ["Next Page", "Exit App"],
            },

        ])
        .then((answer) => {
            if (answer.option === 'Next Page') {
                listTickets(url);
            }
            else
                console.log(chalk.bold.blueBright("Bye Bye!!"))
        });

}

const app = () => {
    inquirer
        .prompt([
            {
                name: "option",
                type: "list",
                message: "\n Choose your option:",
                choices: ["List all Tickets", "View a ticket", "Exit App"],
            },

        ])
        .then((answer) => {
            if (answer.option === 'List all Tickets') {
                listTickets(config.listTicketsUrl);
            }
            else if (answer.option === 'View a ticket') {
                inquirer
                    .prompt([
                        {
                            name: "ticket_number",
                            type: "number",
                            message: "Enter the Ticket ID",

                        },

                    ])
                    .then((answer) => {
                        showTicket(answer.ticket_number);
                    });
            }
            else if (answer.option === 'Exit App')
                console.log(chalk.bold.blueBright("Bye Bye!!"))
        });


}



module.exports = {
    app: app,
    listTickets: listTickets,
    showTicket: showTicket,

}
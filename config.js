const subdomain = 'zccassessment';
const username = 'anshul2pathak@gmail.com';
const password = 'I9deGDkJlV3FsyoVLo95EvE9bZ5C37IBbJ0lQIG3';

const tempToken = username + '/token:' + password;
const token = Buffer.from(tempToken).toString('base64');
const listTicketsUrl = 'https://zccassessment.zendesk.com/api/v2/tickets?per_page=25';
const showTicketUrl = 'https://' + subdomain + '.zendesk.com/api/v2/tickets/'

module.exports = {
    token: token,
    listTicketsUrl: listTicketsUrl,
    showTicketUrl: showTicketUrl
}
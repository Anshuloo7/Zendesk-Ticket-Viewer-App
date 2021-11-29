const action = require('./action');

function it(desc, fn) {
    try {
        fn();
        console.log('Test Case Passed for' + desc);
    } catch (error) {
        console.log('\n');
        console.log('Test Case Failed for' + desc);
        console.error(error);
    }
}

function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}


// Test1: Testing that the showTicket function throws an error for an invalid ticket id
it("showTicket throws an error for invalid ticket id", function () {
    assert(action.showTicket(500) === 'Invalid Ticket ID');
});

//Test2: Testing that the showTicket function does not throws an error for a valid ticket id
it("showTicket works for a valid ticket id", function () {
    assert(action.showTicket(1) === 'Invalid Ticket ID');
});


//Test3: Testing the working of listTickets function
it("list Ticket should work", function () {
    assert(action.listTickets());
});





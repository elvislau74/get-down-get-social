// Create data for User model
const users = [
    {username: 'Bill', email: 'bnye@test.com'},
    {username: 'James', email: 'jbond@test.com'},
    {username: 'Neil', email: 'ndtyson@test.com'},
    {username: 'Elvis', email: 'epresley@test.com'},
    {username: 'Michael', email: 'mjackson@test.com'},
];

// Create data for Thought model
const thoughts = [
    {thoughtText: `I can't help falling in love with you.`, username: 'Elvis'},
    {thoughtText: 'Watch my T.V. show, Cosmos: A Spacetime Oddyssey', username: 'Neil'},
    {thoughtText: 'Billy Jean is not my lover.', username: 'Michael'},
    {thoughtText: `I'm Bill Nye the Science Guy!`, username: 'Bill'},
    {thoughtText: `The name's Bond. James Bond.`, username: 'James'}
];

// Export data for users and thoughts
module.exports = { thoughts, users };
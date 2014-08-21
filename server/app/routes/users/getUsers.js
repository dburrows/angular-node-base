module.exports = getUsers;

function getUsers(req, res) {
  res.send([
    {
      "firstName": "Isaac",
      "lastName": "Newton",
      "email": "isaac@example.com"
    },
    {
      "firstName": "Albert",
      "lastName": "Einstein",
      "email": "albert@example.com"
    }
  ]);
}

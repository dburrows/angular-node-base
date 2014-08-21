module.exports = getUser;

function getUser(req, res) {
  res.send({
    "firstName": "Isaac",
    "secondName": "Newton",
    "email": "isaac@example.com"
  });
}

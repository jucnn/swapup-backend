//

const Mandatory = {
  user: ["givenName", "password", "telephone", "description", "address", "email"],
  login: ["password", "email"],
  object: ["title", "description", "state", "brand", "price", "donationPercentage"]
};

module.exports = Mandatory;

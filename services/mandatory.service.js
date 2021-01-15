//

const Mandatory = {
  user: ["givenName", "familyName", "password", "email"],
  login: ["password", "email"],
  object: ["title", "description", "state", "brand", "price", "donationPercentage"]
};

module.exports = Mandatory;

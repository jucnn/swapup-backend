//

const Mandatory = {
  user: ["username", "password", "telephone", "description", "address", "email"],
  login: ["password", "email"],
  object: ["title", "description", "category", "state", "brand", "price", "donationPercentage", "association"],
  swap: ["objectWanted", "objectToExchange", "swap_sender", "swap_receiver"]
};

module.exports = Mandatory;

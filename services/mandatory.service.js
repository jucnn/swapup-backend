//

const Mandatory = {
  user: ["username", "password", "email"],
  login: ["password", "email"],
  object: ["title", "description", "image", "category", "state", "brand", "price", "donationPercentage", "association"],
  swap: ["objectWanted", "objectToExchange", "swap_sender", "swap_receiver"]
};

module.exports = Mandatory;

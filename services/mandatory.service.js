//

const Mandatory = {
  user: ["username", "password", "email"],
  login: ["password", "email"],
  object: ["title", "description", "image", "category", "state", "brand", "price", "association"],
  swap: ["objectWanted", "objectToExchange", "swap_sender", "swap_receiver"],
  association: ["label", "slug", "description", "type"],
  brand: ["label", "slug"],
  category: ["label", "slug"],
  state: ["label", "slug"],

};

module.exports = Mandatory;

import { Seeder } from "mongoose-data-seed";
import { Object } from "../models";

const data = [
  {
    "title": "Table",
    "description": "Table Ikea 145cm x 250cm",
    "image": null,
    "state": "Etat satisfaisant",
    "brand": "Ikea",
    "category": "Ameublement",
    "price": 50,
    "association": "Alternatiba",
    "seller": "6041f46dc44e2c6660330aec"
  },
  {
    "title": "Sac à dos",
    "description": "Sac à dos renforcé dans le dos de couleur noir avec des bandes réfléchissantes. Encore avec étiquette",
    "image": null,
    "state": "Neuf",
    "brand": "Nike",
    "category": "Accessoires de modes",
    "price": 20,
    "association": "Le Refuge",
    "seller": "60424db313dbd467b87e4a41"
  },
  {
    "title": "Gourde",
    "description": "Gourde en inox. Pas isotherme. Quelques rayures",
    "image": null,
    "state": "Etat satisfaisant",
    "brand": null,
    "category": "Cuisine & Maison",
    "price": 5,
    "association": "Le Refuge",
    "seller": "604e45e47ff8029df806cad2"
  },
  {
    "title": "Cadre",
    "description": "Cadre noir - 30x40cm. L'affiche peut être donnée avec le cadre.",
    "image": null,
    "state": "Etat satisfaisant",
    "brand": null,
    "category": "Décoration & Art",
    "price": 8,
    "association": "Sidaction",
    "seller": "604e45e47ff8029df806cad2"
  },
];

class ObjectsSeeder extends Seeder {
  async shouldRun() {
    return Object.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Object.create(data);
  }
}

export default ObjectsSeeder;

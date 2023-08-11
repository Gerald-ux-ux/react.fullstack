import groceries from "../../assets/categories/Groceries.jpg";
import household from "../../assets/categories/Household.jpg";
import Personalcare from "../../assets/categories/Personalcare.jpg";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: "ef1f52f6-4e35-4cd7-ad4a-0a9b52de894f",
    categoryName: "groceries",
    description:
      " From farm-fresh fruits and vegetables, succulent cuts of meat, and dairy products brimming with goodness to pantry staples like cereals, grains, and spices, our Groceries aisle ensures you have everything you need for delectable meals and wholesome cooking experiences.",
    categoryImg: groceries,
  },
  {
    _id: "937d27a0-51b7-4005-bb04-4f5f111eac90",
    categoryName: "household and homecare",
    description:
      "Discover laundry detergents that make washing a breeze and paper products that combine practicality with comfort.",
    categoryImg: household,
  },
  {
    _id: "1164f45b-1659-4631-88d7-47325bb21eff",
    categoryName: "haircare wonders",
    description:
      " Step into a world of self-care where you can find an exquisite array of skincare elixirs, haircare wonders, and bath luxuries designed to revitalize and rejuvenate.",
    categoryImg: Personalcare,
  },
];

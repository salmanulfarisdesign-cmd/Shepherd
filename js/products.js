// ============================================
// SHEPHERD PRODUCT LIST
// This is the ONLY file you edit to manage products.
//
// ADD A PRODUCT:    copy one block, give it a new id, change the details.
// REMOVE A PRODUCT: delete its block (from "{" to "},").
// PRICES:          price = selling price, mrp = the crossed-out original price
//                   (numbers only, no ₹ sign, no commas). The discount percentage
//                   is worked out automatically. mrp is optional. If price is null
//                   the site shows "Ask for price" and it is agreed on WhatsApp.
//
// Photos:
//   image   the cover photo. It is the first photo on the product card
//           and in the pop-up. Square photos look best.
//   images  the other photos. They appear in the pop-up carousel, in order.
//           Put the files in images/products/<folder>/ and list them here.
//
// Other fields:
//   id           a unique number (never reuse an old id)
//   name         product name
//   category     one of the keys in config.js (wallets, belts, handbags, watches)
//   description  one or two sentences shown in the pop-up
//   details      short list of facts shown in the pop-up
//   inStock      optional: set to false to show "Sold out" and block ordering
//   featured     true = also shown on the home page (keep this to about 4 products)
//
// Product 4 currently uses a plain photo as its cover. To change it, replace the file
// images/products/p04/cover.jpg with a better square photo (same file name).
// ============================================

const PRODUCTS = [

  {
    id: 1,
    name: "Deposh Premium Wallet",
    category: "wallets",
    price: 650,
    mrp: 950,
    image: "images/products/p01/cover.jpg",
    images: [
      "images/products/p01/2.jpg",
      "images/products/p01/3.jpg",
      "images/products/p01/4.jpg",
      "images/products/p01/5.jpg"
    ],
    description: "A classic bifold wallet with an embossed Deposh logo and neat stitched edges. Comes in a black gift box.",
    details: ["Brand: Deposh", "Colours: black, navy, dark brown, brown", "Comes in a gift box"],
    featured: true
  },

  {
    id: 2,
    name: "Deposh Wallet",
    category: "wallets",
    price: 550,
    mrp: 750,
    image: "images/products/p02/cover.jpg",
    images: [
      "images/products/p02/2.jpg",
      "images/products/p02/3.jpg",
      "images/products/p02/4.jpg"
    ],
    description: "A compact vertical wallet with a snap-button tab closure and an embossed Deposh logo. Comes in a gift box.",
    details: ["Brand: Deposh", "Colours: black, charcoal, brown", "Snap-button tab closure", "Comes in a gift box"],
    featured: false
  },

  {
    id: 3,
    name: "Gazzel Card Purse",
    category: "wallets",
    price: 500,
    mrp: 800,
    image: "images/products/p03/cover.jpg",
    images: [
      "images/products/p03/2.jpg",
      "images/products/p03/3.jpg",
      "images/products/p03/4.jpg"
    ],
    description: "A slim wallet with an embossed Gazzel logo and several card slots inside. Easy to carry in a pocket.",
    details: ["Brand: Gazzel", "Colours: dark brown, tan, black, navy", "Multiple card slots", "Slim profile"],
    featured: false
  },

  {
    id: 4,
    name: "Gazzel Card Holder",
    category: "wallets",
    price: 350,
    mrp: 500,
    image: "images/products/p04/cover.jpg",
    images: [
      "images/products/p04/2.jpg",
      "images/products/p04/3.jpg",
      "images/products/p04/4.jpg",
      "images/products/p04/5.jpg",
      "images/products/p04/6.jpg",
      "images/products/p04/7.jpg"
    ],
    description: "A compact card holder with a metal snap-button closure and angled card slots inside. Slim enough for any pocket.",
    details: ["Brand: Gazzel", "Colours: tan, black, dark brown, navy", "Snap-button closure", "Multiple card slots"],
    featured: false
  },

  {
    id: 5,
    name: "Gazzel Bifold Wallet",
    category: "wallets",
    price: null,
    image: "images/products/p05/cover.jpg",
    images: [
      "images/products/p05/2.jpg",
      "images/products/p05/3.jpg",
      "images/products/p05/4.jpg",
      "images/products/p05/5.jpg"
    ],
    description: "A bifold wallet with an embossed Gazzel diamond logo and stitched edges. Comes in a black gift box.",
    details: ["Brand: Gazzel", "Colours: dark brown, maroon, black, tan", "Comes in a gift box"],
    featured: false
  },

  {
    id: 6,
    name: "Deposh Wrinkle Free 35 mm Belt",
    category: "belts",
    price: 400,
    mrp: 700,
    image: "images/products/p06/cover.jpg",
    images: [
      "images/products/p06/2.jpg",
      "images/products/p06/3.jpg",
      "images/products/p06/4.jpg"
    ],
    description: "A black wrinkle-free belt with a brushed metal pin buckle and fine textured detailing on the frame.",
    details: ["Brand: Deposh", "Colour: black", "Width: 35 mm", "Waist sizes: ask on WhatsApp"],
    featured: true
  },

  {
    id: 7,
    name: "Deposh Super Shine 40 mm Belt",
    category: "belts",
    price: 500,
    mrp: 900,
    image: "images/products/p07/cover.jpg",
    images: [
      "images/products/p07/2.jpg",
      "images/products/p07/3.jpg",
      "images/products/p07/4.jpg"
    ],
    description: "A black super-shine belt with a clean brushed metal pin buckle and a small round emblem. Works with formal and casual wear.",
    details: ["Brand: Deposh", "Colour: black", "Width: 40 mm", "Waist sizes: ask on WhatsApp"],
    featured: false
  },

  {
    id: 8,
    name: "Fozy Handbag",
    category: "handbags",
    price: 850,
    mrp: 1200,
    image: "images/products/p08/cover.jpg",
    images: [
      "images/products/p08/2.jpg",
      "images/products/p08/3.jpg",
      "images/products/p08/4.jpg",
      "images/products/p08/5.jpg",
      "images/products/p08/6.jpg"
    ],
    description: "A structured fabric shoulder handbag with a zipped front pocket and a side pocket that holds an umbrella. Matching handles and a small embroidered logo.",
    details: ["Brand: Fogy", "Colours: black, navy, olive, maroon", "Zipped front and side pockets", "Side pocket holds an umbrella"],
    featured: true
  },

  {
    id: 9,
    name: "FOREST Digital Sport Watch, Square",
    category: "watches",
    price: 699,
    mrp: 1100,
    image: "images/products/p09/cover.jpg",
    images: [
      "images/products/p09/2.jpg",
      "images/products/p09/3.jpg",
      "images/products/p09/4.jpg",
      "images/products/p09/5.jpg"
    ],
    description: "A square-cased digital sport watch with a rubber strap and side buttons. Easy to read and light on the wrist.",
    details: ["Brand: FOREST", "Digital display with alarm", "Rubber strap", "Strap colours: ask on WhatsApp"],
    featured: true
  },

  {
    id: 10,
    name: "FOREST Digital Sport Watch, Octagon",
    category: "watches",
    price: 699,
    mrp: 1100,
    image: "images/products/p10/cover.jpg",
    images: [
      "images/products/p10/2.jpg",
      "images/products/p10/3.jpg"
    ],
    description: "An octagon-bezel digital sport watch with a rubber strap and a bold dial. Shown here with a brown strap.",
    details: ["Brand: FOREST", "Digital display with alarm", "Rubber strap", "Other strap colours: ask on WhatsApp"],
    featured: false
  }

];

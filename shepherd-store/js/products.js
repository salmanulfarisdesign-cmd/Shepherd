// ============================================
// SHEPHERD PRODUCT LIST
// This is the ONLY file you edit to manage products.
//
// ADD A PRODUCT:    copy one block, give it a new id, change the details.
// REMOVE A PRODUCT: delete its block (from "{" to "},").
// CHANGE A PRICE:   edit the number. No ₹ sign, no commas.
// CHANGE AN IMAGE:  put the photo in the images folder and update "image".
//
// Fields:
//   id           a unique number (never reuse an old id)
//   name         product name
//   category     one of the keys in config.js (purses, watches, belts, other)
//   price        number only
//   image        path to the main photo, for example "images/purse.jpg"
//   images       optional: extra photos, for example ["images/a.jpg", "images/b.jpg"]
//   description  one or two sentences shown in the product pop-up
//   details      short list of facts shown in the pop-up (material, size, colour ...)
//   inStock      optional: set to false to show "Sold out" and block ordering
//   featured     true = also shown on the home page (keep this to about 4 products)
// ============================================

const PRODUCTS = [

  {
    id: 1,
    name: "Classic Everyday Purse",
    category: "purses",
    price: 499,
    image: "images/purse.jpg",
    description: "A structured handbag with twin top handles and a clean silhouette. Roomy enough for daily essentials.",
    details: ["Colour: Olive green", "Twin top handles", "Gold-tone hardware"],
    featured: true
  },

  {
    id: 2,
    name: "Premium Leather Wallet",
    category: "purses",
    price: 399,
    image: "images/wallet.jpg",
    description: "A slim two-tone wallet with separate card slots. Easy to carry in a pocket or a bag.",
    details: ["Colours: Green with tan", "Multiple card slots", "Slim profile"],
    featured: true
  },

  {
    id: 3,
    name: "Classic Analog Watch",
    category: "watches",
    price: 799,
    image: "images/watch-classic.jpg",
    description: "A clean cream dial with slim hands and a brown strap. Simple enough for every day.",
    details: ["Cream dial", "Brown strap", "Steel-tone case"],
    featured: true
  },

  {
    id: 4,
    name: "Minimal Style Watch",
    category: "watches",
    price: 899,
    image: "images/watch-minimal.jpg",
    description: "A dark green dial with fine markers and a dark brown strap, for a calm, understated look.",
    details: ["Green dial", "Dark brown strap", "Steel-tone case"],
    featured: false
  },

  {
    id: 5,
    name: "Classic Leather Belt",
    category: "belts",
    price: 449,
    image: "images/belt.jpg",
    description: "A tan belt with a brushed metal buckle. Pairs with jeans and formal trousers alike.",
    details: ["Colour: Tan brown", "Brushed metal buckle"],
    featured: true
  },

  {
    id: 6,
    name: "Card Flipper Belt",
    category: "belts",
    price: 599,
    image: "images/belt.jpg",
    description: "A belt with a flip-style buckle, made for easy on and off. Message us for size and colour options.",
    details: ["Flip-style buckle", "Sizes and colours: ask on WhatsApp"],
    featured: false
  },

  {
    id: 7,
    name: "Everyday Accessory",
    category: "other",
    price: 349,
    image: "images/purse.jpg",
    description: "A small everyday carry piece. Message us to see what is in stock right now.",
    details: ["Options vary: ask on WhatsApp"],
    featured: false
  },

  {
    id: 8,
    name: "Premium Card Holder",
    category: "other",
    price: 299,
    image: "images/wallet.jpg",
    description: "A compact card holder that keeps your cards organised and easy to reach.",
    details: ["Compact size", "Multiple card slots"],
    featured: false
  }

];

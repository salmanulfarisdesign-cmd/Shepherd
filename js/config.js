// ============================================
// SHEPHERD STORE SETTINGS
// Change business details, categories and reviews here.
// ============================================

const SITE = {
  brand: "SHEPHERD",

  // Country code + number, without + or spaces.
  // Every WhatsApp button, cart order and product enquiry on the site uses this one number.
  whatsappNumber: "919778134421",

  // How the number is shown to visitors.
  phoneDisplay: "+91 97781 34421",

  instagramUrl: "https://www.instagram.com/shepherdecom/",
  instagramHandle: "@shepherdecom",

  currency: "₹"
};

// The filter buttons are built from this list.
// "key" must match the "category" used in products.js.
const CATEGORIES = [
  { key: "purses",  label: "Purses" },
  { key: "watches", label: "Watches" },
  { key: "belts",   label: "Belts" },
  { key: "other",   label: "Other accessories" }
];

// Customer reviews. Leave the list empty and the reviews section stays hidden.
// Add ONLY genuine reviews, for example:
//   { name: "Aysha", place: "Kochi", text: "Lovely quality, reached in 3 days." }
const REVIEWS = [];

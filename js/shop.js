// ============================================
// SHARED CODE used by every page:
// WhatsApp links, product cards, product pop-up and cart.
// You normally do not need to edit this file.
// ============================================

"use strict";

var CART_KEY = "shepherd-cart-v1";
var MAX_QTY = 10;

// ---------- small helpers ----------

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatPrice(amount) {
  return SITE.currency + Number(amount).toLocaleString("en-IN");
}

function categoryLabel(key) {
  var match = CATEGORIES.find(function (c) { return c.key === key; });
  return match ? match.label : key;
}

function findProduct(id) {
  return PRODUCTS.find(function (p) { return p.id === Number(id); }) || null;
}

function isInStock(product) {
  return product.inStock !== false;
}

function productUrl(product) {
  // Only add a link when the site is live on the web (not opened from a file).
  if (location.protocol.indexOf("http") !== 0) return "";
  return new URL("products.html#product-" + product.id, location.href).href;
}

// ---------- WhatsApp ----------

function whatsappLink(message) {
  return "https://wa.me/" + SITE.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function generalMessage() {
  return "Hello " + SITE.brand + "! I'd like to know more about your collection.";
}

function productMessage(product, qty) {
  qty = qty || 1;
  var lines = [
    "Hello " + SITE.brand + "! I'd like to order this product:",
    "",
    "Product: " + product.name,
    "Quantity: " + qty,
    "Price: " + formatPrice(product.price) + (qty > 1 ? " each" : "")
  ];
  if (qty > 1) lines.push("Total: " + formatPrice(product.price * qty));
  var url = productUrl(product);
  if (url) lines.push("Link: " + url);
  lines.push("", "Please confirm availability and delivery.");
  return lines.join("\n");
}

function cartMessage(name, place) {
  var lines = ["Hello " + SITE.brand + "! I'd like to order:", ""];
  cartLines().forEach(function (line, i) {
    lines.push(
      (i + 1) + ". " + line.product.name + " × " + line.qty +
      " — " + formatPrice(line.product.price * line.qty)
    );
  });
  lines.push("", "Total: " + formatPrice(cartTotal()));
  if (name) lines.push("Name: " + name);
  if (place) lines.push("Delivery location: " + place);
  lines.push("", "Please confirm availability, delivery charges and payment details.");
  return lines.join("\n");
}

// ---------- cart (saved in this browser only) ----------

var cart = loadCart();

function loadCart() {
  try {
    var saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved
      .filter(function (item) {
        var p = item && findProduct(item.id);
        return p && isInStock(p) && Number(item.qty) > 0;
      })
      .map(function (item) {
        return { id: Number(item.id), qty: Math.min(MAX_QTY, Math.floor(Number(item.qty))) };
      });
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    // Private mode or storage full: the cart still works until the page closes.
  }
  updateCartUI();
}

function cartLines() {
  return cart.map(function (item) {
    return { product: findProduct(item.id), qty: item.qty };
  }).filter(function (line) { return line.product; });
}

function cartCount() {
  return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
}

function cartTotal() {
  return cartLines().reduce(function (sum, line) {
    return sum + line.product.price * line.qty;
  }, 0);
}

function addToCart(id, qty) {
  var product = findProduct(id);
  if (!product || !isInStock(product)) return;
  qty = qty || 1;
  var existing = cart.find(function (item) { return item.id === product.id; });
  if (existing) {
    existing.qty = Math.min(MAX_QTY, existing.qty + qty);
  } else {
    cart.push({ id: product.id, qty: Math.min(MAX_QTY, qty) });
  }
  saveCart();
  showToast(product.name + " added to cart");
}

function setQty(id, qty) {
  if (qty < 1) return removeFromCart(id);
  var item = cart.find(function (i) { return i.id === Number(id); });
  if (item) {
    item.qty = Math.min(MAX_QTY, qty);
    saveCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(function (i) { return i.id !== Number(id); });
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

// ---------- product cards ----------

function createProductCard(product) {
  var soldOut = !isInStock(product);
  var card = el("article", "product-card");

  var media = el("button", "card-media");
  media.type = "button";
  media.setAttribute("aria-label", "View details: " + product.name);
  media.addEventListener("click", function () { openProduct(product.id); });

  var image = el("img", "product-image");
  image.src = product.image;
  image.alt = product.name;
  image.width = 900;
  image.height = 900;
  image.loading = "lazy";
  image.decoding = "async";
  media.appendChild(image);
  if (soldOut) media.appendChild(el("span", "badge", "Sold out"));

  var info = el("div", "product-info");
  info.appendChild(el("p", "product-category", categoryLabel(product.category)));

  var name = el("h3", "product-name");
  var nameButton = el("button", "name-link", product.name);
  nameButton.type = "button";
  nameButton.addEventListener("click", function () { openProduct(product.id); });
  name.appendChild(nameButton);
  info.appendChild(name);

  info.appendChild(el("p", "product-price", formatPrice(product.price)));

  var actions = el("div", "card-actions");
  var add = el("button", "btn btn-dark btn-small", soldOut ? "Sold out" : "Add to cart");
  add.type = "button";
  add.disabled = soldOut;
  add.addEventListener("click", function () { addToCart(product.id, 1); });

  var view = el("button", "btn btn-outline btn-small", "Details");
  view.type = "button";
  view.addEventListener("click", function () { openProduct(product.id); });

  actions.append(add, view);
  info.appendChild(actions);

  card.append(media, info);
  return card;
}

function renderProducts(container, list) {
  container.textContent = "";

  if (list.length === 0) {
    var empty = el("p", "empty-message", "No products match your search. Try another word or category.");
    container.appendChild(empty);
    return;
  }

  list.forEach(function (product) {
    container.appendChild(createProductCard(product));
  });
}

// ---------- toast ----------

var toastNode = null;
var toastTimer = null;

function showToast(message) {
  if (!toastNode) {
    toastNode = el("div", "toast");
    toastNode.setAttribute("role", "status");
  }
  // An open pop-up sits above the rest of the page, so the toast must live inside it.
  var parent = document.querySelector("dialog[open]") || document.body;
  if (toastNode.parentNode !== parent) parent.appendChild(toastNode);
  toastNode.textContent = message;
  toastNode.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toastNode.classList.remove("show"); }, 2200);
}

// ---------- product pop-up ----------

var productDialog = null;
var productRefs = {};
var productState = { id: null, qty: 1, pushed: false };

function buildProductDialog() {
  var dialog = el("dialog", "modal");
  dialog.setAttribute("aria-labelledby", "pdName");

  var panel = el("div", "modal-panel");
  var close = el("button", "icon-btn modal-close", "×");
  close.type = "button";
  close.setAttribute("aria-label", "Close product details");
  close.addEventListener("click", function () { dialog.close(); });

  var gallery = el("div", "modal-gallery");
  var mainImage = el("img", "modal-image");
  mainImage.width = 900;
  mainImage.height = 900;
  var thumbs = el("div", "modal-thumbs");
  gallery.append(mainImage, thumbs);

  var info = el("div", "modal-info");
  var category = el("p", "product-category");
  var name = el("h2", "modal-name");
  name.id = "pdName";
  var price = el("p", "modal-price");
  var description = el("p", "modal-description");
  var details = el("ul", "modal-details");

  var qtyRow = el("div", "qty-row");
  qtyRow.appendChild(el("span", "qty-label", "Quantity"));
  var stepper = el("div", "stepper");
  var minus = el("button", "", "−");
  minus.type = "button";
  minus.setAttribute("aria-label", "Decrease quantity");
  var qtyValue = el("output", "", "1");
  qtyValue.setAttribute("aria-live", "polite");
  var plus = el("button", "", "+");
  plus.type = "button";
  plus.setAttribute("aria-label", "Increase quantity");
  stepper.append(minus, qtyValue, plus);
  qtyRow.appendChild(stepper);

  var buttons = el("div", "modal-buttons");
  var order = el("a", "btn btn-wa");
  order.target = "_blank";
  order.rel = "noopener noreferrer";
  order.append(el("span", "icon icon-wa"), document.createTextNode(" Order on WhatsApp"));

  var add = el("button", "btn btn-dark", "Add to cart");
  add.type = "button";
  buttons.append(order, add);

  var note = el("p", "modal-note", "Nothing is charged on this website. We confirm availability, delivery and payment with you on WhatsApp.");

  var share = el("button", "link-button", "Copy link to this product");
  share.type = "button";

  info.append(category, name, price, description, details, qtyRow, buttons, note, share);
  panel.append(close, gallery, info);
  dialog.appendChild(panel);
  document.body.appendChild(dialog);

  function updateQty(next) {
    productState.qty = Math.max(1, Math.min(MAX_QTY, next));
    qtyValue.textContent = String(productState.qty);
    var product = findProduct(productState.id);
    if (product) order.href = whatsappLink(productMessage(product, productState.qty));
  }

  minus.addEventListener("click", function () { updateQty(productState.qty - 1); });
  plus.addEventListener("click", function () { updateQty(productState.qty + 1); });

  add.addEventListener("click", function () {
    addToCart(productState.id, productState.qty);
    dialog.close();
    openCart();
  });

  share.addEventListener("click", function () {
    var product = findProduct(productState.id);
    var url = productUrl(product);
    if (!url) {
      showToast("Link sharing works once the site is online");
      return;
    }
    if (navigator.share) {
      navigator.share({ title: product.name + " — " + SITE.brand, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { showToast("Link copied"); });
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    var wasPushed = productState.pushed;
    productState.pushed = false;
    syncScrollLock();
    if (productIdFromHash() !== null) {
      if (wasPushed) history.back();
      else history.replaceState(null, "", location.pathname + location.search);
    }
  });

  productRefs = {
    mainImage: mainImage, thumbs: thumbs, category: category, name: name,
    price: price, description: description, details: details,
    order: order, add: add, qtyRow: qtyRow, updateQty: updateQty
  };
  return dialog;
}

function fillProductDialog(product) {
  var r = productRefs;
  var soldOut = !isInStock(product);
  var photos = [product.image].concat(product.images || []);

  productState.id = product.id;

  r.mainImage.src = photos[0];
  r.mainImage.alt = product.name;

  r.thumbs.textContent = "";
  if (photos.length > 1) {
    photos.forEach(function (src, i) {
      var thumb = el("button", "thumb" + (i === 0 ? " active" : ""));
      thumb.type = "button";
      thumb.setAttribute("aria-label", "Show photo " + (i + 1));
      var img = el("img");
      img.src = src;
      img.alt = "";
      img.width = 120;
      img.height = 120;
      thumb.appendChild(img);
      thumb.addEventListener("click", function () {
        r.mainImage.src = src;
        r.thumbs.querySelectorAll(".thumb").forEach(function (t) { t.classList.remove("active"); });
        thumb.classList.add("active");
      });
      r.thumbs.appendChild(thumb);
    });
  }

  r.category.textContent = categoryLabel(product.category);
  r.name.textContent = product.name;
  r.price.textContent = formatPrice(product.price);
  r.description.textContent = product.description || "";

  r.details.textContent = "";
  (product.details || []).forEach(function (line) {
    r.details.appendChild(el("li", "", line));
  });
  r.details.hidden = !(product.details && product.details.length);

  r.qtyRow.hidden = soldOut;
  r.add.hidden = soldOut;
  r.add.disabled = soldOut;
  productState.qty = 1;
  r.updateQty(1);

  if (soldOut) {
    r.order.lastChild.textContent = " Ask about restock";
    r.order.href = whatsappLink("Hello " + SITE.brand + "! Will \"" + product.name + "\" be back in stock?");
  } else {
    r.order.lastChild.textContent = " Order on WhatsApp";
  }
}

function productIdFromHash() {
  var match = /^#product-(\d+)$/.exec(location.hash);
  return match ? Number(match[1]) : null;
}

function showProduct(id) {
  var product = findProduct(id);
  if (!product) return;
  if (!productDialog) productDialog = buildProductDialog();
  if (cartDialog && cartDialog.open) cartDialog.close();
  fillProductDialog(product);
  if (!productDialog.open) productDialog.showModal();
  productDialog.querySelector(".modal-panel").scrollTop = 0;
  syncScrollLock();
}

function openProduct(id) {
  if (location.hash === "#product-" + id) {
    showProduct(id);
    return;
  }
  productState.pushed = true;
  location.hash = "product-" + id;   // triggers syncFromHash()
}

function syncFromHash() {
  var id = productIdFromHash();
  if (id !== null && findProduct(id)) {
    showProduct(id);
  } else if (productDialog && productDialog.open) {
    productState.pushed = false;
    productDialog.close();
  }
}

// ---------- cart drawer ----------

var cartDialog = null;
var cartRefs = {};
var pendingFocus = null;   // remembers which button to focus after the cart redraws

function buildCartDialog() {
  var dialog = el("dialog", "drawer");
  dialog.setAttribute("aria-labelledby", "cartTitle");

  var panel = el("div", "drawer-panel");

  var head = el("div", "drawer-head");
  var title = el("h2", "drawer-title", "Your cart");
  title.id = "cartTitle";
  var close = el("button", "icon-btn", "×");
  close.type = "button";
  close.setAttribute("aria-label", "Close cart");
  close.addEventListener("click", function () { dialog.close(); });
  head.append(title, close);

  var body = el("div", "drawer-body");

  var foot = el("div", "drawer-foot");
  var totalRow = el("div", "total-row");
  totalRow.append(el("span", "", "Total"), el("strong", "cart-total"));

  var fields = el("div", "cart-fields");
  var nameLabel = el("label", "field");
  nameLabel.append(el("span", "", "Your name (optional)"));
  var nameInput = el("input");
  nameInput.type = "text";
  nameInput.autocomplete = "name";
  nameInput.maxLength = 60;
  nameLabel.appendChild(nameInput);

  var placeLabel = el("label", "field");
  placeLabel.append(el("span", "", "Delivery location (optional)"));
  var placeInput = el("input");
  placeInput.type = "text";
  placeInput.autocomplete = "address-level2";
  placeInput.maxLength = 80;
  placeInput.placeholder = "Town / city and pincode";
  placeLabel.appendChild(placeInput);
  fields.append(nameLabel, placeLabel);

  var send = el("a", "btn btn-wa btn-block");
  send.target = "_blank";
  send.rel = "noopener noreferrer";
  send.append(el("span", "icon icon-wa"), document.createTextNode(" Send order on WhatsApp"));

  var note = el("p", "modal-note", "Nothing is charged on this website. We confirm availability, delivery charges and payment on WhatsApp.");

  var clear = el("button", "link-button", "Clear cart");
  clear.type = "button";
  clear.addEventListener("click", clearCart);

  foot.append(totalRow, fields, send, note, clear);
  panel.append(head, body, foot);
  dialog.appendChild(panel);
  document.body.appendChild(dialog);

  function refreshLink() {
    send.href = whatsappLink(cartMessage(nameInput.value.trim(), placeInput.value.trim()));
  }
  nameInput.addEventListener("input", refreshLink);
  placeInput.addEventListener("input", refreshLink);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", syncScrollLock);

  cartRefs = { body: body, foot: foot, total: totalRow.querySelector(".cart-total"), refreshLink: refreshLink };
  return dialog;
}

function renderCartDrawer() {
  if (!cartDialog) return;
  var lines = cartLines();
  var body = cartRefs.body;
  body.textContent = "";

  cartRefs.foot.hidden = lines.length === 0;

  if (lines.length === 0) {
    var empty = el("div", "cart-empty");
    empty.append(
      el("p", "cart-empty-title", "Your cart is empty"),
      el("p", "", "Add a few products and send them all to us in one WhatsApp message.")
    );
    var browse = el("a", "btn btn-dark", "Browse products");
    browse.href = "products.html";
    empty.appendChild(browse);
    body.appendChild(empty);
    restoreCartFocus();
    return;
  }

  var list = el("ul", "cart-list");
  lines.forEach(function (line) {
    var product = line.product;
    var item = el("li", "cart-item");

    var thumb = el("img", "cart-thumb");
    thumb.src = product.image;
    thumb.alt = "";
    thumb.width = 72;
    thumb.height = 72;

    var main = el("div", "cart-item-main");
    var nameButton = el("button", "name-link", product.name);
    nameButton.type = "button";
    nameButton.addEventListener("click", function () { openProduct(product.id); });
    main.appendChild(nameButton);
    main.appendChild(el("p", "cart-unit", formatPrice(product.price) + " each"));

    var controls = el("div", "cart-controls");
    var stepper = el("div", "stepper stepper-small");
    var minus = el("button", "", "−");
    minus.type = "button";
    minus.setAttribute("aria-label", "Decrease quantity of " + product.name);
    minus.dataset.id = product.id;
    minus.dataset.role = "minus";
    minus.addEventListener("click", function () {
      pendingFocus = { id: product.id, role: line.qty > 1 ? "minus" : "" };
      setQty(product.id, line.qty - 1);
    });
    var qty = el("output", "", String(line.qty));
    var plus = el("button", "", "+");
    plus.type = "button";
    plus.setAttribute("aria-label", "Increase quantity of " + product.name);
    plus.disabled = line.qty >= MAX_QTY;
    plus.dataset.id = product.id;
    plus.dataset.role = "plus";
    plus.addEventListener("click", function () {
      pendingFocus = { id: product.id, role: "plus" };
      setQty(product.id, line.qty + 1);
    });
    stepper.append(minus, qty, plus);

    var remove = el("button", "link-button", "Remove");
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove " + product.name + " from cart");
    remove.addEventListener("click", function () {
      pendingFocus = { id: 0, role: "" };
      removeFromCart(product.id);
    });
    controls.append(stepper, remove);

    main.appendChild(controls);

    var lineTotal = el("strong", "cart-line-total", formatPrice(product.price * line.qty));
    item.append(thumb, main, lineTotal);
    list.appendChild(item);
  });
  body.appendChild(list);

  cartRefs.total.textContent = formatPrice(cartTotal());
  cartRefs.refreshLink();
  restoreCartFocus();
}

function restoreCartFocus() {
  if (!pendingFocus || !cartDialog || !cartDialog.open) { pendingFocus = null; return; }
  var target = null;
  if (pendingFocus.role) {
    target = cartDialog.querySelector(
      '[data-id="' + pendingFocus.id + '"][data-role="' + pendingFocus.role + '"]'
    );
    if (target && target.disabled) target = null;
  }
  pendingFocus = null;
  (target || cartDialog.querySelector(".drawer-head .icon-btn")).focus();
}

function openCart() {
  if (!cartDialog) cartDialog = buildCartDialog();
  if (productDialog && productDialog.open) productDialog.close();
  renderCartDrawer();
  if (!cartDialog.open) cartDialog.showModal();
  syncScrollLock();
}

function syncScrollLock() {
  var open = (productDialog && productDialog.open) || (cartDialog && cartDialog.open);
  document.documentElement.classList.toggle("lock", Boolean(open));
}

function updateCartUI() {
  var count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach(function (badge) {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  });
  document.querySelectorAll("[data-open-cart]").forEach(function (button) {
    button.setAttribute("aria-label", count ? "Open cart, " + count + (count === 1 ? " item" : " items") : "Open cart");
  });
  renderCartDrawer();
}

// ---------- search engines: product data for Google ----------

function addProductSchema() {
  if (!document.getElementById("productGrid")) return;
  var data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": PRODUCTS.map(function (p, i) {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "description": p.description || p.name,
          "image": new URL(p.image, location.href).href,
          "category": categoryLabel(p.category),
          "brand": { "@type": "Brand", "name": SITE.brand },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": String(p.price),
            "availability": isInStock(p)
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock"
          }
        }
      };
    })
  };
  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// ---------- page setup (called by home.js and catalog.js) ----------

function setupCommonUI() {
  // Every WhatsApp button and link uses the number in config.js
  document.querySelectorAll(".whatsapp-general").forEach(function (link) {
    link.href = whatsappLink(generalMessage());
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".phone-display").forEach(function (node) {
    node.textContent = SITE.phoneDisplay;
  });

  document.querySelectorAll(".instagram-general").forEach(function (link) {
    link.href = SITE.instagramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".instagram-handle").forEach(function (node) {
    node.textContent = SITE.instagramHandle;
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Cart buttons
  document.querySelectorAll("[data-open-cart]").forEach(function (button) {
    button.addEventListener("click", openCart);
  });
  updateCartUI();

  // Keep the cart in sync across browser tabs
  window.addEventListener("storage", function (event) {
    if (event.key === CART_KEY) {
      cart = loadCart();
      updateCartUI();
    }
  });

  // Mobile menu
  var menuButton = document.getElementById("menuButton");
  var header = document.querySelector(".header");
  if (menuButton && header) {
    menuButton.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Product links like products.html#product-3
  window.addEventListener("hashchange", syncFromHash);
  syncFromHash();

  addProductSchema();
}

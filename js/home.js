// Home page: featured products, category links and (optional) reviews.
// To change which products appear here, set "featured" in products.js.

(function () {
  var grid = document.getElementById("productGrid");
  var featured = PRODUCTS.filter(function (p) { return p.featured; });
  renderProducts(grid, featured.length ? featured : PRODUCTS.slice(0, 4));

  // Category links
  var categoryGrid = document.getElementById("categoryGrid");
  CATEGORIES.forEach(function (category) {
    var count = PRODUCTS.filter(function (p) { return p.category === category.key; }).length;
    if (count === 0) return;
    var link = el("a", "category-link");
    link.href = "products.html?category=" + encodeURIComponent(category.key);
    link.append(
      el("span", "category-name", category.label),
      el("span", "category-count", count + (count === 1 ? " product" : " products"))
    );
    categoryGrid.appendChild(link);
  });

  // Reviews: only shown when REVIEWS in config.js has real entries
  var reviewsSection = document.getElementById("reviews");
  var reviewsGrid = document.getElementById("reviewsGrid");
  if (REVIEWS.length) {
    REVIEWS.forEach(function (review) {
      var card = el("figure", "review-card");
      card.appendChild(el("blockquote", "", "“" + review.text + "”"));
      var caption = el("figcaption");
      caption.appendChild(el("strong", "", review.name));
      if (review.place) caption.appendChild(document.createTextNode(", " + review.place));
      card.appendChild(caption);
      reviewsGrid.appendChild(card);
    });
    reviewsSection.hidden = false;
  }

  setupCommonUI();
})();

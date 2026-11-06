// All products page: every product, with category filters, search and sorting.
// Supports links like products.html?category=watches

(function () {
  var grid = document.getElementById("productGrid");
  var filters = document.getElementById("filters");
  var count = document.getElementById("resultCount");
  var search = document.getElementById("searchInput");
  var sort = document.getElementById("sortSelect");

  var options = [{ key: "all", label: "All" }].concat(CATEGORIES);
  var wanted = new URLSearchParams(window.location.search).get("category");
  var active = options.some(function (o) { return o.key === wanted; }) ? wanted : "all";

  function show() {
    var query = search.value.trim().toLowerCase();

    var list = PRODUCTS.filter(function (p) {
      var inCategory = active === "all" || p.category === active;
      var inSearch = !query ||
        (p.name + " " + (p.description || "") + " " + categoryLabel(p.category))
          .toLowerCase().indexOf(query) !== -1;
      return inCategory && inSearch;
    });

    if (sort.value === "low") {
      list = list.slice().sort(function (a, b) { return a.price - b.price; });
    } else if (sort.value === "high") {
      list = list.slice().sort(function (a, b) { return b.price - a.price; });
    }

    renderProducts(grid, list);
    count.textContent = "Showing " + list.length + (list.length === 1 ? " product" : " products");

    filters.querySelectorAll(".filter-btn").forEach(function (button) {
      var on = button.dataset.category === active;
      button.classList.toggle("active", on);
      button.setAttribute("aria-pressed", String(on));
    });
  }

  options.forEach(function (option) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "filter-btn";
    button.dataset.category = option.key;
    button.textContent = option.label;
    button.addEventListener("click", function () {
      active = option.key;
      show();
    });
    filters.appendChild(button);
  });

  search.addEventListener("input", show);
  sort.addEventListener("change", show);

  show();
  setupCommonUI();
})();

# SHEPHERD store

A fast static website (HTML, CSS, JavaScript). No installation, no database.
Open `index.html` in a browser to preview it.

Customers browse products, open a details pop-up, add items to a cart and
send the whole order to WhatsApp (+91 97781 34421) in one message.
Nothing is charged on the website.

## Folder map

    index.html        Home page
    products.html     All products (filters, search, sorting)
    404.html          "Page not found" page
    css/styles.css    Colours, fonts and layout (colours are at the top)
    js/config.js      WhatsApp number, Instagram, categories, reviews
    js/products.js    THE PRODUCT LIST (edit this to add or remove products)
    js/shop.js        Shared code: cart, product pop-up, WhatsApp links
    js/home.js        Home page code
    js/catalog.js     All products page code
    images/           Logos, hero photo, product photos, icons
    robots.txt, sitemap.xml, _headers   Hosting and Google files

## Before you publish (important)

1. Find and replace `https://YOUR-DOMAIN.com` with the real website address in:
   `index.html`, `products.html`, `404.html`, `sitemap.xml`, `robots.txt`.
   (This makes WhatsApp, Instagram and Google link previews work.)
2. Replace the sample product photos with the client's real product photos.
3. Check every product's name, price, description and details in `js/products.js`.
4. Upload the whole folder to Netlify, Cloudflare Pages or any static host.

## Change the WhatsApp number
Open `js/config.js` and edit `whatsappNumber` (country code, no `+`, no spaces)
and `phoneDisplay`. Also update the number inside the `<noscript>` block at the
bottom of `index.html`, `products.html` and `404.html`, and `"telephone"` in `index.html`.

## Add a product
1. Put the photo in `images/` (square photos look best).
2. Open `js/products.js`, copy any product block, paste it before the final `];`.
3. Give it a new, unused `id`, then change name, category, price, image,
   description and details.
4. Save and refresh. Set `inStock: false` to show "Sold out".

## Remove a product
Delete its whole block in `js/products.js`, from `{` to `},`.

## Choose what shows on the home page
Set `featured: true` on about 4 products.

## Add genuine customer reviews
Add entries to `REVIEWS` in `js/config.js`. While the list is empty the
reviews section stays hidden.

## Change colours
Edit the values at the top of `css/styles.css` (`--saddle`, `--ink`, `--bg` ...).

## How the cart works
The cart is saved in the customer's own browser, so it survives page reloads.
Prices always come from `js/products.js`. Each product has its own link, for
example `products.html#product-3`, which opens its details pop-up directly.

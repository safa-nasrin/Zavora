// DEMO DATA ONLY. Replace with real products after Flipkart approval.
// Use the official affiliate link for each product in "url". Never invent links.
const CATEGORIES = ["Women's Fashion", "Skincare", "Makeup & Beauty", "Hair Care", "Bags & Accessories", "Home & Kitchen"];

const PRODUCTS = [
  { name: "Demo Product 1", cat: "Women's Fashion", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 2", cat: "Skincare", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 3", cat: "Makeup & Beauty", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 4", cat: "Hair Care", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 5", cat: "Bags & Accessories", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 6", cat: "Home & Kitchen", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 7", cat: "Women's Fashion", note: "Sample product for layout preview.", url: "" },
  { name: "Demo Product 8", cat: "Skincare", note: "Sample product for layout preview.", url: "" }
];

function cardHTML(p) {
  const btn = p.url
    ? `<a class="btn" href="${p.url}" target="_blank" rel="sponsored noopener">Shop Now</a>`
    : `<span class="btn off" title="Demo item, no link yet">Shop Now (demo)</span>`;
  return `<article class="card">
    <div class="ph"><span class="tag">Demo</span>Demo image</div>
    <div class="body">
      <span class="cat-name">${p.cat}</span>
      <h3>${p.name}</h3>
      <p class="note">${p.note}</p>
      ${btn}
    </div></article>`;
}

function renderGrid(id, list) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = list.length ? list.map(cardHTML).join("") : "<p>No products found.</p>";
}

function renderCats(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c => `<a class="cat" href="shop.html?cat=${encodeURIComponent(c)}"><h3>${c}</h3></a>`).join("");
}

function initShop() {
  const sel = document.getElementById("catFilter");
  const q = document.getElementById("q");
  if (!sel) return;
  sel.innerHTML = `<option value="">All categories</option>` + CATEGORIES.map(c => `<option>${c}</option>`).join("");
  const params = new URLSearchParams(location.search);
  sel.value = params.get("cat") || "";
  q.value = params.get("q") || "";
  const run = () => {
    const t = q.value.toLowerCase();
    renderGrid("shopGrid", PRODUCTS.filter(p =>
      (!sel.value || p.cat === sel.value) && (!t || (p.name + p.cat).toLowerCase().includes(t))));
  };
  sel.onchange = run; q.oninput = run; run();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCats("catGrid");
  renderGrid("featuredGrid", PRODUCTS.slice(0, 4));
  renderGrid("newGrid", PRODUCTS.slice(4, 8));
  initShop();
  const s = document.getElementById("siteSearch");
  if (s) s.addEventListener("keydown", e => { if (e.key === "Enter") location.href = "shop.html?q=" + encodeURIComponent(s.value); });
});

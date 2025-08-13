// 8. localStorage message (last visit)
(function lastVisit() {
  const el = document.getElementById("visitMessage");
  try {
    const KEY = "discover-last-visit";
    const now = Date.now();
    const last = Number(localStorage.getItem(KEY));
    if (!last) {
      el.textContent = "Welcome! This is your first visit.";
    } else {
      const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));
      el.textContent = days === 0
        ? "Welcome back! You last visited earlier today."
        : `Welcome back! It’s been ${days} day${days>1?"s":""} since your last visit.`;
    }
    localStorage.setItem(KEY, String(now));
  } catch {
    el.textContent = "Welcome!";
  }
})();

// 10–11–12–13. Build 8 cards from JSON; lazy-load images; ensure webp
(async function buildCards(){
  try{
    const res = await fetch("data/discover.json", {cache:"no-store"});
    const items = await res.json();
    const wrap = document.querySelector(".cards");
    const frag = document.createDocumentFragment();

    items.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="imgwrap">
          <img
            src="${item.image}" 
            alt="${item.name}"
            loading="lazy"
            decoding="async"
            width="640" height="400">
        </div>
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="addr">${item.address}</p>
          <p class="desc">${item.description}</p>
        </div>
        <div class="card-content">
          <a class="btn" href="${item.url}" target="_blank" rel="noopener">Learn More</a>
        </div>
      `;
      frag.appendChild(card);
    });

    wrap.appendChild(frag);
  } catch (e){
    console.error(e);
    document.querySelector(".cards").textContent = "Failed to load cards.";
  }
})();

// footer year
document.getElementById("year").textContent = new Date().getFullYear();

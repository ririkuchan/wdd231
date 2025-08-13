import { fetchItems } from './api.js';
import { openModal, closeModal } from './modal.js';

// favorites in localStorage
const FKEY = 'w06-favs';
const getFavs = () => JSON.parse(localStorage.getItem(FKEY) || '[]');
const setFavs = (arr) => localStorage.setItem(FKEY, JSON.stringify(arr));

// DOM refs
const grid = document.getElementById('grid');
const q = document.getElementById('q');
const favToggle = document.getElementById('favToggle');
const countEl = document.getElementById('count');

function updateCount(n) {
  if (countEl) countEl.textContent = `${n} spots`;
}

function render(items) {
  grid.innerHTML = '';

  const favs = new Set(getFavs());
  const term = (q?.value || '').toLowerCase().trim();

  // filter + map（配列メソッド使用）
  const filtered = items
    .filter(it =>
      it.name.toLowerCase().includes(term) ||
      (it.description || '').toLowerCase().includes(term) ||
      (it.area || '').toLowerCase().includes(term)
    )
    .map(it => ({ ...it, favorite: favs.has(Number(it.id)) }));

  const frag = document.createDocumentFragment();

  filtered.forEach(it => {
    const card = document.createElement('article');
    card.className = 'card';
    const priceText = typeof it.price === 'number' ? '$'.repeat(it.price) : it.price;

    card.innerHTML = `
      <img class="card__img"
           src="${it.image}"
           alt="${it.name}"
           loading="lazy"
           decoding="async"
           width="640" height="400">
      <div class="card__body">
        <h3>${it.name}</h3>
        <p>${it.description}</p>
        <p><strong>Area:</strong> ${it.area}</p>
        <p><strong>Price:</strong> ${priceText}</p>
        <div style="display:flex;gap:.5rem;align-items:center">
          <button class="btn btn--more" data-id="${it.id}">Details</button>
          <button class="btn btn--fav" data-id="${it.id}" aria-pressed="${it.favorite}">
            ${it.favorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      </div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
  updateCount(filtered.length);
}

let ALL = [];
(async () => {
  ALL = await fetchItems();
  if (ALL.length < 15) console.warn('Need 15+ items for rubric');
  render(ALL);
})();

// search
q?.addEventListener('input', () => render(ALL));

// show favorites toggle
favToggle?.addEventListener('click', () => {
  const isPressed = favToggle.getAttribute('aria-pressed') === 'true';
  const next = !isPressed;
  favToggle.setAttribute('aria-pressed', String(next));

  const favs = new Set(getFavs());
  const view = next ? ALL.filter(it => favs.has(Number(it.id))) : ALL;
  render(view);
});

// card buttons: details / favorite
grid?.addEventListener('click', (e) => {
  const moreBtn = e.target.closest('.btn--more');
  const favBtn  = e.target.closest('.btn--fav');

  if (moreBtn) {
    const id = Number(moreBtn.dataset.id);
    const it = ALL.find(x => Number(x.id) === id);
    if (it) openModal(it);
    return;
  }

  if (favBtn) {
    const id = Number(favBtn.dataset.id);
    const favs = new Set(getFavs());
    favs.has(id) ? favs.delete(id) : favs.add(id);
    setFavs([...favs]);
    // 再描画（現在のビューに合わせるため、検索語を維持）
    render(ALL);
  }
});

// modal close handlers
document.querySelector('.modal__close')?.addEventListener('click', closeModal);
document.getElementById('modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

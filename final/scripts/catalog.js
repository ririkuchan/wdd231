import { fetchItems } from './api.js';
import { openModal, closeModal } from './modal.js';

// favorites in localStorage
const FKEY = 'w06-favs';
const getFavs = () => JSON.parse(localStorage.getItem(FKEY) || '[]');
const setFavs = (arr) => localStorage.setItem(FKEY, JSON.stringify(arr));

const grid = document.getElementById('grid');
const q = document.getElementById('q');
const favToggle = document.getElementById('favToggle');

function render(items) {
  grid.innerHTML = '';
  const favs = new Set(getFavs());
  // map + filter （配列メソッド使用）
  const term = (q.value || '').toLowerCase().trim();
  const filtered = items
    .filter(it => it.name.toLowerCase().includes(term))
    .map(it => ({ ...it, favorite: favs.has(it.id) }));

  const frag = document.createDocumentFragment();
  filtered.forEach(it => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${it.image}" alt="${it.name}" loading="lazy" decoding="async" width="640" height="400">
      <div class="card__body">
        <h3>${it.name}</h3>
        <p>${it.description}</p>
        <p><strong>Area:</strong> ${it.area}</p>
        <p><strong>Price:</strong> ${it.price}</p>
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
}

let ALL = [];
(async () => {
  ALL = await fetchItems();
  // 15件以上あるかチェック（要件）
  if (ALL.length < 15) console.warn('Need 15+ items for rubric');
  render(ALL);
})();

q?.addEventListener('input', () => render(ALL));

favToggle?.addEventListener('click', () => {
  const state = favToggle.getAttribute('aria-pressed') === 'true';
  favToggle.setAttribute('aria-pressed', String(!state));
  const favs = new Set(getFavs());
  const view = !state ? ALL.filter(it => favs.has(it.id)) : ALL;
  render(view);
});

grid?.addEventListener('click', (e) => {
  const moreBtn = e.target.closest('.btn--more');
  const favBtn = e.target.closest('.btn--fav');
  if (moreBtn) {
    const id = Number(moreBtn.dataset.id);
    const it = ALL.find(x => x.id === id);
    if (it) openModal(it);
  }
  if (favBtn) {
    const id = Number(favBtn.dataset.id);
    const favs = new Set(getFavs());
    favs.has(id) ? favs.delete(id) : favs.add(id);
    setFavs([...favs]);
    render(ALL);
  }
});

// modal close handlers
document.querySelector('.modal__close')?.addEventListener('click', closeModal);
document.getElementById('modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

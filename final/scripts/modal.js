export function openModal({ name, description, image, area, price }) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.querySelector('#modalTitle').textContent = name;
  const img = modal.querySelector('#modalImg');
  img.src = image; img.alt = name; img.loading = 'lazy'; img.decoding = 'async';
  modal.querySelector('#modalDesc').textContent = description;
  modal.querySelector('#modalArea').textContent = area;
  modal.querySelector('#modalPrice').textContent = price;
  modal.classList.remove('hidden');
  modal.querySelector('.modal__close').focus();
}
export function closeModal() {
  document.getElementById('modal')?.classList.add('hidden');
}

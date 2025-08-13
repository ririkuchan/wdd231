try {
  const name = document.querySelector('[name="name"]');
  const email = document.querySelector('[name="email"]');
  // restore
  name.value = localStorage.getItem('w06-name') || '';
  email.value = localStorage.getItem('w06-email') || '';
  // save
  name.addEventListener('input', () => localStorage.setItem('w06-name', name.value));
  email.addEventListener('input', () => localStorage.setItem('w06-email', email.value));
} catch {}

// Intentional minimal JS for checklist persistence
const key = 'john-doe-care-plan-checks';
const boxes = [...document.querySelectorAll('.checklist input[type="checkbox"]')];
try {
  const saved = JSON.parse(localStorage.getItem(key) || '[]');
  boxes.forEach((b, i) => b.checked = !!saved[i]);
} catch {}
boxes.forEach((b, i) => b.addEventListener('change', () => {
  const state = boxes.map(x => x.checked);
  localStorage.setItem(key, JSON.stringify(state));
}));

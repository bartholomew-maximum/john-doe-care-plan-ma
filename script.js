const careKey = 'john-doe-v2-checks';
const medKey = 'john-doe-v2-meds';

const boxes = [...document.querySelectorAll('.checklist input[type="checkbox"]')];
try {
  const saved = JSON.parse(localStorage.getItem(careKey) || '[]');
  boxes.forEach((b, i) => b.checked = !!saved[i]);
} catch {}
boxes.forEach(() => {
  document.addEventListener('change', () => {
    localStorage.setItem(careKey, JSON.stringify(boxes.map(b => b.checked)));
  });
});

const inputs = ['hoursWeek','hourlyRate','dayProgram','buffer'].map(id => document.getElementById(id));
const labor = document.getElementById('laborCost');
const total = document.getElementById('totalCost');

function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0)}
function calc(){
  const [h,r,d,b] = inputs.map(i => Number(i?.value || 0));
  const laborMonthly = h * r * 4.33;
  const totalMonthly = laborMonthly + d + b;
  labor.textContent = money(laborMonthly);
  total.textContent = money(totalMonthly);
}
inputs.forEach(i => i?.addEventListener('input', calc));
calc();

const medChecks = [...document.querySelectorAll('.med-check')];
try {
  const savedMeds = JSON.parse(localStorage.getItem(medKey) || '[]');
  medChecks.forEach((m,i)=>m.checked=!!savedMeds[i]);
} catch {}
medChecks.forEach(m=>m.addEventListener('change', ()=>{
  localStorage.setItem(medKey, JSON.stringify(medChecks.map(x=>x.checked)));
}));

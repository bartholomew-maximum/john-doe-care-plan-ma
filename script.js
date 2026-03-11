const waves = [
  {name:'Wave 1 (v3-v10)', focus:'Foundation + trust + family workflow'},
  {name:'Wave 2 (v11-v25)', focus:'Clinical quality + reporting + compliance-ready docs'},
  {name:'Wave 3 (v26-v40)', focus:'Financial planning + benefits + affordability scenarios'},
  {name:'Wave 4 (v41-v55)', focus:'Automation + smart escalation + care ops workflows'},
  {name:'Wave 5 (v56-v70)', focus:'Provider integration + handoff + transitions of care'},
  {name:'Wave 6 (v71-v85)', focus:'Predictive intelligence + burnout prevention + optimization'},
  {name:'Wave 7 (v86-v100)', focus:'Full family care OS + decision intelligence + governance'}
];

const focusPool = [
  'Care binder workflow', 'Medication adherence', 'Fall-risk prevention', 'Family collaboration',
  'Budget forecasting', 'Benefits optimization', 'Automation triggers', 'Provider coordination',
  'Crisis prevention', 'Decision support', 'Documentation quality', 'Caregiver stress management'
];

const featurePool = [
  'Daily visit notes timeline', 'Role-based family access', 'Escalation trigger engine',
  'Medication tracker with adherence %', 'Monthly cost runway calculator',
  'Appointment prep briefs', 'Quarterly care conference packets', 'Incident report auto-draft',
  'Adaptive care-hours recommendation', 'Benefits checklist tracker', 'Care pathway simulator',
  'Printable emergency one-sheet', 'Sibling huddle agenda generator', 'Risk heatmap dashboard',
  'Provider message templates', 'Hospital discharge checklist', 'Respite scheduling optimizer',
  'Tasks + accountability feed', 'Long-term placement readiness score', 'Audit trail + decision log'
];

const waveForVersion = v => {
  if (v <= 10) return waves[0].name;
  if (v <= 25) return waves[1].name;
  if (v <= 40) return waves[2].name;
  if (v <= 55) return waves[3].name;
  if (v <= 70) return waves[4].name;
  if (v <= 85) return waves[5].name;
  return waves[6].name;
};

const versions = [];
for (let v = 3; v <= 100; v++) {
  const focus = focusPool[v % focusPool.length];
  const f1 = featurePool[v % featurePool.length];
  const f2 = featurePool[(v + 5) % featurePool.length];
  const f3 = featurePool[(v + 9) % featurePool.length];
  versions.push({version: `v${v}`, wave: waveForVersion(v), focus, features: [f1,f2,f3]});
}

const waveContainer = document.getElementById('waves');
waves.forEach(w => {
  const el = document.createElement('article');
  el.className = 'wave';
  el.innerHTML = `<h4>${w.name}</h4><p>${w.focus}</p>`;
  waveContainer.appendChild(el);
});

const waveFilter = document.getElementById('waveFilter');
[...new Set(versions.map(v=>v.wave))].forEach(w=>{
  const o = document.createElement('option'); o.value = w; o.textContent = w; waveFilter.appendChild(o);
});

const tbody = document.getElementById('versionRows');
const search = document.getElementById('search');

function render() {
  const q = (search.value || '').toLowerCase().trim();
  const wf = waveFilter.value;
  const filtered = versions.filter(v => (wf==='all' || v.wave===wf) &&
    `${v.version} ${v.wave} ${v.focus} ${v.features.join(' ')}`.toLowerCase().includes(q)
  );
  tbody.innerHTML = filtered.map(v => `
    <tr>
      <td><strong>${v.version}</strong></td>
      <td>${v.wave}</td>
      <td>${v.focus}</td>
      <td>${v.features.map(f=>`• ${f}`).join('<br>')}</td>
    </tr>
  `).join('');
}

search.addEventListener('input', render);
waveFilter.addEventListener('change', render);
render();

const flagship = [
  'Unified family care dashboard', 'Predictive crisis risk scoring', 'Financial runway + benefits engine',
  'Clinical quality & adherence analytics', 'Provider handoff packet automation', 'Role-based collaboration',
  'Decision audit trail', 'Escalation intelligence + recommendations'
];
const chipWrap = document.getElementById('flagship');
flagship.forEach(t => {
  const chip = document.createElement('span'); chip.textContent = t; chipWrap.appendChild(chip);
});

// Company inbox address — replace with your real email before publishing.
const COMPANY_EMAIL = "success.international16424@gmail.com";
let currentLang = 'en';

const ITEMS = [
  {
    code: 'LOT-01', abbr: 'VEH', value: 'Used Vehicles',
    titleEn: 'Used Vehicles', titleJp: '中古車両',
    descEn: 'Cars, vans, mini trucks and buses — auction-grade, Japan domestic stock.',
    descJp: '乗用車、バン、小型トラック、バス — オークション品質の日本国内在庫。'
  },
  {
    code: 'LOT-02', abbr: 'ENG', value: 'Engines & Transmissions', image: '/Assets/ier_med_001.png',
    titleEn: 'Engines & Transmissions', titleJp: 'エンジン・トランスミッション',
    descEn: 'Recon and used engines, gearboxes, and transmission assemblies.',
    descJp: 'リコンディション済み・中古エンジン、ギアボックス、トランスミッション一式。'
  },
  {
    code: 'LOT-03', abbr: 'MCH', value: 'Industrial & Construction Machinery Parts',
    titleEn: 'Industrial & Construction Machinery Parts', titleJp: '産業・建設機械部品',
    descEn: 'Excavator, forklift, and generator components, hydraulics, and attachments.',
    descJp: '掘削機、フォークリフト、発電機の部品、油圧機器、アタッチメント。'
  },
  {
    code: 'LOT-04', abbr: 'BDY', value: 'Body & Chassis Parts',
    titleEn: 'Body & Chassis Parts', titleJp: 'ボディ・シャシー部品',
    descEn: 'Panels, bumpers, doors, chassis sections, and accident-repair parts.',
    descJp: 'パネル、バンパー、ドア、シャシー部品、事故修理用パーツ。'
  },
  {
    code: 'LOT-05', abbr: 'ELE', value: 'Electrical & ECU Parts',
    titleEn: 'Electrical & ECU Parts', titleJp: '電装・ECU部品',
    descEn: 'Alternators, starters, wiring looms, ECUs, sensors and control units.',
    descJp: 'オルタネーター、スターター、ワイヤーハーネス、ECU、センサー、制御ユニット。'
  },
  {
    code: 'LOT-06', abbr: 'OTH', value: 'Other / Not Listed',
    titleEn: 'Other / Not Listed', titleJp: 'その他・記載なし品目',
    descEn: 'Any part or unit not shown above — tell us the make, model, and spec.',
    descJp: '上記にない部品や車両など、メーカー・モデル・仕様をお知らせください。'
  },
];

const COUNTRY_CODES = [
  { name: '', code: '+94', flag: '🇱🇰' },
  { name: '', code: '+81', flag: '🇯🇵' },
  { name: '', code: '+91', flag: '🇮🇳' },
  { name: '', code: '+92', flag: '🇵🇰' },
  { name: '', code: '+880', flag: '🇧🇩' },
  { name: '', code: '+960', flag: '🇲🇻' },
  { name: '', code: '+977', flag: '🇳🇵' },
  { name: '', code: '+65', flag: '🇸🇬' },
  { name: '', code: '+60', flag: '🇲🇾' },
  { name: '', code: '+66', flag: '🇹🇭' },
  { name: '', code: '+62', flag: '🇮🇩' },
  { name: '', code: '+63', flag: '🇵🇭' },
  { name: '', code: '+84', flag: '🇻🇳' },
  { name: '', code: '+86', flag: '🇨🇳' },
  { name: '', code: '+82', flag: '🇰🇷' },
  { name: '', code: '+852', flag: '🇭🇰' },
  { name: '', code: '+971', flag: '🇦🇪' },
  { name: '', code: '+966', flag: '🇸🇦' },
  { name: '', code: '+974', flag: '🇶🇦' },
  { name: '', code: '+965', flag: '🇰🇼' },
  { name: '', code: '+61', flag: '🇦🇺' },
  { name: '', code: '+64', flag: '🇳🇿' },
  { name: '', code: '+44', flag: '🇬🇧' },
  { name: '', code: '+353', flag: '🇮🇪' },
  { name: '', code: '+49', flag: '🇩🇪' },
  { name: '', code: '+33', flag: '🇫🇷' },
  { name: '', code: '+39', flag: '🇮🇹' },
  { name: '', code: '+31', flag: '🇳🇱' },
  { name: '', code: '+1', flag: '🇨🇦' },
  { name: '', code: '+1', flag: '🇺🇸' },
  { name: '', code: '+27', flag: '🇿🇦' },
];

function populatePhoneCodes(selectId, defaultCode) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = COUNTRY_CODES.map(c =>
    `<option value="${c.code}">${c.flag} ${c.name} (${c.code})</option>`
  ).join('');
  sel.value = defaultCode;
}

function renderManifest() {
  const list = document.getElementById('manifestList');
  list.innerHTML = ITEMS.map(it => `
      <div class="manifest-row">
        <div class="lot mono"><strong>${it.code}</strong>${it.abbr}</div>
        <div class="item-info">
          <h3 data-en="${it.titleEn}" data-jp="${it.titleJp}">${it.titleEn}</h3>
          <p data-en="${it.descEn}" data-jp="${it.descJp}">${it.descEn}</p>
        </div>
        <div class="item-actions">
          <a href="#request" class="btn-sm" data-en="Request" data-jp="リクエスト" onclick="presetItem('${it.value.replace(/'/g, "\\'")}')">Request</a>
          <a href="javascript:void(0)" class="btn-sm stamp" data-en="Bid" data-jp="入札" onclick="openBidModal('${it.code}','${it.value.replace(/'/g, "\\'")}')">Bid</a>
        </div>
      </div>
    `).join('');
  applyLanguage();
}

function presetItem(value) {
  const sel = document.getElementById('rq-type');
  for (const opt of sel.options) { if (opt.value === value) { sel.value = value; break; } }
}

function openBidModal(code, value) {
  document.getElementById('bd-type').value = value;
  const item = ITEMS.find(i => i.value === value);
  const label = document.getElementById('bidItemLabel');
  const title = item ? (currentLang === 'jp' ? item.titleJp : item.titleEn) : value;
  label.textContent = `${code} · ${title}`;
  document.getElementById('bidOverlay').classList.add('open');
  document.getElementById('bd-amount').focus();
}
function closeBidModal() {
  document.getElementById('bidOverlay').classList.remove('open');
}
document.getElementById('bidOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeBidModal();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeBidModal();
});

function buildMailto(to, subject, bodyLines) {
  const body = bodyLines.filter(Boolean).join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function showStatus(el, text) {
  el.textContent = text;
  el.classList.add('show');
}

document.getElementById('requestForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const f = e.target;
  const subject = `Parts Request — ${f.itemType.value || 'General'}`;
  const phoneCode = document.getElementById('rq-phone-code').value;
  const phoneFull = f.phone.value ? `${phoneCode} ${f.phone.value}` : '';
  const body = [
    `Name: ${f.name.value}`,
    `Email: ${f.email.value}`,
    `Phone: ${phoneFull}`,
    `Item type: ${f.itemType.value}`,
    `Make / model / part: ${f.model.value}`,
    '',
    'Details:',
    f.message.value
  ];
  window.location.href = buildMailto(COMPANY_EMAIL, subject, body);
  showStatus(document.getElementById('rq-status'), currentLang === 'jp' ? 'メールアプリを開いています。内容をご確認のうえ送信してください。' : 'Opening your email app — please review and send.');
});

document.getElementById('bidForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const f = e.target;
  const subject = `Bid Submission — ${f.itemType.value || 'Item'} — ¥${f.amount.value}`;
  const body = [
    `Name: ${f.name.value}`,
    `Email: ${f.email.value}`,
    `Item type / lot: ${f.itemType.value}`,
    `Bid amount: ¥${f.amount.value}`,
    '',
    'Notes:',
    f.message.value
  ];
  window.location.href = buildMailto(COMPANY_EMAIL, subject, body);
  showStatus(document.getElementById('bd-status'), currentLang === 'jp' ? 'メールアプリを開いています。内容をご確認のうえ送信してください。' : 'Opening your email app — please review and send.');
  setTimeout(closeBidModal, 900);
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const f = e.target;
  const subject = f.subject.value || 'Website Contact — Success International';
  const phoneCode = document.getElementById('ct-phone-code').value;
  const phoneFull = f.phone.value ? `${phoneCode} ${f.phone.value}` : '';
  const body = [
    `Name: ${f.name.value}`,
    `Email: ${f.email.value}`,
    phoneFull ? `Phone: ${phoneFull}` : '',
    '',
    f.message.value
  ];
  window.location.href = buildMailto(COMPANY_EMAIL, subject, body);
  showStatus(document.getElementById('ct-status'), currentLang === 'jp' ? 'メールアプリを開いています。内容をご確認のうえ送信してください。' : 'Opening your email app — please review and send.');
});

function applyLanguage() {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = currentLang === 'jp' ? el.getAttribute('data-jp') : el.getAttribute('data-en');
    if (val !== null) el.textContent = val;
  });
  document.querySelectorAll('[data-en-ph]').forEach(el => {
    const val = currentLang === 'jp' ? el.getAttribute('data-jp-ph') : el.getAttribute('data-en-ph');
    if (val !== null) el.setAttribute('placeholder', val);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('htmlRoot').setAttribute('data-lang', lang);
  document.getElementById('htmlRoot').setAttribute('lang', lang === 'jp' ? 'ja' : 'en');
  document.getElementById('langEnBtn').classList.toggle('active', lang === 'en');
  document.getElementById('langJpBtn').classList.toggle('active', lang === 'jp');
  applyLanguage();
}

renderManifest();
populatePhoneCodes('rq-phone-code', '+94');
populatePhoneCodes('ct-phone-code', '+94');
setLanguage('en');

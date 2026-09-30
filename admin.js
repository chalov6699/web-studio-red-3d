(() => {
  if (!window.SiteCMS) return;

  let draft = window.SiteCMS.load();
  let dirty = false;
  let activeSection = 'hero';
  let toastTimer;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  function get(path) {
    return path.split('.').reduce((acc, key) => acc?.[key], draft);
  }

  function set(path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((acc, key) => acc[key], draft);
    target[last] = value;
  }

  function removeAt(path) {
    const parts = path.split('.');
    const index = Number(parts.pop());
    const arr = parts.reduce((acc, key) => acc[key], draft);
    if (Array.isArray(arr)) arr.splice(index, 1);
  }

  function markDirty() {
    dirty = true;
    const state = $('#saveState');
    state.textContent = 'Есть несохранённые изменения';
    state.classList.add('is-dirty');
  }

  function markSaved() {
    dirty = false;
    const state = $('#saveState');
    state.textContent = 'Все изменения сохранены';
    state.classList.remove('is-dirty');
  }

  function notify(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2400);
  }

  function title(kicker, heading, text) {
    return `<div class="section-title"><div><p class="eyebrow">${esc(kicker)}</p><h2>${esc(heading)}</h2><p>${esc(text)}</p></div></div>`;
  }

  function field(path, label, opts = {}) {
    const value = get(path) ?? '';
    const wide = opts.wide ? ' wide' : '';
    const help = opts.help ? `<small>${esc(opts.help)}</small>` : '';
    const placeholder = opts.placeholder ? ` placeholder="${esc(opts.placeholder)}"` : '';
    const control = opts.textarea
      ? `<textarea data-path="${esc(path)}"${placeholder}>${esc(value)}</textarea>`
      : `<input data-path="${esc(path)}" type="${opts.type || 'text'}" value="${esc(value)}"${placeholder} />`;
    return `<label class="field${wide}"><span>${esc(label)}</span>${control}${help}</label>`;
  }

  function toggle(path, label, help) {
    return `<div class="toggle-row"><div class="toggle-copy"><strong>${esc(label)}</strong><small>${esc(help)}</small></div><label class="switch"><input data-path="${esc(path)}" type="checkbox" ${get(path) ? 'checked' : ''}/><span></span></label></div>`;
  }

  function card(heading, body, subtitle = '') {
    return `<div class="editor-card"><div class="card-head"><div><h3>${esc(heading)}</h3>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div></div>${body}</div>`;
  }

  function removeButton(path) {
    return `<button class="admin-button admin-button-small admin-button-danger" type="button" data-remove="${esc(path)}">Удалить</button>`;
  }

  function addButton(path, kind, label = 'Добавить') {
    return `<div class="add-row"><button class="admin-button admin-button-ghost admin-button-small" type="button" data-add="${esc(path)}" data-add-kind="${esc(kind)}">＋ ${esc(label)}</button></div>`;
  }

  function stringList(path, label, kind = 'string') {
    const items = get(path) || [];
    const rows = items.map((item, i) => `<div class="inline-list-row"><input data-path="${path}.${i}" type="text" value="${esc(item)}" />${removeButton(`${path}.${i}`)}</div>`).join('');
    return `<div class="field"><span>${esc(label)}</span><div class="inline-list">${rows}</div>${addButton(path, kind, 'Добавить пункт')}</div>`;
  }

  function renderHero() {
    $('[data-section="hero"]').innerHTML = title('Главная', 'Первый экран и бренд', 'Редактируйте главный оффер, кнопки, подписи и название студии.') +
      card('Бренд', `<div class="field-grid two">${field('general.brand','Название студии')}${field('general.navCta','Кнопка в шапке')}</div>`) +
      card('Hero-блок', `<div class="field-grid two">${field('hero.eyebrow','Надзаголовок', {wide:true})}${field('hero.title','Главный заголовок',{textarea:true,wide:true})}${field('hero.text','Описание',{textarea:true,wide:true})}${field('hero.primaryLabel','Основная кнопка')}${field('hero.primaryLink','Ссылка основной кнопки')}${field('hero.secondaryLabel','Вторая кнопка')}${field('hero.secondaryLink','Ссылка второй кнопки')}</div><div style="margin-top:16px">${stringList('hero.meta','Короткие преимущества')}</div>`);
  }

  function renderAbout() {
    const items = draft.about.cards.map((item, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>Карточка</div>${removeButton(`about.cards.${i}`)}</div><div class="field-grid two">${field(`about.cards.${i}.title`,'Заголовок')}${field(`about.cards.${i}.text`,'Описание',{textarea:true})}</div></div>`).join('');
    $('[data-section="about"]').innerHTML = title('О нас', 'Блок преимуществ', 'Заголовок, описание и любое количество карточек.') +
      card('Заголовок секции', `<div class="field-grid two">${field('about.eyebrow','Надзаголовок')}${field('about.title','Заголовок',{wide:true})}${field('about.text','Описание',{textarea:true,wide:true})}</div>`) +
      card('Карточки', `<div class="collection">${items}</div>${addButton('about.cards','aboutCard','Добавить карточку')}`);
  }

  function renderAudience() {
    const items = draft.audience.cards.map((item, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>Сегмент</div>${removeButton(`audience.cards.${i}`)}</div>${field(`audience.cards.${i}.title`,'Текст карточки')}</div>`).join('');
    $('[data-section="audience"]').innerHTML = title('Аудитория', 'Кому подходит', 'Настройте заголовок и сегменты аудитории.') +
      card('Заголовок секции', `<div class="field-grid two">${field('audience.eyebrow','Надзаголовок')}${field('audience.title','Заголовок',{wide:true})}</div>`) +
      card('Сегменты', `<div class="collection">${items}</div>${addButton('audience.cards','audienceCard','Добавить сегмент')}`);
  }

  function renderPortfolio() {
    const items = draft.portfolio.items.map((item, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>${esc(item.title || 'Новый проект')}</div>${removeButton(`portfolio.items.${i}`)}</div><div class="field-grid two">${field(`portfolio.items.${i}.title`,'Название')}${field(`portfolio.items.${i}.category`,'Категория')}${field(`portfolio.items.${i}.result`,'Результат / цифра')}${field(`portfolio.items.${i}.link`,'Ссылка')}${field(`portfolio.items.${i}.image`,'URL изображения',{wide:true,help:'Если оставить пустым, будет фирменный градиент.'})}${field(`portfolio.items.${i}.text`,'Описание',{textarea:true,wide:true})}</div></div>`).join('');
    $('[data-section="portfolio"]').innerHTML = title('Портфолио', 'Наши проекты', 'Добавляйте кейсы, изображения, результаты и ссылки на проекты.') +
      card('Настройки секции', `${toggle('portfolio.visible','Показывать портфолио','Можно временно скрыть весь блок на сайте.')}<div class="field-grid two" style="margin-top:16px">${field('portfolio.eyebrow','Надзаголовок')}${field('portfolio.title','Заголовок',{wide:true})}${field('portfolio.text','Описание',{textarea:true,wide:true})}</div>`) +
      card('Проекты', `<div class="collection">${items}</div>${addButton('portfolio.items','portfolioItem','Добавить проект')}`);
  }

  function renderPricing() {
    const bundles = draft.pricing.bundles.map((row, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>${esc(row.name || 'Пакет')}</div>${removeButton(`pricing.bundles.${i}`)}</div><div class="field-grid four">${field(`pricing.bundles.${i}.name`,'Пакет')}${field(`pricing.bundles.${i}.includes`,'Что входит')}${field(`pricing.bundles.${i}.price`,'Цена')}${field(`pricing.bundles.${i}.term`,'Срок')}</div></div>`).join('');
    const services = draft.pricing.services.map((row, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>${esc(row.name || 'Услуга')}</div>${removeButton(`pricing.services.${i}`)}</div><div class="field-grid two">${field(`pricing.services.${i}.name`,'Услуга')}${field(`pricing.services.${i}.price`,'Цена')}</div></div>`).join('');
    $('[data-section="pricing"]').innerHTML = title('Цены', 'Прайс и услуги', 'Редактируйте любые цены, сроки и состав пакетов. Строки можно добавлять и удалять.') +
      card('Заголовок секции', `<div class="field-grid two">${field('pricing.eyebrow','Надзаголовок')}${field('pricing.title','Заголовок',{wide:true})}</div>`) +
      card('Пакеты «сайт + бот»', `<div class="field-grid two" style="margin-bottom:16px">${field('pricing.bundleLabel','Метка')}${field('pricing.bundleTitle','Заголовок таблицы')}</div><div class="collection">${bundles}</div>${addButton('pricing.bundles','bundle','Добавить пакет')}`) +
      card('Отдельные услуги', `<div class="field-grid two" style="margin-bottom:16px">${field('pricing.servicesLabel','Метка')}${field('pricing.servicesTitle','Заголовок таблицы')}</div><div class="collection">${services}</div>${addButton('pricing.services','service','Добавить услугу')}`) +
      card('Поддержка', `<div class="field-grid two">${field('pricing.supportLabel','Метка')}${field('pricing.supportTitle','Заголовок')}${field('pricing.supportText','Текст',{textarea:true,wide:true})}</div>`);
  }

  function renderAd() {
    $('[data-section="ad"]').innerHTML = title('Реклама', 'Рекламный баннер', 'Отдельный заметный баннер с inline-кнопкой. Его можно отключить одним переключателем.') +
      card('Настройки баннера', `${toggle('ad.visible','Показывать рекламный блок','Если выключить, баннер полностью исчезнет с сайта.')}<div class="field-grid two" style="margin-top:16px">${field('ad.badge','Бейдж')}${field('ad.title','Заголовок',{textarea:true,wide:true})}${field('ad.text','Описание',{textarea:true,wide:true})}${field('ad.buttonLabel','Текст кнопки')}${field('ad.buttonLink','Ссылка кнопки')}${field('ad.note','Подпись под кнопкой',{wide:true})}</div>`);
  }

  function renderCalculation() {
    const panels = draft.calculation.panels.map((panel, i) => `<div class="collection-item"><div class="collection-item-head"><div class="collection-item-title"><span class="item-number">${String(i+1).padStart(2,'0')}</span>${esc(panel.label || 'Блок')}</div>${removeButton(`calculation.panels.${i}`)}</div><div class="field-grid two">${field(`calculation.panels.${i}.label`,'Метка')}${field(`calculation.panels.${i}.title`,'Заголовок')}</div><div style="margin-top:14px">${stringList(`calculation.panels.${i}.items`,'Пункты списка')}</div></div>`).join('');
    $('[data-section="calculation"]').innerHTML = title('Расчёт цены', 'Как формируется стоимость', 'Редактируйте блоки и пункты факторов стоимости.') +
      card('Заголовок секции', `<div class="field-grid two">${field('calculation.eyebrow','Надзаголовок')}${field('calculation.title','Заголовок',{wide:true})}</div>`) +
      card('Блоки расчёта', `<div class="collection">${panels}</div>${addButton('calculation.panels','calcPanel','Добавить блок')}`);
  }

  function renderWhy() {
    $('[data-section="why"]').innerHTML = title('Почему мы', 'Доверительный блок', 'Заголовок и основная цитата/позиционирование студии.') +
      card('Текст секции', `<div class="field-grid two">${field('why.eyebrow','Надзаголовок')}${field('why.title','Заголовок',{wide:true})}${field('why.quote','Цитата',{textarea:true,wide:true})}</div>`);
  }

  function renderContacts() {
    $('[data-section="contacts"]').innerHTML = title('Контакты', 'Контакты и подвал', 'Обновите Telegram, телефон, домен, подписи и кнопку формы.') +
      card('Контактный блок', `<div class="field-grid two">${field('contacts.eyebrow','Надзаголовок')}${field('contacts.title','Заголовок',{wide:true})}${field('contacts.text','Описание',{textarea:true,wide:true})}${field('contacts.telegramLabel','Текст Telegram-кнопки')}${field('contacts.telegram','Telegram username')}${field('contacts.telegramLink','Ссылка Telegram')}${field('contacts.phone','Телефон')}${field('contacts.domain','Домен')}${field('contacts.nameLabel','Поле: имя — подпись')}${field('contacts.namePlaceholder','Поле: имя — placeholder')}${field('contacts.contactLabel','Поле: контакт — подпись')}${field('contacts.contactPlaceholder','Поле: контакт — placeholder')}${field('contacts.taskLabel','Поле: задача — подпись')}${field('contacts.taskPlaceholder','Поле: задача — placeholder')}${field('contacts.formButton','Кнопка формы')}</div>`) +
      card('Подвал', `<div class="field-grid">${field('footer.text','Текст в подвале')}</div>`);
  }

  function renderSystem() {
    $('[data-section="system"]').innerHTML = title('Данные', 'Импорт, экспорт и сброс', 'Сохраните копию контента в JSON или перенесите настройки в другой браузер.') +
      card('Управление данными', `<div class="system-actions"><button class="admin-button admin-button-primary" id="exportButton" type="button">Экспорт JSON</button><button class="admin-button admin-button-ghost" id="importButton" type="button">Импорт JSON</button><button class="admin-button admin-button-danger" id="resetButton" type="button">Сбросить к исходным</button></div><div class="system-note"><strong>Важно:</strong> эта версия проекта остаётся статической. Изменения сохраняются в localStorage текущего браузера. Для единой админки на домене с доступом с разных устройств потребуется серверная БД/API.</div><pre class="code-preview">${esc(JSON.stringify(draft, null, 2))}</pre>`);
  }

  const renderers = { hero: renderHero, about: renderAbout, audience: renderAudience, portfolio: renderPortfolio, pricing: renderPricing, ad: renderAd, calculation: renderCalculation, why: renderWhy, contacts: renderContacts, system: renderSystem };

  function renderAll() {
    Object.values(renderers).forEach((fn) => fn());
    showSection(activeSection);
  }

  function showSection(name) {
    activeSection = name;
    $$('.admin-section').forEach((section) => section.classList.toggle('is-active', section.dataset.section === name));
    $$('#adminNav button').forEach((button) => button.classList.toggle('is-active', button.dataset.sectionTarget === name));
    if (window.innerWidth <= 880) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const addTemplates = {
    string: '',
    aboutCard: { title: 'Новая карточка', text: 'Короткое описание.' },
    audienceCard: { title: 'Новый сегмент аудитории' },
    portfolioItem: { title: 'Новый проект', category: 'Сайт + бот', text: 'Описание проекта и выполненной работы.', result: 'Результат', link: '#contacts', image: '' },
    bundle: { name: 'Новый пакет', includes: 'Что входит в пакет', price: '0 ₽', term: 'Срок' },
    service: { name: 'Новая услуга', price: '0 ₽' },
    calcPanel: { label: 'Новый блок', title: 'От чего зависит стоимость', items: ['Новый пункт'] }
  };

  document.addEventListener('input', (event) => {
    const control = event.target.closest('[data-path]');
    if (!control) return;
    set(control.dataset.path, control.type === 'checkbox' ? control.checked : control.value);
    markDirty();
  });

  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-section-target]');
    if (nav) { showSection(nav.dataset.sectionTarget); return; }

    const remove = event.target.closest('[data-remove]');
    if (remove) {
      removeAt(remove.dataset.remove);
      markDirty();
      renderAll();
      return;
    }

    const add = event.target.closest('[data-add]');
    if (add) {
      const arr = get(add.dataset.add);
      const template = addTemplates[add.dataset.addKind];
      if (Array.isArray(arr)) arr.push(window.SiteCMS.clone(template));
      markDirty();
      renderAll();
      return;
    }

    if (event.target.closest('#saveButton')) {
      window.SiteCMS.save(draft);
      markSaved();
      notify('Изменения сохранены и применены к сайту.');
      return;
    }

    if (event.target.closest('#exportButton')) {
      const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `web-studio-content-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify('JSON-файл подготовлен.');
      return;
    }

    if (event.target.closest('#importButton')) {
      $('#importInput').click();
      return;
    }

    if (event.target.closest('#resetButton')) {
      const ok = window.confirm('Сбросить весь контент к исходным значениям? Это действие заменит текущие изменения.');
      if (!ok) return;
      draft = window.SiteCMS.reset();
      window.SiteCMS.save(draft);
      markSaved();
      renderAll();
      notify('Контент сброшен к исходным значениям.');
    }
  });

  $('#importInput').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Неверная структура');
      draft = parsed;
      window.SiteCMS.save(draft);
      draft = window.SiteCMS.load();
      markSaved();
      renderAll();
      notify('Контент импортирован и сохранён.');
    } catch (error) {
      notify('Не удалось импортировать JSON: проверьте файл.');
    } finally {
      event.target.value = '';
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });

  renderAll();
})();

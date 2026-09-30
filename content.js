(() => {
  const STORAGE_KEY = 'webStudioCmsContentV2';

  const defaults = {
    general: {
      brand: 'Web Studio',
      navCta: 'Обсудить проект'
    },
    hero: {
      eyebrow: 'Сайт + Telegram-бот = единая система',
      title: 'Сайты и Telegram-боты в связке, под ключ',
      text: 'Создаём цельную цифровую систему: сайт принимает заявки, бот отвечает и уведомляет, данные синхронизируются, а управление остаётся в одном месте.',
      primaryLabel: 'Обсудить проект',
      primaryLink: '#contacts',
      secondaryLabel: 'Написать в Telegram',
      secondaryLink: 'https://t.me/username',
      meta: ['Mobile-first', '30 дней гарантии', 'Единая логика']
    },
    about: {
      eyebrow: 'О нас',
      title: 'Сайт и бот — не два продукта, а одна рабочая система',
      text: 'Мы делаем сайты и Telegram-ботов в связке. Не по отдельности, а как единую систему: клиент заходит на сайт, оставляет заявку — бот сразу получает уведомление и отвечает. Или наоборот: человек пишет боту, а данные падают в админку сайта.',
      cards: [
        { title: 'Адаптивный сайт', text: 'Телефон, планшет, ПК.' },
        { title: 'Telegram-бот', text: 'Связанный с сайтом.' },
        { title: 'Единая админка', text: 'Контент и логика в одном месте.' },
        { title: 'Деплой', text: 'Домен, SSL, сервер.' },
        { title: 'Базовая SEO-оптимизация', text: 'Технический фундамент для индексации.' },
        { title: '30 дней гарантии', text: 'После запуска проекта.' }
      ]
    },
    audience: {
      eyebrow: 'Кому подходит',
      title: 'Тем, кому важен единый поток заявок и меньше ручной рутины',
      cards: [
        { title: 'Малому и среднему бизнесу' },
        { title: 'Начинающим самозанятым' },
        { title: 'ИП' },
        { title: 'Тем, у кого сайт и Telegram работают отдельно' },
        { title: 'Тем, кто хочет автоматизировать повторяющиеся вопросы' }
      ]
    },
    portfolio: {
      visible: true,
      eyebrow: 'Наше портфолио',
      title: 'Проекты, где дизайн работает вместе с автоматизацией',
      text: 'Несколько примеров формата работ. Карточки, ссылки и изображения полностью редактируются через админ-панель.',
      items: [
        {
          title: 'NOVA / Digital',
          category: 'Корпоративный сайт + бот',
          text: 'Премиальный лендинг, сбор заявок и Telegram-уведомления для отдела продаж.',
          result: '+42% заявок',
          link: '#contacts',
          image: ''
        },
        {
          title: 'Forma Lab',
          category: 'Каталог + CRM',
          text: 'Каталог услуг с квизом, автоматической квалификацией лида и передачей в CRM.',
          result: '−60% ручной рутины',
          link: '#contacts',
          image: ''
        },
        {
          title: 'Pulse Service',
          category: 'Сервисный бот',
          text: 'Сайт и бот для заявок в поддержку, статусов обращений и повторных продаж.',
          result: '24/7 приём заявок',
          link: '#contacts',
          image: ''
        }
      ]
    },
    pricing: {
      eyebrow: 'Цены',
      title: 'Понятные ориентиры по бюджету',
      bundleLabel: 'Пакет 1',
      bundleTitle: 'Сайт + Telegram-бот в связке',
      bundles: [
        { name: 'Базовый', includes: 'Лендинг / до 5 страниц + простой бот', price: '180 000 ₽ / 90 000 ₴ / 450 000 ₸', term: '2–3 недели' },
        { name: 'Стандарт', includes: '5–10 страниц + бот с формами + CRM', price: '320 000 ₽ / 160 000 ₴ / 800 000 ₸', term: '3–5 недель' },
        { name: 'Продвинутый', includes: '10+ страниц + бот с оплатой и БД', price: 'от 550 000 ₽ / от 275 000 ₴ / от 1 400 000 ₸', term: '5–8 недель' }
      ],
      servicesLabel: 'Пакет 2',
      servicesTitle: 'Отдельные услуги',
      services: [
        { name: 'Сайт отдельно', price: '90 000 – 200 000 ₽' },
        { name: 'Telegram-бот отдельно', price: '40 000 – 120 000 ₽' },
        { name: 'Доработка / правки сайта', price: '3 000 – 5 000 ₽/час' },
        { name: 'Доп. функции для бота', price: 'Зависит от задачи' },
        { name: 'Ежемесячная поддержка', price: '15 000 – 30 000 ₽/мес' }
      ],
      supportLabel: 'Поддержка',
      supportTitle: 'После запуска',
      supportText: 'Если проект нужно регулярно обновлять, менять логику бота, чинить мелкие баги и дорабатывать сценарии — поддержку можно вести ежемесячно и считать по фактическим задачам.'
    },
    ad: {
      visible: true,
      badge: 'Спецпредложение',
      title: 'Бесплатный мини-аудит сайта или идеи перед стартом проекта',
      text: 'Покажем, где теряются заявки и какие связки с Telegram можно автоматизировать в первую очередь.',
      buttonLabel: 'Получить аудит',
      buttonLink: '#contacts',
      note: 'Без обязательств · ответим в Telegram'
    },
    calculation: {
      eyebrow: 'Как мы считаем цену',
      title: 'Прозрачное ценообразование',
      panels: [
        { label: 'По сайту', title: 'Стоимость зависит от объёма и сложности', items: ['Количество страниц', 'Кастомный дизайн vs шаблон — разница 30–50%', 'Интеграции', 'Контент'] },
        { label: 'По боту', title: 'Цена зависит от сценариев и интеграций', items: ['Сложность сценария', 'Количество интеграций', 'Наличие админки'] }
      ]
    },
    why: {
      eyebrow: 'Почему мы',
      title: 'Один человек отвечает за весь поток',
      quote: '«Когда сайт и бот делают разные люди, обычно выясняется, что данные не передаются и никто не виноват. Мы делаем в связке — один человек отвечает за весь поток. Цена не самая низкая, но после запуска вы знаете, к кому идти с проблемой.»'
    },
    contacts: {
      eyebrow: 'Контакты',
      title: 'Опишите задачу — соберём систему под ваш процесс',
      text: 'Расскажите, что должен делать сайт, что должен делать бот и куда должны попадать данные. Мы разложим проект на понятные этапы.',
      telegramLabel: 'Написать в Telegram',
      telegram: '@username',
      telegramLink: 'https://t.me/username',
      phone: '+7 (000) 000-00-00',
      domain: 'example.com',
      nameLabel: 'Имя',
      namePlaceholder: 'Как к вам обращаться',
      contactLabel: 'Телефон / Telegram',
      contactPlaceholder: '+7 999 123-45-67 или @username',
      taskLabel: 'Описание задачи',
      taskPlaceholder: 'Что должен делать сайт и бот?',
      formButton: 'Отправить заявку'
    },
    footer: {
      text: 'Сайты и Telegram-боты в связке, под ключ.'
    }
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function merge(base, patch) {
    if (Array.isArray(base)) return Array.isArray(patch) ? clone(patch) : clone(base);
    if (!base || typeof base !== 'object') return patch === undefined ? base : patch;
    const out = { ...base };
    if (!patch || typeof patch !== 'object') return out;
    Object.keys(patch).forEach((key) => {
      if (key in base && !Array.isArray(base[key]) && base[key] && typeof base[key] === 'object') {
        out[key] = merge(base[key], patch[key]);
      } else {
        out[key] = clone(patch[key]);
      }
    });
    return out;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaults);
      return merge(defaults, JSON.parse(raw));
    } catch (error) {
      console.warn('Не удалось прочитать CMS-контент:', error);
      return clone(defaults);
    }
  }

  function save(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent('cms:updated', { detail: clone(content) }));
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return clone(defaults);
  }

  function text(selector, value) {
    const el = document.querySelector(selector);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function safeHref(value) {
    const href = String(value || '#').trim();
    if (/^(#|\/|https?:\/\/|mailto:|tel:)/i.test(href)) return href;
    return '#';
  }

  function link(selector, label, href) {
    const el = document.querySelector(selector);
    if (!el) return;
    const resolvedHref = safeHref(href);
    if (label !== undefined) el.textContent = label;
    if (href !== undefined) el.setAttribute('href', resolvedHref);
    const external = /^https?:\/\//i.test(resolvedHref);
    if (external) {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  }

  function safeBgUrl(url) {
    if (!url || !/^https?:\/\//i.test(url)) return '';
    return `url("${String(url).replace(/["\\]/g, '')}")`;
  }

  function render(content = load()) {
    if (!document.querySelector('#main')) return;

    text('.site-header .brand-text', content.general.brand);
    text('.site-footer .brand-text', content.general.brand);
    link('.header-cta', content.general.navCta, '#contacts');

    text('#top .eyebrow', content.hero.eyebrow);
    text('#top .glitch-title', content.hero.title);
    const heroTitle = document.querySelector('#top .glitch-title');
    if (heroTitle) heroTitle.dataset.text = content.hero.title;
    text('#top .hero-text', content.hero.text);
    link('#heroPrimary', content.hero.primaryLabel, content.hero.primaryLink);
    link('#heroSecondary', content.hero.secondaryLabel, content.hero.secondaryLink);
    const meta = document.querySelector('#heroMeta');
    if (meta) meta.innerHTML = content.hero.meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('');

    text('#about .eyebrow', content.about.eyebrow);
    text('#about .section-heading h2', content.about.title);
    text('#about .section-heading > p:last-child', content.about.text);
    const aboutGrid = document.querySelector('#aboutCards');
    if (aboutGrid) {
      aboutGrid.innerHTML = content.about.cards.map((card, index) => `
        <article class="holo-card reveal is-visible">
          <div class="holo-icon">${String(index + 1).padStart(2, '0')}</div>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </article>`).join('');
    }

    text('#audience .eyebrow', content.audience.eyebrow);
    text('#audience .section-heading h2', content.audience.title);
    const audienceGrid = document.querySelector('#audienceCards');
    if (audienceGrid) {
      audienceGrid.innerHTML = content.audience.cards.map((card, index) => `
        <article class="holo-card audience-card reveal is-visible">
          <span class="card-kicker">${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(card.title)}</h3>
        </article>`).join('');
    }

    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) portfolioSection.hidden = !content.portfolio.visible;
    text('#portfolio .eyebrow', content.portfolio.eyebrow);
    text('#portfolio .section-heading h2', content.portfolio.title);
    text('#portfolio .section-heading > p:last-child', content.portfolio.text);
    const portfolioGrid = document.querySelector('#portfolioGrid');
    if (portfolioGrid) {
      portfolioGrid.innerHTML = content.portfolio.items.map((item, index) => {
        const bg = safeBgUrl(item.image);
        const style = bg ? ` style="background-image:${escapeAttr(bg)}"` : '';
        return `
          <article class="portfolio-card reveal is-visible">
            <a class="portfolio-visual" href="${escapeAttr(safeHref(item.link || '#contacts'))}"${style} aria-label="Открыть проект ${escapeAttr(item.title)}">
              <span class="portfolio-index">${String(index + 1).padStart(2, '0')}</span>
              <span class="portfolio-result">${escapeHtml(item.result)}</span>
            </a>
            <div class="portfolio-body">
              <span class="panel-label">${escapeHtml(item.category)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
              <a class="portfolio-link" href="${escapeAttr(safeHref(item.link || '#contacts'))}">Смотреть проект <span aria-hidden="true">↗</span></a>
            </div>
          </article>`;
      }).join('');
    }

    text('#pricing .eyebrow', content.pricing.eyebrow);
    text('#pricing .section-heading h2', content.pricing.title);
    text('#bundlePanel .panel-label', content.pricing.bundleLabel);
    text('#bundlePanel .panel-heading h3', content.pricing.bundleTitle);
    const bundles = document.querySelector('#bundleRows');
    if (bundles) bundles.innerHTML = content.pricing.bundles.map((row) => `
      <tr><td><strong>${escapeHtml(row.name)}</strong></td><td>${escapeHtml(row.includes)}</td><td>${escapeHtml(row.price)}</td><td>${escapeHtml(row.term)}</td></tr>`).join('');
    text('#servicesPanel .panel-label', content.pricing.servicesLabel);
    text('#servicesPanel .panel-heading h3', content.pricing.servicesTitle);
    const services = document.querySelector('#serviceRows');
    if (services) services.innerHTML = content.pricing.services.map((row) => `
      <tr><td><strong>${escapeHtml(row.name)}</strong></td><td>${escapeHtml(row.price)}</td></tr>`).join('');
    text('#supportPanel .panel-label', content.pricing.supportLabel);
    text('#supportPanel h3', content.pricing.supportTitle);
    text('#supportPanel p', content.pricing.supportText);

    const adSection = document.querySelector('#promo');
    if (adSection) adSection.hidden = !content.ad.visible;
    text('#promoBadge', content.ad.badge);
    text('#promoTitle', content.ad.title);
    text('#promoText', content.ad.text);
    link('#promoButton', content.ad.buttonLabel, content.ad.buttonLink);
    text('#promoNote', content.ad.note);

    text('#calculation .eyebrow', content.calculation.eyebrow);
    text('#calculation .section-heading h2', content.calculation.title);
    const calcGrid = document.querySelector('#calcGrid');
    if (calcGrid) calcGrid.innerHTML = content.calculation.panels.map((panel) => `
      <article class="calc-panel reveal is-visible">
        <span class="panel-label">${escapeHtml(panel.label)}</span>
        <h3>${escapeHtml(panel.title)}</h3>
        <ul>${panel.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </article>`).join('');

    text('#why-us .eyebrow', content.why.eyebrow);
    text('#why-us .section-heading h2', content.why.title);
    text('#whyQuote', content.why.quote);

    text('#contacts .eyebrow', content.contacts.eyebrow);
    text('#contacts .contact-copy h2', content.contacts.title);
    text('#contacts .contact-copy > p', content.contacts.text);
    link('#contactTelegramButton', content.contacts.telegramLabel, content.contacts.telegramLink);
    text('#contactTelegram', content.contacts.telegram);
    text('#contactPhone', content.contacts.phone);
    text('#contactDomain', content.contacts.domain);
    text('#contactForm label[for="name"]', content.contacts.nameLabel);
    const nameInput = document.querySelector('#name');
    if (nameInput) nameInput.placeholder = content.contacts.namePlaceholder;
    text('#contactForm label[for="contact"]', content.contacts.contactLabel);
    const contactInput = document.querySelector('#contact');
    if (contactInput) contactInput.placeholder = content.contacts.contactPlaceholder;
    text('#contactForm label[for="task"]', content.contacts.taskLabel);
    const taskInput = document.querySelector('#task');
    if (taskInput) taskInput.placeholder = content.contacts.taskPlaceholder;
    link('#footerTelegram', content.contacts.telegram, content.contacts.telegramLink);
    text('#contactForm button[type="submit"]', content.contacts.formButton);
    text('.site-footer .footer-inner p', content.footer.text);
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(value = '') {
    return escapeHtml(value).replace(/`/g, '&#096;');
  }

  window.SiteCMS = { STORAGE_KEY, defaults: clone(defaults), load, save, reset, render, clone };
})();

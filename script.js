// Применяем контент из встроенной CMS до инициализации анимаций.
if (window.SiteCMS) {
  window.SiteCMS.render();
  window.addEventListener('storage', (event) => {
    if (event.key === window.SiteCMS.STORAGE_KEY) window.SiteCMS.render();
  });
}

// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal-анимации через IntersectionObserver
const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Генерация лёгких частиц без canvas и тяжёлых библиотек
const particlesRoot = document.querySelector('#particles');

if (particlesRoot) {
  const particleCount = window.innerWidth < 680 ? 16 : 30;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    const size = Math.random() * 2.5 + 1.5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = `${Math.random() * 0.5 + 0.15}`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * -14}s`;

    particlesRoot.appendChild(particle);
  }
}

// Параллакс для декоративных слоёв
const parallaxItems = document.querySelectorAll('[data-parallax]');

if (!prefersReducedMotion && parallaxItems.length) {
  let ticking = false;

  const updateParallax = () => {
    const y = window.scrollY;

    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.1);
      item.style.transform = `translate3d(0, ${y * speed * 0.12}px, 0)`;
    });

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Реакция 3D-объекта на движение мыши
const stage = document.querySelector('#holoStage');
const cube = document.querySelector('#holoCube');

if (stage && cube && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cube.style.animationPlayState = 'paused';
    cube.style.transform = `rotateX(${-y * 24}deg) rotateY(${x * 30}deg) translateZ(0)`;
  });

  stage.addEventListener('pointerleave', () => {
    cube.style.transform = '';
    cube.style.animationPlayState = 'running';
  });
}

// Светящийся курсор на desktop
const cursorGlow = document.querySelector('#cursorGlow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform = `translate(${event.clientX - 110}px, ${event.clientY - 110}px)`;
  });

  document.documentElement.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

// Валидация формы
const form = document.querySelector('#contactForm');

if (form) {
  const fields = {
    name: {
      input: document.querySelector('#name'),
      error: document.querySelector('#nameError'),
      validate(value) {
        const v = value.trim();
        if (!v) return 'Введите имя.';
        if (v.length < 2) return 'Имя должно содержать минимум 2 символа.';
        return '';
      }
    },
    contact: {
      input: document.querySelector('#contact'),
      error: document.querySelector('#contactError'),
      validate(value) {
        const v = value.trim();
        if (!v) return 'Укажите телефон или Telegram.';
        const telegram = /^@[a-zA-Z0-9_]{5,32}$/;
        const phone = /^[+()0-9\s-]{7,25}$/;

        if (!telegram.test(v) && !phone.test(v)) {
          return 'Введите телефон или Telegram в формате @username.';
        }

        return '';
      }
    },
    task: {
      input: document.querySelector('#task'),
      error: document.querySelector('#taskError'),
      validate(value) {
        const v = value.trim();
        if (!v) return 'Опишите задачу.';
        if (v.length < 20) return 'Добавьте чуть больше деталей — минимум 20 символов.';
        return '';
      }
    }
  };

  const status = document.querySelector('#formStatus');

  const validateField = (field) => {
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  };

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = Object.values(fields).map(validateField);
    const isValid = results.every(Boolean);

    status.className = 'form-status';

    if (!isValid) {
      status.textContent = 'Проверьте отмеченные поля.';
      const firstInvalid = Object.values(fields).find(
        (field) => field.input.getAttribute('aria-invalid') === 'true'
      );
      firstInvalid?.input.focus();
      return;
    }

    status.classList.add('success');
    status.textContent =
      'Форма заполнена корректно. Перед публикацией подключите реальный обработчик отправки.';
  });
}

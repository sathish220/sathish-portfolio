document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const filters = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');
  filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    filterItems.forEach((item) => {
      const matches = filter === 'all' || item.dataset.category.split(' ').includes(filter);
      item.classList.toggle('hidden', !matches);
    });
  }));

  const contactForm = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if (contactForm && status) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const message = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\n\n${formData.get('message')}`;
      navigator.clipboard?.writeText(message).then(() => {
        status.textContent = 'Your message has been copied. Please send it through LinkedIn until a public contact email is added.';
      }).catch(() => {
        status.textContent = 'Message prepared. Please copy it from the fields and send it through LinkedIn until a public contact email is added.';
      });
    });
  }
});

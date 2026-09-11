const toast = document.querySelector('#toast');
const continueButton = document.querySelector('#continue-button');
const searchInput = document.querySelector('#global-search');
const courseCards = [...document.querySelectorAll('.course-card')];
const notificationButton = document.querySelector('[aria-label="Notificações"]');
const profileButton = document.querySelector('[aria-label="Mais opções"]');
const readingButton = document.querySelector('[aria-label="Abrir leitura"]');
const lessonModal = document.querySelector('#lesson-modal');
const modalTitle = document.querySelector('#modal-title');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

continueButton.addEventListener('click', () => {
  document.querySelector('#trilhas').scrollIntoView({ behavior: 'smooth' });
  showToast('Aula 05: O que é teologia?');
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  courseCards.forEach((card) => {
    card.hidden = query.length > 0 && !card.textContent.toLowerCase().includes(query);
  });
  if (query) showToast(`${courseCards.filter((card) => !card.hidden).length} resultado(s) encontrado(s)`);
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

document.querySelectorAll('.course-card, .reading-panel, .timeline-panel').forEach((card) => {
  card.addEventListener('click', () => showToast('Recurso selecionado. Em breve você poderá aprofundar este tema.'));
});

notificationButton.addEventListener('click', () => showToast('Você tem 1 revisão pendente para hoje.'));
profileButton.addEventListener('click', () => showToast('Perfil de Dante Alves · Explorador'));
readingButton.addEventListener('click', (event) => {
  event.stopPropagation();
  showToast('Leitura aberta: O que significa viver bem?');
});

function openLesson(courseName) {
  modalTitle.textContent = courseName;
  lessonModal.classList.add('open');
  lessonModal.setAttribute('aria-hidden', 'false');
}

function closeLesson() {
  lessonModal.classList.remove('open');
  lessonModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.catalog-card').forEach((card) => {
  card.addEventListener('click', () => openLesson(card.dataset.course));
});

document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeLesson));
document.querySelector('#start-lesson').addEventListener('click', () => {
  closeLesson();
  showToast('Aula iniciada. Seu progresso será salvo neste dispositivo.');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLesson();
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.catalog-card').forEach((card) => {
      card.hidden = filter !== 'todos' && card.dataset.category !== filter;
    });
  });
});

document.querySelector('#membership-button').addEventListener('click', () => {
  document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth' });
  showToast('Escolha uma trilha para começar sua formação.');
});
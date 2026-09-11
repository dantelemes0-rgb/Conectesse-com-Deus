const toast = document.querySelector('#toast');
const lessonModal = document.querySelector('#lesson-modal');
const catalogCards = [...document.querySelectorAll('.catalog-card')];
const courseData = {
  'Hermenêutica: como ler a Bíblia': ['Observe contexto, gênero literário e intenção do texto antes de formular uma interpretação.', ['O texto e seu contexto', 'Gêneros literários', 'Princípios de interpretação']],
  'Homilética prática': ['Estruture mensagens bíblicas claras, fiéis ao texto e conectadas às necessidades da comunidade.', ['O que é um sermão', 'Estrutura e movimento', 'Aplicação e convite']],
  'Liderança com propósito': ['Uma introdução à liderança servidora, tomada de decisão e cuidado com pessoas.', ['Chamado e caráter', 'Liderar servindo', 'Decisões responsáveis']],
  'Aconselhamento e cuidado': ['Princípios de escuta, presença e cuidado pastoral para conversas difíceis.', ['Escuta atenta', 'Limites e responsabilidade', 'Encaminhamento e acompanhamento']],
  'Teologia sistemática': ['Organize os principais temas da fé cristã e compare suas relações com clareza.', ['Doutrina de Deus', 'Cristologia', 'Igreja e esperança']],
  'Missão e evangelismo': ['Descubra princípios bíblicos para comunicar a fé com presença, respeito e responsabilidade.', ['A missão nas Escrituras', 'Conversas significativas', 'Prática e acompanhamento']],
  'Liderança servidora': ['Aprenda a cuidar de equipes, delegar com sabedoria e formar novas lideranças.', ['Caráter e serviço', 'Cultura de equipe', 'Formação de pessoas']],
  'Cuidado da alma': ['Uma trilha introdutória sobre presença, limites e práticas de cuidado integral.', ['Escuta e presença', 'Descanso e limites', 'Comunidade e esperança']]
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function openLesson(courseName) {
  const [description, lessons] = courseData[courseName] || ['Conteúdo introdutório para avançar com método no seu estudo.', ['Aula de abertura', 'Leitura orientada', 'Revisão do tema']];
  document.querySelector('#modal-title').textContent = courseName;
  document.querySelector('#modal-description').textContent = description;
  const lessonList = document.querySelector('#lesson-list');
  lessonList.replaceChildren();
  lessons.forEach((lesson, index) => {
    const row = document.createElement('div');
    row.className = 'lesson-row';
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    const title = document.createElement('strong');
    title.textContent = lesson;
    const status = document.createElement('small');
    status.textContent = index === 0 ? 'Próxima aula' : 'Aula disponível';
    row.append(number, title, status);
    lessonList.append(row);
  });
  lessonModal.classList.add('open');
  lessonModal.setAttribute('aria-hidden', 'false');
}

function closeLesson() {
  lessonModal.classList.remove('open');
  lessonModal.setAttribute('aria-hidden', 'true');
}

document.querySelector('#continue-button').addEventListener('click', () => {
  document.querySelector('#trilhas').scrollIntoView({ behavior: 'smooth' });
  showToast('Aula 05: O que é teologia?');
});

function applySearch(query) {
  const text = query.trim().toLowerCase();
  catalogCards.forEach((card) => { card.hidden = Boolean(text) && !card.textContent.toLowerCase().includes(text); });
  if (text) showToast(`${catalogCards.filter((card) => !card.hidden).length} curso(s) encontrado(s)`);
}

document.querySelector('#global-search').addEventListener('input', (event) => applySearch(event.target.value));
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
  link.classList.add('active');
}));
document.querySelectorAll('.catalog-card').forEach((card) => card.addEventListener('click', () => openLesson(card.dataset.course)));
document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeLesson));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLesson(); });
document.querySelector('#start-lesson').addEventListener('click', () => {
  const completed = Number(localStorage.getItem('logos-aulas-concluidas') || 0) + 1;
  localStorage.setItem('logos-aulas-concluidas', completed);
  closeLesson();
  showToast(`Aula concluída. ${completed} aula(s) registrada(s) neste dispositivo.`);
});
document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  catalogCards.forEach((card) => { card.hidden = filter !== 'todos' && card.dataset.category !== filter; });
}));
document.querySelector('[aria-label="Notificações"]').addEventListener('click', () => showToast('Você tem 1 revisão pendente para hoje.'));
document.querySelector('[aria-label="Mais opções"]').addEventListener('click', () => showToast('Perfil de Dante Alves · Explorador'));
document.querySelector('[aria-label="Abrir leitura"]').addEventListener('click', () => showToast('Leitura aberta: O que significa viver bem?'));
document.querySelector('#membership-button').addEventListener('click', () => { document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth' }); showToast('Escolha uma trilha para começar.'); });

const notesInput = document.querySelector('#notes-input');
const notesCount = document.querySelector('#notes-count');
const savedNotes = localStorage.getItem('logos-notas') || '';
notesInput.value = savedNotes;
notesCount.textContent = `${savedNotes.length} caracteres`;
notesInput.addEventListener('input', () => { notesCount.textContent = `${notesInput.value.length} caracteres`; });
document.querySelector('#save-notes').addEventListener('click', () => { localStorage.setItem('logos-notas', notesInput.value); document.querySelector('#notes-status').textContent = 'Salvas agora'; showToast('Suas notas foram salvas neste dispositivo.'); });
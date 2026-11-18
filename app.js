document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 2. Filtrage des tutoriels (tutoriels.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tutorialCards = document.querySelectorAll('#tutorials-grid .tuto-card');

  const applyFilter = (category) => {
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
    tutorialCards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? 'flex' : 'none';
    });
  };

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    // Appliquer le filtre passé dans l'URL (?cat=Astuces+PC)
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get('cat');
    if (urlCat) {
      applyFilter(urlCat);
    }
  }

  // 3. Quiz interactif (bases.html)
  const quizForm = document.getElementById('quiz-form');
  const quizResult = document.getElementById('quiz-result');
  if (quizForm && quizResult) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const answers = { q1: 'b', q2: 'b', q3: 'b' };
      let score = 0;

      Object.keys(answers).forEach(key => {
        const selected = quizForm.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === answers[key]) {
          score++;
        }
      });

      quizResult.textContent = `Votre score : ${score} / 3 ${score === 3 ? '🎉 Excellent !' : '— Relisez les fiches ci-dessus et réessayez.'}`;
      quizResult.style.color = score === 3 ? '#10b981' : '#2563eb';
    });
  }

  // 4. Éditeur de code en direct (coder.html)
  const editor = document.getElementById('code-editor');
  const preview = document.getElementById('code-preview');
  if (editor && preview) {
    const updatePreview = () => {
      preview.srcdoc = editor.value;
    };
    editor.addEventListener('input', updatePreview);
    updatePreview();
  }
});

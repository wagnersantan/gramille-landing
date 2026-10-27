/* Landing — Andréa Silva
   Duas coisas apenas: revelar seções no scroll e rodar o simulador. */

(function () {
  'use strict';

  /* --- WhatsApp ----------------------------------------------------------- */

  var PHONE = document.body.dataset.whatsapp || '';
  var DEFAULT_MSG =
    'Olá, Andréa! Vim pelo site e gostaria de uma análise do meu caso.';

  function waLink(message) {
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message);
  }

  // Mantém todos os links de contato em sincronia com data-whatsapp no <body>.
  document.querySelectorAll('a[data-wa]').forEach(function (a) {
    a.href = waLink(DEFAULT_MSG);
  });

  /* --- Revelar no scroll -------------------------------------------------- */

  var targets = document.querySelectorAll('[data-reveal]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- Simulador ---------------------------------------------------------- */

  var QUESTIONS = [
    {
      label: 'Pergunta 1 de 3',
      q: 'Qual dessas situações é a sua?',
      options: [
        { k: 'maternidade',   label: 'Sou mãe e quero o salário-maternidade' },
        { k: 'bpc',           label: 'Tenho deficiência ou sou idosa(o) de baixa renda (BPC/LOAS)' },
        { k: 'doenca',        label: 'Estou sem conseguir trabalhar por problema de saúde' },
        { k: 'aposentadoria', label: 'Quero me aposentar ou revisar minha aposentadoria' }
      ]
    },
    {
      label: 'Pergunta 2 de 3',
      q: 'Você já pediu esse benefício no INSS?',
      options: [
        { k: 'negado',  label: 'Pedi e foi negado' },
        { k: 'analise', label: 'Pedi e está em análise há muito tempo' },
        { k: 'nunca',   label: 'Nunca pedi' }
      ]
    },
    {
      label: 'Pergunta 3 de 3',
      q: 'Você tem os documentos em mãos?',
      options: [
        { k: 'sim',   label: 'Sim, tenho carta, laudos e/ou CNIS' },
        { k: 'parte', label: 'Tenho parte deles' },
        { k: 'nao',   label: 'Não sei quais documentos preciso' }
      ]
    }
  ];

  var TITLES = {
    maternidade:   'Muito provavelmente sim — e talvez sem nunca ter contribuído.',
    bpc:           'Seu perfil tem forte chance de BPC/LOAS.',
    doenca:        'Há um caminho claro para auxílio por incapacidade.',
    aposentadoria: 'Vale a pena revisar seu tempo de contribuição.'
  };

  var TEXTS = {
    negado:  'Benefício negado não é fim: a maior parte dos casos que chegam aqui foi indeferida antes e reverteu na via judicial. Me envie a carta de indeferimento.',
    analise: 'Análise parada além do prazo legal pode ser destravada judicialmente. Me envie o número do protocolo.',
    nunca:   'Ótimo — dá para montar o pedido do jeito certo desde o começo e evitar o indeferimento por documentação.'
  };

  var quiz        = document.getElementById('quiz');
  var result      = document.getElementById('quiz-result');
  if (!quiz || !result) return;

  var bars        = quiz.querySelectorAll('[data-bar]');
  var elStep      = document.getElementById('quiz-step');
  var elQuestion  = document.getElementById('quiz-question');
  var elOptions   = document.getElementById('quiz-options');
  var btnBack     = document.getElementById('quiz-back');
  var elTitle     = document.getElementById('result-title');
  var elText      = document.getElementById('result-text');
  var linkResult  = document.getElementById('result-wa');
  var btnRestart  = document.getElementById('quiz-restart');

  var step = 0;
  var answers = [];

  function labelFor(questionIndex, key) {
    var found = QUESTIONS[questionIndex].options.filter(function (o) {
      return o.k === key;
    })[0];
    return found ? found.label : '-';
  }

  function caseMessage() {
    return (
      'Olá, Andréa! Fiz o simulador do site. Situação: ' +
      labelFor(0, answers[0]) +
      '. No INSS: ' + labelFor(1, answers[1]) +
      '. Documentos: ' + labelFor(2, answers[2]) + '.'
    );
  }

  function pick(key) {
    answers = answers.slice(0, step);
    answers.push(key);
    step += 1;
    render();
  }

  function render() {
    var done = step >= QUESTIONS.length;

    quiz.hidden = done;
    result.hidden = !done;

    if (done) {
      elTitle.textContent = TITLES[answers[0]] || 'Seu caso merece uma análise.';

      var text = TEXTS[answers[1]] || '';
      if (answers[2] === 'nao') {
        text += ' Não se preocupe com os documentos: eu te mando a lista exata do que buscar.';
      }
      elText.textContent =
        text.trim() || 'Me envie os detalhes e eu analiso sem custo.';

      linkResult.href = waLink(caseMessage());
      return;
    }

    var current = QUESTIONS[step];

    bars.forEach(function (bar, i) {
      bar.classList.toggle('is-done', i <= step);
    });

    elStep.textContent = current.label;
    elQuestion.textContent = current.q;

    elOptions.textContent = '';
    current.options.forEach(function (option) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__option';
      btn.textContent = option.label;
      btn.addEventListener('click', function () { pick(option.k); });
      elOptions.appendChild(btn);
    });

    btnBack.hidden = step === 0;
  }

  btnBack.addEventListener('click', function () {
    step = Math.max(0, step - 1);
    render();
  });

  btnRestart.addEventListener('click', function () {
    step = 0;
    answers = [];
    render();
  });

  render();
})();

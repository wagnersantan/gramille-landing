/* Landing — Gramille Soares
   Duas coisas apenas: revelar seções no scroll e montar o resumo do caso. */

(function () {
  'use strict';

  /* --- WhatsApp ----------------------------------------------------------- */

  var root = document.querySelector('[data-whatsapp]');
  var PHONE = (root && root.dataset.whatsapp) || '';
  var DEFAULT_MSG =
    'Olá, Gramille! Vim pelo site e gostaria de conversar sobre o meu caso.';

  function waLink(message) {
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message);
  }

  // Mantém todos os links de contato em sincronia com data-whatsapp.
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

  /* --- Organize seu caso -------------------------------------------------- */
  /* Não avalia direito nem promete resultado: só organiza as respostas e monta
     a mensagem que vai para o WhatsApp. */

  var QUESTIONS = [
    {
      label: 'Pergunta 1 de 3',
      q: 'Sobre o que é o seu caso?',
      options: [
        { k: 'imobiliario',   label: 'Imóvel: compra, venda, aluguel, contrato ou regularização' },
        { k: 'consumidor',    label: 'Consumo: cobrança, banco, plano de saúde, produto ou serviço' },
        { k: 'previdenciario', label: 'INSS: aposentadoria, auxílio, BPC ou outro benefício' },
        { k: 'outro',         label: 'Outro assunto ou ainda não sei' }
      ]
    },
    {
      label: 'Pergunta 2 de 3',
      q: 'Em que ponto você está?',
      options: [
        { k: 'inicio',   label: 'Ainda não tomei nenhuma providência' },
        { k: 'tentei',   label: 'Já tentei resolver direto com a outra parte, a empresa ou o INSS' },
        { k: 'cobranca', label: 'Já recebi notificação, negativa, cobrança ou processo' }
      ]
    },
    {
      label: 'Pergunta 3 de 3',
      q: 'Você tem documentos do caso em mãos?',
      options: [
        { k: 'sim',   label: 'Sim, tenho contrato, protocolo, laudo ou comprovantes' },
        { k: 'parte', label: 'Tenho só uma parte deles' },
        { k: 'nao',   label: 'Ainda não sei quais documentos reunir' }
      ]
    }
  ];

  var TITLES = {
    imobiliario:    'Seu caso envolve Direito Imobiliário.',
    consumidor:     'Seu caso envolve Direito do Consumidor.',
    previdenciario: 'Seu caso envolve Direito Previdenciário.',
    outro:          'Vamos entender o seu caso com calma.'
  };

  var TEXTS = {
    inicio:   'Como você ainda não tomou nenhuma providência, é um bom momento para conversar antes de assinar, pagar ou responder qualquer coisa.',
    tentei:   'Guarde os protocolos, e-mails e conversas da sua tentativa de resolver direto. Eles ajudam a entender o que já foi feito.',
    cobranca: 'Se há prazo correndo, vale conversar o quanto antes. Envie a notificação, a negativa ou a cobrança que você recebeu.'
  };

  var DOCS = {
    sim:   ' Você já tem documentos, e isso ajuda a conversa a começar mais adiantada.',
    parte: ' Envie o que tiver em mãos; o que faltar, eu te oriento a reunir.',
    nao:   ' Sem problema quanto aos documentos: na conversa eu explico o que reunir.'
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
      'Olá, Gramille! Preenchi o resumo do site. Assunto: ' +
      labelFor(0, answers[0]) +
      '. Situação: ' + labelFor(1, answers[1]) +
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
      elTitle.textContent = TITLES[answers[0]] || 'Vamos entender o seu caso com calma.';
      elText.textContent = ((TEXTS[answers[1]] || '') + (DOCS[answers[2]] || '')).trim() ||
        'Me envie os detalhes e eu explico os próximos passos.';
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

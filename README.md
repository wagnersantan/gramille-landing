# Andréa Silva — Direito Previdenciário

Landing page estática, sem build e sem dependências. Importada do projeto
Claude Design *"Landing page para advogada Andrea Silva"*
(`Landing Andrea Silva.dc.html`).

```
index.html    marcação e conteúdo
styles.css    design tokens + layout
main.js       revelação no scroll + simulador "Tenho direito?"
assets/       fotos
```

## Rodar

Qualquer servidor estático:

```sh
python3 -m http.server 8000   # http://localhost:8000
```

## O que precisa ser preenchido antes de publicar

A página ainda está com um placeholder de texto simples:

| Onde | Placeholder |
| --- | --- |
| Rodapé | e-mail |

## WhatsApp

O número (5573988278344) aparece em `data-whatsapp` no `<body>` — fonte da
verdade, usada pelo JS para montar os links com a mensagem pré-preenchida —
e nos `href="https://wa.me/…"` estáticos, que servem de fallback caso o JS
não carregue. Para trocar o número, atualize os dois com um
find-and-replace de `5573988278344`.

## Fotos que faltam

Três slots ficaram como placeholder tracejado, iguais aos `<image-slot>` do
design. Para preencher, troque a `<div class="photo-slot">` por uma `<img>`:

- **Instagram** — posts 2, 3 e 4 (proporção 4:5)

## Simulador

Três perguntas em `main.js` (`QUESTIONS`), com títulos por área (`TITLES`) e
textos por situação no INSS (`TEXTS`). O resultado monta um link `wa.me` com as
três respostas na mensagem, para a conversa já começar com o caso descrito.

## Notas de implementação

- O template do design usava o runtime do Claude Design (`x-dc`, `sc-for`,
  `sc-if`, `support.js`). Aqui as listas — áreas de atuação e passos — são HTML
  estático, então aparecem para buscadores e sem JavaScript.
- Sem JS a página inteira continua legível: as animações de entrada ficam
  desligadas, os links de WhatsApp funcionam, e o simulador exibe um `noscript`
  apontando para o WhatsApp.
- No mobile (< 760px) os links de navegação do header saem, mantendo marca e
  CTA — o header do design quebrava em três linhas e comia metade da tela.
  As seções seguem acessíveis pelo scroll e pelo rodapé.
- `prefers-reduced-motion` desliga revelação, pulso do botão e scroll suave.

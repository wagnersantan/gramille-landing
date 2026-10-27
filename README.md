# Gramille Soares — Advocacia

Landing page estática, sem build e sem dependências. Adaptada do modelo
"Andréa Silva — Direito Previdenciário" (mesma estrutura de arquivos).

```
index.html    marcação e conteúdo
styles.css    design tokens + layout
main.js       revelação no scroll + resumo "Organize seu caso"
assets/       fotos (ainda não há)
```

## Rodar

```sh
python3 -m http.server 8000   # http://localhost:8000
```

## O que ainda precisa ser preenchido antes de publicar

- **Número da OAB/BA.** Foi retirado da página por enquanto. O Provimento
  nº 205/2021 pede nome e número de inscrição na publicidade, então inclua
  antes de divulgar: no hero (`hero__partner`), no selo da foto (`hero__badge`),
  no cartão "Sobre" (`credential`), no rodapé (`footer-brand__role`) e no
  texto legal.
- E-mail e endereço do escritório (opcionais; não constam na página).

WhatsApp atual: `557391985191` (aparece em `data-whatsapp` no `<body>` e nos
`href` estáticos; para trocar, find-and-replace). Confira se o link abre a
conversa certa: o número foi copiado do WhatsApp com 8 dígitos depois do DDD.

Fotos: há dois blocos tracejados (topo e "Sobre"). Para colocar as fotos, crie a
pasta `assets/`, adicione `gramille-hero.jpg` e `gramille-sobre.jpg` e troque
cada bloco por `<img class="hero__photo" src="assets/gramille-hero.jpg" alt="...">`
e `<img class="sobre__photo photo-slot--portrait" src="assets/gramille-sobre.jpg" alt="...">`.

## Conformidade com a publicidade da advocacia (OAB)

O modelo original tinha frases que advogados inscritos não podem usar. Nesta
versão foram removidas ou reescritas:

- "análise sem custo", "não paga nada adiantado", "é grátis" (oferta de serviço
  gratuito e captação de clientela);
- "+900 benefícios conquistados" e promessas de resultado;
- "prioridade de atendimento no mesmo dia";
- simulador que dizia "muito provavelmente sim" ou "forte chance". Agora ele só
  organiza as respostas e monta a mensagem para o WhatsApp.

O rodapé cita o Provimento nº 205/2021 do CFOAB. Vale a Gramille conferir o
texto final com a OAB/BA ou com a comissão de ética antes de publicar.

## Instagram

O bloco do Instagram aponta para `@gramillesoares.adv`. Quando houver mais
posts, dá para voltar à grade de artes do modelo (ver `.photo-slot` e `.ig-tile`
em `styles.css`).

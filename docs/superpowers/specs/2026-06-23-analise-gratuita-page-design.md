# Design — Página "/analise-gratuita" (landing de captação)

Data: 2026-06-23
Status: aprovado para planejamento

## Objetivo

Criar uma nova landing page de captação de leads cujo objetivo único é fazer o
visitante solicitar uma análise gratuita das suas campanhas de tráfego pago.
A página usa toda a copy de `copy.md` e termina num formulário de 1 etapa que,
ao ser enviado, redireciona o lead para o WhatsApp com os dados preenchidos.

## Decisões fechadas

| Tema | Decisão |
|------|---------|
| Submissão | WhatsApp (`5588999030508`) — ao enviar, monta mensagem com os dados, dispara conversão GTM e abre o WhatsApp |
| Identidade visual | Marca Ei Chefe Ads: fundo escuro `#030406`, acentos `#2A25A6`/`#604EE9`, Poppins, cantos arredondados, CTAs "pill". Referência p9 só como guia de layout/UX |
| Estrutura | Landing completa (toda a `copy.md`) + formulário de 1 etapa |
| Rota | `/analise-gratuita` |
| Implementação do form | Ilha React (`form-analise.tsx`), padrão do `results-calculator.tsx`, hidratada com `client:visible` |

## Contexto técnico

- Astro 5 + Tailwind v4 + React (ilhas). Fonte Poppins. Build **estático** (sem SSR/backend).
- Layout base: `src/layouts/Layout.astro` (GTM, Meta Pixel, SEO). Aceita `title`, `description`, `canonical`.
- Captação atual do site é toda via WhatsApp + conversão GTM (ver `whatsapp-button.astro`):
  `gtag('event', 'conversion', { send_to: 'AW-824780487/68QoCPeiz4sYEMfNpIkD', ... })`.
- Reaproveitar `footer.astro`.

## Arquivos

| Arquivo | Papel |
|---------|-------|
| `src/pages/analise-gratuita.astro` | Página: monta as seções + `<Layout>` com SEO próprio |
| `src/components/analise/hero.astro` | Seção Hero (logo, H1, sub, apoio, CTA → `#form`) |
| `src/components/analise/identificacao.astro` | Seção de dores (4 cards) |
| `src/components/analise/valor-reuniao.astro` | Seção de valor (4 itens com check) |
| `src/components/analise/form-analise.tsx` | Ilha React do formulário (validação + WhatsApp + GTM) |
| `src/components/analise/reforco.astro` | Texto de reforço pós-formulário |

Observação: agrupar os componentes novos em `src/components/analise/` para não
poluir a raiz de `components/`, que já está grande. Footer reutiliza o existente.

## Seções (conteúdo de `copy.md`)

1. **Hero**
   - Logo Ei Chefe (`/images/logos/ei-chefe-logo.svg`).
   - H1: "Transforme seus anúncios em uma máquina previsível de vendas".
   - Subheadline: "Aumente suas vendas usando melhor o orçamento que você já tem — sem precisar investir mais em mídia."
   - Apoio: "Descubra onde você está perdendo dinheiro, o que está travando suas campanhas e como escalar resultados com o mesmo investimento."
   - CTA: "Quero melhorar meus resultados" → âncora `#form`.
   - Fundo: `bg-hero.webp` + gradiente, igual ao hero atual.

2. **Identificação**
   - Pergunta-gancho: "Você já investe (ou quer investir) em tráfego pago, mas sente que poderia estar vendendo mais com o mesmo orçamento?"
   - 4 cards: Campanhas que não performam · Leads que não viram vendas · Custo por aquisição alto · Falta de previsibilidade.
   - Fecho: "Se você se identifica com isso, essa reunião é pra você."

3. **Valor da reunião**
   - Título: "O que você vai ganhar nessa conversa:".
   - 4 itens com ícone de check (Lucide): diagnóstico rápido · desperdícios de verba · oportunidades de conversão · direcionamento para escalar.
   - Fecho: "Sem compromisso. Sem enrolação. Só clareza."

4. **Formulário** (`id="form"`, centro da página, 1 etapa)
   - Título: "Solicite sua análise gratuita".
   - Subtexto: "Leva menos de 1 minuto. Vamos usar essas informações para entender seu cenário antes da reunião."
   - Campos:
     - Nome — **obrigatório**, texto.
     - Empresa — opcional, texto.
     - Telefone (WhatsApp) — **obrigatório**, `inputmode="tel"`.
     - Segmento do negócio — `select`. Opções: Negócio local / Serviços · E-commerce · Infoproduto · Indústria / B2B · Clínica / Saúde · Outros.
     - Descrição rápida do que você vende ou faz — `textarea`, opcional.
   - CTA: "Quero minha análise".
   - Microcopy abaixo: "Seus dados estão seguros e não serão compartilhados." · "Entraremos em contato apenas para tratar da sua análise." · "Vagas limitadas por semana para garantir qualidade no atendimento."

5. **Reforço**
   - "Após enviar, você será direcionado para agendar o melhor horário para nossa conversa." (encaixa com o redirect ao WhatsApp).

6. **Footer** — reutiliza `footer.astro`.

## Comportamento do formulário (`form-analise.tsx`)

1. Validação no submit (e on-blur): Nome e Telefone obrigatórios. Erro exibido
   abaixo do campo; foco move para o primeiro campo inválido; `aria-live` anuncia erros.
2. Monta a mensagem do WhatsApp:
   ```
   Olá! Quero minha análise gratuita.
   Nome: {nome}
   Empresa: {empresa}
   Telefone: {telefone}
   Segmento: {segmento}
   O que faço/vendo: {descricao}
   ```
   (linhas com campos vazios são omitidas).
3. Dispara conversão GTM/Google Ads reaproveitando o mesmo `send_to` do site,
   com `event_callback` que faz o redirect para
   `https://api.whatsapp.com/send?phone=5588999030508&text=<mensagem>` (mesmo padrão
   de `gtag_report_conversion`). Fallback de redirect se o callback não disparar.
4. Estado de loading no botão durante o processo (desabilita + spinner/label).

## Acessibilidade / UX (ui-ux-pro-max)

- Labels visíveis em todos os campos (nunca placeholder-only).
- Alvos de toque ≥44px; foco visível (ring) em inputs e botões.
- Contraste AA no tema escuro (texto claro sobre `#030406`/cards).
- Erros via `role="alert"` / `aria-live="polite"`, próximos ao campo.
- `prefers-reduced-motion` respeitado em qualquer transição.
- Mobile-first; sem scroll horizontal; container `max-w` consistente com o site (`max-w-[1620px]` nas seções largas, form mais estreito).

## Fora de escopo

- Backend/persistência de leads (mantém-se WhatsApp).
- Agendamento embarcado (Calendly etc.).
- Variações A/B de CTA (a `copy.md` lista variações, mas usamos o CTA principal).
- Link da página no menu/navegação do site (pode ser tratado depois).

## Critérios de sucesso (verificáveis)

- `npm run build` conclui sem erros e gera `/analise-gratuita`.
- Formulário valida Nome e Telefone obrigatórios e bloqueia envio inválido.
- Envio válido abre o WhatsApp com a mensagem montada a partir dos campos.
- Conversão GTM disparada no envio (mesmo `send_to` do site).
- Visual coerente com a marca (cores/fonte/raio) e responsivo em 375px.

# Landing "/analise-gratuita" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma landing page de captação em `/analise-gratuita` que usa toda a `copy.md` e termina num formulário de 1 etapa que valida, dispara conversão GTM e redireciona o lead para o WhatsApp com os dados preenchidos.

**Architecture:** Página Astro estática (`src/pages/analise-gratuita.astro`) que compõe seções `.astro` (hero, identificação, valor, reforço) + reaproveita `footer.astro`, mais uma ilha React (`form-analise.tsx`) hidratada com `client:visible` para o formulário. Tudo estilizado na marca Ei Chefe (fundo `#030406`, acentos `#2A25A6`/`#604EE9`, Poppins, cantos arredondados) com Tailwind v4.

**Tech Stack:** Astro 5, Tailwind v4, React 19 (ilha), `lucide-react`, `cn` (`src/lib/utils.ts`).

---

## Nota sobre verificação (sem framework de testes)

O repositório **não possui** runner de testes nem dependências de teste (ver `package.json`). Instalar um framework só para esta landing seria over-engineering (YAGNI). Portanto:

- **Verificação automática:** `npm run build` deve concluir sem erros e emitir `dist/analise-gratuita/index.html`.
- **Verificação manual:** `npm run dev` e abrir `http://localhost:4321/analise-gratuita` para conferir layout, validação e redirect.
- A lógica pura do formulário (montagem da mensagem e validação) fica isolada em funções no topo do `form-analise.tsx`, fáceis de inspecionar.

Comando de build esperado em todas as tarefas:
```bash
npm run build
```
Esperado: termina com "Complete!" / sem erros; existe `dist/analise-gratuita/index.html` a partir da Task 1.

---

## File Structure

| Arquivo | Responsabilidade |
|---------|------------------|
| Create: `src/pages/analise-gratuita.astro` | Página: `<Layout>` com SEO + composição das seções + `Footer` |
| Create: `src/components/analise/hero.astro` | Seção Hero (logo, H1, sub, apoio, CTA → `#form`) |
| Create: `src/components/analise/identificacao.astro` | Seção de dores (pergunta + 4 cards + fecho) |
| Create: `src/components/analise/valor-reuniao.astro` | Seção de valor (4 itens com check + fecho) |
| Create: `src/components/analise/form-analise.tsx` | Ilha React: formulário, validação, WhatsApp + GTM |
| Create: `src/components/analise/reforco.astro` | Texto de reforço pós-formulário |
| Reuse: `src/components/footer.astro` | Rodapé existente |
| Reuse: `src/layouts/Layout.astro` | Layout base (Poppins, GTM, Meta Pixel, SEO) |

---

## Task 1: Página base + rota

**Files:**
- Create: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar a página com Layout + Footer**

```astro
---
import Footer from '@/components/footer.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout
  title="Solicite sua Análise Gratuita | Ei Chefe Ads"
  description="Descubra onde você está perdendo dinheiro nas suas campanhas e como escalar resultados com o mesmo investimento. Solicite uma análise gratuita das suas campanhas de tráfego pago."
  canonical="https://eichefeads.com.br/analise-gratuita"
>
  <main class="bg-[#030406] flex flex-col">
    <Footer className="mt-20" />
  </main>
</Layout>
```

- [ ] **Step 2: Build para confirmar a rota**

Run: `npm run build`
Esperado: sucesso e arquivo `dist/analise-gratuita/index.html` gerado.

- [ ] **Step 3: Commit**

```bash
git add src/pages/analise-gratuita.astro
git commit -m "feat: scaffold /analise-gratuita page with layout and footer"
```

---

## Task 2: Seção Hero

**Files:**
- Create: `src/components/analise/hero.astro`
- Modify: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar o componente Hero**

```astro
---
import StarIcon from '@lucide/astro/icons/star';
---

<section
  class="pt-[60px] pb-24 px-4 md:pb-32"
  style="background-image: url(/images/bg-hero.webp); background-size: cover; background-position-x: right;"
>
  <div class="max-w-[1100px] mx-auto w-full flex flex-col gap-8">
    <img
      src="/images/logos/ei-chefe-logo.svg"
      alt="Ei Chefe Logo"
      width="163"
      height="53"
      loading="eager"
    />
    <h1 class="text-white text-[40px] leading-[105%] font-medium md:text-[72px]">
      Transforme seus anúncios em uma máquina previsível de vendas
    </h1>
    <p class="text-[#F3F3F3] text-lg md:text-2xl font-light max-w-[760px]">
      Aumente suas vendas usando melhor o orçamento que você já tem — sem
      precisar investir mais em mídia.
    </p>
    <p class="text-[#B8B8C0] text-base md:text-lg max-w-[760px]">
      Descubra onde você está perdendo dinheiro, o que está travando suas
      campanhas e como escalar resultados com o mesmo investimento.
    </p>
    <div class="flex flex-wrap items-center gap-3">
      <StarIcon class="size-4 fill-[#FFA826] stroke-0" />
      <StarIcon class="size-4 fill-[#FFA826] stroke-0" />
      <StarIcon class="size-4 fill-[#FFA826] stroke-0" />
      <StarIcon class="size-4 fill-[#FFA826] stroke-0" />
      <StarIcon class="size-4 fill-[#FFA826] stroke-0" />
      <span class="text-white/70 text-sm">Resultados com tráfego pago</span>
    </div>
    <a
      href="#form"
      class="bg-[#604EE9] hover:bg-[#5040d0] transition-colors py-4 px-9 rounded-[30px] text-white font-medium max-w-max text-base md:text-lg"
    >
      Quero melhorar meus resultados
    </a>
  </div>
</section>
```

- [ ] **Step 2: Inserir o Hero na página (antes do Footer)**

Em `src/pages/analise-gratuita.astro`, adicionar o import e o componente:

```astro
---
import Hero from '@/components/analise/hero.astro';
import Footer from '@/components/footer.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout
  title="Solicite sua Análise Gratuita | Ei Chefe Ads"
  description="Descubra onde você está perdendo dinheiro nas suas campanhas e como escalar resultados com o mesmo investimento. Solicite uma análise gratuita das suas campanhas de tráfego pago."
  canonical="https://eichefeads.com.br/analise-gratuita"
>
  <main class="bg-[#030406] flex flex-col">
    <Hero />
    <Footer className="mt-20" />
  </main>
</Layout>
```

- [ ] **Step 3: Build + checagem visual**

Run: `npm run build`
Esperado: sucesso. Opcional: `npm run dev` → `http://localhost:4321/analise-gratuita` mostra hero com logo, H1, CTA roxo.

- [ ] **Step 4: Commit**

```bash
git add src/components/analise/hero.astro src/pages/analise-gratuita.astro
git commit -m "feat: add hero section to /analise-gratuita"
```

---

## Task 3: Seção Identificação (dores)

**Files:**
- Create: `src/components/analise/identificacao.astro`
- Modify: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar o componente**

```astro
---
const dores = [
  'Campanhas que não performam como deveriam',
  'Leads que não viram vendas',
  'Custo por aquisição alto',
  'Falta de previsibilidade',
];
---

<section class="px-4 py-16 md:py-20">
  <div class="max-w-[1100px] mx-auto w-full flex flex-col gap-10">
    <h2 class="text-white text-[28px] md:text-[40px] font-medium leading-[115%] max-w-[860px]">
      Você já investe (ou quer investir) em tráfego pago, mas sente que poderia
      estar vendendo mais com o mesmo orçamento?
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {
        dores.map((dor) => (
          <div class="bg-[#1C1C1C] rounded-[28px] px-7 py-8 text-white text-lg md:text-xl font-normal leading-[140%]">
            {dor}
          </div>
        ))
      }
    </div>
    <p class="text-[#B8B8C0] text-lg md:text-xl">
      Se você se identifica com isso, essa reunião é pra você.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Inserir após o Hero**

Em `src/pages/analise-gratuita.astro`, adicionar `import Identificacao from '@/components/analise/identificacao.astro';` e colocar `<Identificacao />` logo abaixo de `<Hero />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Esperado: sucesso.

- [ ] **Step 4: Commit**

```bash
git add src/components/analise/identificacao.astro src/pages/analise-gratuita.astro
git commit -m "feat: add identification (pain points) section"
```

---

## Task 4: Seção Valor da reunião

**Files:**
- Create: `src/components/analise/valor-reuniao.astro`
- Modify: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar o componente**

```astro
---
import CheckIcon from '@lucide/astro/icons/check';

const ganhos = [
  'Um diagnóstico rápido das suas campanhas atuais',
  'Identificação de possíveis desperdícios de verba',
  'Oportunidades práticas para melhorar conversão',
  'Direcionamento claro para escalar seus resultados',
];
---

<section class="px-4 py-16 md:py-20">
  <div
    class="max-w-[1100px] mx-auto w-full bg-[#2A25A6] rounded-[40px] px-7 py-12 md:px-14 md:py-16 flex flex-col gap-8"
  >
    <h2 class="text-white text-[28px] md:text-[40px] font-medium leading-[115%]">
      O que você vai ganhar nessa conversa:
    </h2>
    <ul class="flex flex-col gap-5">
      {
        ganhos.map((ganho) => (
          <li class="flex items-start gap-4 text-white text-lg md:text-xl">
            <span
              class="shrink-0 size-7 rounded-full bg-white/20 flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              <CheckIcon class="size-4 text-white" />
            </span>
            {ganho}
          </li>
        ))
      }
    </ul>
    <p class="text-white/80 text-lg md:text-xl font-light italic">
      Sem compromisso. Sem enrolação. Só clareza.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Inserir após Identificação**

Em `src/pages/analise-gratuita.astro`, adicionar `import ValorReuniao from '@/components/analise/valor-reuniao.astro';` e colocar `<ValorReuniao />` abaixo de `<Identificacao />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Esperado: sucesso.

- [ ] **Step 4: Commit**

```bash
git add src/components/analise/valor-reuniao.astro src/pages/analise-gratuita.astro
git commit -m "feat: add meeting value section"
```

---

## Task 5: Formulário (ilha React)

**Files:**
- Create: `src/components/analise/form-analise.tsx`
- Modify: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar a ilha React do formulário**

Conteúdo completo de `src/components/analise/form-analise.tsx`:

```tsx
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

const WHATSAPP_PHONE = '5588999030508';
const GTM_SEND_TO = 'AW-824780487/68QoCPeiz4sYEMfNpIkD';

const SEGMENTOS = [
  'Negócio local / Serviços',
  'E-commerce',
  'Infoproduto',
  'Indústria / B2B',
  'Clínica / Saúde',
  'Outros',
];

interface FormState {
  nome: string;
  empresa: string;
  telefone: string;
  segmento: string;
  descricao: string;
}

type FieldErrors = Partial<Record<'nome' | 'telefone', string>>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function buildWhatsAppUrl(data: FormState): string {
  const lines = [
    'Olá! Quero minha análise gratuita.',
    `Nome: ${data.nome.trim()}`,
    data.empresa.trim() && `Empresa: ${data.empresa.trim()}`,
    `Telefone: ${data.telefone.trim()}`,
    data.segmento && `Segmento: ${data.segmento}`,
    data.descricao.trim() && `O que faço/vendo: ${data.descricao.trim()}`,
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join('\n'));
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
}

export function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.nome.trim()) errors.nome = 'Informe seu nome';
  if (!data.telefone.trim()) errors.telefone = 'Informe seu telefone';
  return errors;
}

const INITIAL: FormState = {
  nome: '',
  empresa: '',
  telefone: '',
  segmento: '',
  descricao: '',
};

const inputClass =
  'w-full bg-transparent border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-white/40 text-base outline-none focus:border-[#604EE9] transition-colors';
const labelClass = 'block text-white text-sm font-light mb-2';
const errorClass = 'text-red-400 text-sm mt-1';

export function FormAnalise() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const nomeRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormState, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: 'nome' | 'telefone') => {
    if (!data[field].trim()) {
      setErrors((prev) => ({ ...prev, [field]: validate(data)[field] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(data);
    setErrors(newErrors);
    if (newErrors.nome) {
      nomeRef.current?.focus();
      return;
    }
    if (newErrors.telefone) {
      telefoneRef.current?.focus();
      return;
    }

    setLoading(true);
    const url = buildWhatsAppUrl(data);
    let redirected = false;
    const redirect = () => {
      if (redirected) return;
      redirected = true;
      window.location.href = url;
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: GTM_SEND_TO,
        event_callback: redirect,
        allow_enhanced_conversions: true,
      });
      window.setTimeout(redirect, 1200);
    } else {
      redirect();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#0A0A1F] rounded-[32px] p-7 md:p-10 border-2 border-[#2A25A6]/50 shadow-[0_0_40px_rgba(42,37,166,0.4)] flex flex-col gap-5"
    >
      <div>
        <label htmlFor="nome" className={labelClass}>
          Nome <span className="text-[#604EE9]">*</span>
        </label>
        <input
          ref={nomeRef}
          id="nome"
          type="text"
          className={inputClass}
          value={data.nome}
          onChange={(e) => update('nome', e.target.value)}
          onBlur={() => handleBlur('nome')}
          aria-required="true"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'nome-error' : undefined}
        />
        {errors.nome && (
          <p id="nome-error" className={errorClass} role="alert">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="empresa" className={labelClass}>
          Empresa
        </label>
        <input
          id="empresa"
          type="text"
          className={inputClass}
          value={data.empresa}
          onChange={(e) => update('empresa', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="telefone" className={labelClass}>
          Telefone (WhatsApp) <span className="text-[#604EE9]">*</span>
        </label>
        <input
          ref={telefoneRef}
          id="telefone"
          type="tel"
          inputMode="tel"
          className={inputClass}
          placeholder="(88) 99999-0000"
          value={data.telefone}
          onChange={(e) => update('telefone', e.target.value)}
          onBlur={() => handleBlur('telefone')}
          aria-required="true"
          aria-invalid={!!errors.telefone}
          aria-describedby={errors.telefone ? 'telefone-error' : undefined}
        />
        {errors.telefone && (
          <p id="telefone-error" className={errorClass} role="alert">
            {errors.telefone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="segmento" className={labelClass}>
          Segmento do negócio
        </label>
        <div className="relative">
          <select
            id="segmento"
            className={`${inputClass} appearance-none pr-12`}
            value={data.segmento}
            onChange={(e) => update('segmento', e.target.value)}
          >
            <option value="" className="bg-[#1A1A2E] text-white">
              Selecione uma opção
            </option>
            {SEGMENTOS.map((seg) => (
              <option key={seg} value={seg} className="bg-[#1A1A2E] text-white">
                {seg}
              </option>
            ))}
          </select>
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="descricao" className={labelClass}>
          Descrição rápida do que você vende ou faz
        </label>
        <textarea
          id="descricao"
          rows={3}
          className={`${inputClass} resize-none`}
          value={data.descricao}
          onChange={(e) => update('descricao', e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-[#604EE9] hover:bg-[#5040d0] disabled:opacity-60 text-white py-4 rounded-2xl font-medium text-base transition-colors"
      >
        {loading ? 'Enviando...' : 'Quero minha análise'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Criar a seção do formulário na página e montar a ilha**

Em `src/pages/analise-gratuita.astro`, adicionar o import da ilha e uma `<section id="form">` envolvendo título, subtexto, `<FormAnalise client:visible />` e a microcopy. Estado final da página (com tudo das tasks anteriores):

```astro
---
import Hero from '@/components/analise/hero.astro';
import Identificacao from '@/components/analise/identificacao.astro';
import ValorReuniao from '@/components/analise/valor-reuniao.astro';
import { FormAnalise } from '@/components/analise/form-analise.tsx';
import Footer from '@/components/footer.astro';
import Layout from '@/layouts/Layout.astro';
---

<Layout
  title="Solicite sua Análise Gratuita | Ei Chefe Ads"
  description="Descubra onde você está perdendo dinheiro nas suas campanhas e como escalar resultados com o mesmo investimento. Solicite uma análise gratuita das suas campanhas de tráfego pago."
  canonical="https://eichefeads.com.br/analise-gratuita"
>
  <main class="bg-[#030406] flex flex-col">
    <Hero />
    <Identificacao />
    <ValorReuniao />
    <section id="form" class="px-4 py-16 md:py-20 scroll-mt-8">
      <div class="max-w-[620px] mx-auto w-full flex flex-col gap-8">
        <div class="flex flex-col gap-3 text-center">
          <h2 class="text-white text-[28px] md:text-[40px] font-medium leading-[115%]">
            Solicite sua análise gratuita
          </h2>
          <p class="text-[#B8B8C0] text-base md:text-lg">
            Leva menos de 1 minuto. Vamos usar essas informações para entender
            seu cenário antes da reunião.
          </p>
        </div>
        <FormAnalise client:visible />
        <ul class="flex flex-col gap-2 text-[#8A8A92] text-sm text-center">
          <li>Seus dados estão seguros e não serão compartilhados.</li>
          <li>Entraremos em contato apenas para tratar da sua análise.</li>
          <li>Vagas limitadas por semana para garantir qualidade no atendimento.</li>
        </ul>
      </div>
    </section>
    <Footer className="mt-20" />
  </main>
</Layout>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Esperado: sucesso; nenhum erro de tipos TS no `.tsx`.

- [ ] **Step 4: Checagem manual do comportamento**

Run: `npm run dev`
Abrir `http://localhost:4321/analise-gratuita` e verificar:
- Enviar com Nome/Telefone vazios → mostra erros abaixo dos campos e foca o primeiro inválido.
- Preencher Nome + Telefone → ao enviar, abre `api.whatsapp.com/send?...` com a mensagem montada (Nome/Telefone presentes; campos vazios omitidos).
- CTA do Hero "Quero melhorar meus resultados" rola até o formulário.

- [ ] **Step 5: Commit**

```bash
git add src/components/analise/form-analise.tsx src/pages/analise-gratuita.astro
git commit -m "feat: add single-step lead form island with whatsapp + gtm conversion"
```

---

## Task 6: Seção Reforço

**Files:**
- Create: `src/components/analise/reforco.astro`
- Modify: `src/pages/analise-gratuita.astro`

- [ ] **Step 1: Criar o componente**

```astro
---
import CalendarIcon from '@lucide/astro/icons/calendar-check';
---

<section class="px-4 pb-4">
  <div
    class="max-w-[620px] mx-auto w-full flex items-center gap-4 bg-white/[8%] rounded-[28px] px-7 py-6 text-[#DDD] text-base md:text-lg"
  >
    <CalendarIcon class="size-6 text-[#604EE9] shrink-0" aria-hidden="true" />
    <p>
      Após enviar, você será direcionado para agendar o melhor horário para
      nossa conversa.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Inserir entre a seção do formulário e o Footer**

Em `src/pages/analise-gratuita.astro`, adicionar `import Reforco from '@/components/analise/reforco.astro';` e colocar `<Reforco />` imediatamente após o fechamento da `<section id="form">` e antes de `<Footer />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Esperado: sucesso.

- [ ] **Step 4: Commit**

```bash
git add src/components/analise/reforco.astro src/pages/analise-gratuita.astro
git commit -m "feat: add post-form reinforcement section"
```

---

## Task 7: Verificação final (responsividade, a11y, build)

**Files:** nenhum (verificação); pequenos ajustes se necessário.

- [ ] **Step 1: Lint/diagnóstico dos arquivos novos**

Conferir que não há erros de TypeScript/JSX nos arquivos criados (usar o diagnóstico do editor / ReadLints sobre `src/components/analise/` e `src/pages/analise-gratuita.astro`).
Esperado: sem erros.

- [ ] **Step 2: Build de produção**

Run: `npm run build`
Esperado: conclui sem erros; `dist/analise-gratuita/index.html` existe.

- [ ] **Step 3: Checagem responsiva e de acessibilidade**

Run: `npm run dev` e abrir `http://localhost:4321/analise-gratuita`.
Verificar em 375px (mobile) e desktop:
- Sem scroll horizontal; seções com espaçamento consistente.
- Foco visível ao tabular pelos campos e botões; ordem de foco lógica.
- Contraste do texto legível sobre o fundo escuro.
- Labels visíveis em todos os campos; erros anunciados (`role="alert"`).

- [ ] **Step 4: Commit (se houve ajustes)**

```bash
git add -A
git commit -m "fix: responsive and a11y adjustments for /analise-gratuita"
```

---

## Self-Review

**1. Spec coverage:**
- Hero → Task 2. ✅
- Identificação (4 dores) → Task 3. ✅
- Valor da reunião (4 ganhos) → Task 4. ✅
- Formulário 1 etapa (Nome, Empresa, Telefone, Segmento, Descrição) + WhatsApp + GTM + microcopy → Task 5. ✅
- Reforço → Task 6. ✅
- Footer reutilizado → Tasks 1/5. ✅
- Rota `/analise-gratuita` → Task 1. ✅
- Identidade visual da marca (cores/fonte/raio) → aplicada em todas as seções. ✅
- A11y (labels, foco, aria-live, ≥44px, mobile-first) → componentes + Task 7. ✅
- Fora de escopo (backend, agendamento, A/B, link no menu) → respeitado. ✅

**2. Placeholder scan:** Nenhum "TBD/TODO"; todo passo com código mostra o código completo. ✅

**3. Type consistency:** `FormState`, `FieldErrors`, `buildWhatsAppUrl(data)`, `validate(data)`, `update(field, value)`, `handleBlur('nome'|'telefone')` usados de forma consistente; `WHATSAPP_PHONE`/`GTM_SEND_TO` constantes únicas; import da ilha como named export `{ FormAnalise }` coerente com o uso na página. ✅

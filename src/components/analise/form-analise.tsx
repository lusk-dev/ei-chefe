import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

const WHATSAPP_PHONE = '5588999030508';
const GTM_SEND_TO = 'AW-824780487/68QoCPeiz4sYEMfNpIkD';
const WEB3FORMS_ACCESS_KEY = '4439a0bd-ebb2-47fa-ba1c-f855853a7410';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

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

export function buildWeb3FormsPayload(data: FormState) {
  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'Nova solicitação - Análise Gratuita | Ei Chefe Ads',
    name: data.nome.trim(),
    empresa: data.empresa.trim() || 'Não informado',
    phone: data.telefone.trim(),
    segmento: data.segmento || 'Não informado',
    message: data.descricao.trim() || 'Não informado',
  };
}

export async function submitToWeb3Forms(data: FormState): Promise<void> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildWeb3FormsPayload(data)),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? 'Falha ao enviar formulário');
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const nomeRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormState, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: 'nome' | 'telefone', value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: validate(data)[field] }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(data);
    setErrors(newErrors);
    setSubmitError(null);
    if (newErrors.nome) {
      nomeRef.current?.focus();
      return;
    }
    if (newErrors.telefone) {
      telefoneRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      await submitToWeb3Forms(data);
    } catch {
      setSubmitError('Não foi possível enviar. Tente novamente em instantes.');
      setLoading(false);
      return;
    }

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
          onBlur={(e) => handleBlur('nome', e.target.value)}
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
          onBlur={(e) => handleBlur('telefone', e.target.value)}
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
      {submitError && (
        <p className={errorClass} role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}

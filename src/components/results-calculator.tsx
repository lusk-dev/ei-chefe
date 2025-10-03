import { ChevronDown, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

type BusinessType = 'medico' | 'restaurante' | 'outro' | '';

interface BusinessConfig {
  costPerContact: number;
  defaultConversionRate: number;
}

const BUSINESS_CONFIGS: Record<Exclude<BusinessType, ''>, BusinessConfig> = {
  medico: {
    costPerContact: 10,
    defaultConversionRate: 1.5
  },
  restaurante: {
    costPerContact: 2,
    defaultConversionRate: 15
  },
  outro: {
    costPerContact: 5,
    defaultConversionRate: 10
  }
};

export function ResultsCalculator() {
  const [investment, setInvestment] = useState<string>('');
  const [businessType, setBusinessType] = useState<BusinessType>('');
  const [conversionRate, setConversionRate] = useState<number>(10);
  const [userModifiedRate, setUserModifiedRate] = useState<boolean>(false);

  // Auto-adjust conversion rate when business type changes (unless user manually modified it)
  useEffect(() => {
    if (businessType && !userModifiedRate) {
      setConversionRate(BUSINESS_CONFIGS[businessType].defaultConversionRate);
    }
  }, [businessType, userModifiedRate]);

  // Calculate results
  const calculateResults = () => {
    const investmentValue = parseFloat(investment.replace(/\D/g, ''));

    if (!investmentValue || !businessType || investmentValue <= 0) {
      return { estimatedContacts: null, newClients: null };
    }

    const config = BUSINESS_CONFIGS[businessType];
    const estimatedContacts = Math.floor(
      investmentValue / config.costPerContact
    );
    const newClients = Math.floor(estimatedContacts * (conversionRate / 100));

    return { estimatedContacts, newClients };
  };

  const { estimatedContacts, newClients } = calculateResults();

  // Format currency input
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInvestment(value);
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const numValue = parseInt(value);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(numValue);
  };

  const handleConversionRateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserModifiedRate(true);
    setConversionRate(parseFloat(e.target.value));
  };

  return (
    <div className="bg-[#0A0A1F] rounded-3xl p-8 relative max-w-[585px] w-full mx-auto border-2 border-[#2A25A6]/50 shadow-[0_0_40px_rgba(42,37,166,0.4)]">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[#2A25A6]/30 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="relative z-10">
        <h3 className="text-white text-[28px] font-normal mb-2 text-center italic">
          Projete seus Resultados
        </h3>
        <p className="text-white/70 text-sm mb-8 text-center leading-relaxed">
          Veja uma estimativa de quantos novos clientes você pode alcançar com
          base no seu investimento em anúncios.
        </p>

        <div className="space-y-6">
          {/* Investment Input */}
          <div className="flex flex-col gap-3">
            <label htmlFor="investment-input" className="block text-white text-base font-light">
              Quanto Pretende Investir Por Mês?
            </label>

            <div className="flex items-center gap-3 bg-transparent border border-white/30 rounded-full px-4 py-3 text-white focus-within:border-white/50 transition-colors">
              <Clock className="w-5 h-5 flex-shrink-0 text-white/60" />
              <input
                id="investment-input"
                type="text"
                className="w-full bg-transparent outline-none text-white placeholder-white/40 text-base"
                placeholder="R$ 0"
                value={investment ? formatCurrency(investment) : ''}
                onChange={handleInvestmentChange}
                aria-label="Valor do investimento mensal"
              />
            </div>
          </div>

          {/* Business Type Select */}
          <div className="flex flex-col gap-3">
            <label htmlFor="business-type-select" className="block text-white text-base font-light">
              Qual Seu Tipo De Negócio?
            </label>
            <div className="relative">
              <select
                id="business-type-select"
                className="w-full bg-transparent border border-white/30 rounded-full px-4 py-3 pr-12 text-white focus:outline-none focus:border-white/50 appearance-none transition-colors text-base"
                value={businessType}
                onChange={e => {
                  setBusinessType(e.target.value as BusinessType);
                  setUserModifiedRate(false);
                }}
                aria-label="Tipo de negócio"
              >
                <option value="" className="bg-[#1A1A2E] text-white">
                  Selecione
                </option>
                <option value="medico" className="bg-[#1A1A2E] text-white">
                  Médico Especialista
                </option>
                <option value="restaurante" className="bg-[#1A1A2E] text-white">
                  Restaurante
                </option>
                <option value="outro" className="bg-[#1A1A2E] text-white">
                  Outro
                </option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" aria-hidden="true">
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
            </div>
          </div>

          {/* Conversion Rate Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label htmlFor="conversion-rate-slider" className="block text-white text-base font-light">
                Taxa De Conversão Em Clientes
              </label>
              <span className="text-white text-sm font-medium" aria-live="polite">
                {conversionRate.toFixed(1)}%
              </span>
            </div>
            <div className="relative">
              <div className="slider-container">
                <div className="slider-track" aria-hidden="true">
                  <div
                    className="slider-fill"
                    style={{ width: `${conversionRate}%` }}
                  ></div>
                  <div
                    className="slider-thumb"
                    style={{ left: `${conversionRate}%` }}
                  ></div>
                </div>
                <input
                  id="conversion-rate-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={conversionRate}
                  onChange={handleConversionRateChange}
                  className="slider-input"
                  aria-label="Taxa de conversão em porcentagem"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={conversionRate}
                  aria-valuetext={`${conversionRate.toFixed(1)} porcento`}
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-white text-base font-light">
                Novos Clientes Por Mês
              </span>
              <span className="text-[#5B56E8] font-semibold text-xl">
                {newClients !== null ? newClients : '--'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-base font-light">
                Contatos Estimados Por Mês
              </span>
              <span className="text-[#5B56E8] font-semibold text-xl">
                {estimatedContacts !== null ? estimatedContacts : '--'}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://bit.ly/wpp-eichefe-ads"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#2A25A6] hover:bg-[#3530B8] text-white py-4 rounded-full font-medium transition-colors text-base text-center mt-6"
            aria-label="Fale com um especialista em tráfego pago via WhatsApp"
          >
            Fale com um Especialista
          </a>
        </div>
      </div>

      <style>{`
        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            rgba(42, 37, 166, 0.3) 0%,
            transparent 70%
          );
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: 24px;
          padding: 8px 0;
        }

        .slider-track {
          position: relative;
          width: 100%;
          height: 6px;
          background: #4A4A5E;
          border-radius: 10px;
        }

        .slider-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #2A25A6;
          border-radius: 10px;
          transition: width 0.1s ease;
        }

        .slider-thumb {
          position: absolute;
          top: -5px;
          width: 16px;
          height: 16px;
          background: #2A25A6;
          border-radius: 50%;
          cursor: pointer;
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(42, 37, 166, 0.6);
          transition: left 0.1s ease;
        }

        .slider-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 24px;
          opacity: 0;
          cursor: pointer;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

type BusinessType = 'medico' | 'restaurante' | 'outro' | '';

interface BusinessConfig {
  costPerContact: number;
  defaultConversionRate: number;
}

const BUSINESS_CONFIGS: Record<Exclude<BusinessType, ''>, BusinessConfig> = {
  medico: {
    costPerContact: 10,
    defaultConversionRate: 1.5,
  },
  restaurante: {
    costPerContact: 2,
    defaultConversionRate: 15,
  },
  outro: {
    costPerContact: 5,
    defaultConversionRate: 10,
  },
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
    const estimatedContacts = Math.floor(investmentValue / config.costPerContact);
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
      minimumFractionDigits: 0,
    }).format(numValue);
  };

  const handleConversionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserModifiedRate(true);
    setConversionRate(parseFloat(e.target.value));
  };

  return (
    <div
      className="bg-gradient-to-b from-[#0F0F23] via-[#1A1A2E] to-[#2A25A6] rounded-xl border-gray-400/20 p-6 relative backdrop-blur-md border-2 shadow-2xl max-w-[585px] w-full mx-auto"
      style={{
        background: 'linear-gradient(180deg, #0F0F23 0%, #1A1A2E 50%, #2A25A6 100%)',
      }}
    >
      <h3 className="text-white text-2xl font-bold mb-4 text-center italic">
        Projete seus Resultados
      </h3>
      <p className="text-white text-sm mb-6 text-center">
        Veja uma estimativa de quantos novos clientes você pode alcançar com base no seu
        investimento em anúncios.
      </p>

      <div className="space-y-4">
        {/* Investment Input */}
        <div className="flex flex-col gap-2">
          <label className="block text-white text-sm mb-2">
            Quanto Pretende Investir Por Mês?
          </label>

          <div className="flex items-center gap-2 bg-black/30 border border-white/40 rounded-3xl px-3 py-2 text-white placeholder-gray-400 focus-within:border-white/60 backdrop-blur-sm text-sm">
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              placeholder="R$ 0"
              value={investment ? formatCurrency(investment) : ''}
              onChange={handleInvestmentChange}
            />
          </div>
        </div>

        {/* Business Type Select */}
        <div>
          <label className="block text-white text-sm mb-2">
            Qual Seu Tipo De Negócio?
          </label>
          <div className="relative">
            <select
              className="w-full bg-black/30 border border-white/40 rounded-3xl px-3 py-2 text-white focus:outline-none focus:border-white/60 appearance-none backdrop-blur-sm text-sm"
              value={businessType}
              onChange={(e) => {
                setBusinessType(e.target.value as BusinessType);
                setUserModifiedRate(false);
              }}
            >
              <option value="" className="bg-gray-800">
                Selecione
              </option>
              <option value="medico" className="bg-gray-800">
                Médico Especialista
              </option>
              <option value="restaurante" className="bg-gray-800">
                Restaurante
              </option>
              <option value="outro" className="bg-gray-800">
                Outro
              </option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Conversion Rate Slider */}
        <div>
          <label className="block text-white text-sm mb-2 text-center">
            Taxa De Conversão Em Clientes ({conversionRate.toFixed(1)}%)
          </label>
          <div className="relative">
            <div className="slider-container">
              <div className="slider-track">
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
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={conversionRate}
                onChange={handleConversionRateChange}
                className="slider-input"
              />
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">Novos Clientes Por Mês</span>
            <span className="text-[#4A45B8] font-bold text-lg">
              {newClients !== null ? newClients : '--'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">Contatos Estimados Por Mês</span>
            <span className="text-[#4A45B8] font-bold text-lg">
              {estimatedContacts !== null ? estimatedContacts : '--'}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://bit.ly/wpp-eichefe-ads"
          target="_blank"
          className="block w-full bg-gradient-to-r from-[#2A25A6] to-[#4A45B8] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm text-center"
        >
          Fale com um Especialista
        </a>
      </div>

      <style>{`
        .slider-container {
          position: relative;
          width: 100%;
          height: 20px;
        }

        .slider-track {
          position: relative;
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 12px;
          margin: 6px 0;
        }

        .slider-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #2a25a6;
          border-radius: 12px;
          transition: width 0.1s ease;
        }

        .slider-thumb {
          position: absolute;
          top: -6px;
          width: 20px;
          height: 20px;
          background: #2a25a6;
          border-radius: 50%;
          cursor: pointer;
          transform: translateX(-50%);
          box-shadow: 0 0 8px rgba(42, 37, 166, 0.5);
          transition: left 0.1s ease;
        }

        .slider-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          opacity: 0;
          cursor: pointer;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

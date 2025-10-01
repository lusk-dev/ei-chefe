import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useId } from 'react';
import { Button, Group, Input, NumberField } from 'react-aria-components';
import bgPlanCard from '../assets/bg-card.png';

export function Form() {
  const id = useId();
  return (
    <div
      className="rounded-[30px] border-[5px] border-white/20 bg-[#151515] px-6 py-14 flex flex-col gap-9"
      style={{
        backgroundImage: `url(${bgPlanCard.src})`,
        backgroundSize: 'cover',
        backgroundPosition: '80% 100%'
      }}
    >
      +
      <div className="italic text-center text-white leading-[115.99999999999999%] flex flex-col gap-3">
        <h3 className="text-[33px] leading-[115.99999999999999%]">
          Projete seus Resultados
        </h3>
        <p className="text-base font-light">
          Veja uma estimativa de quantos novos clientes você pode alcançar com
          base no seu investimento em anúncios.
        </p>
      </div>
      <form className="flex flex-col gap-4" id="projectionForm">
        <NumberField
          defaultValue={0}
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            currencySign: 'accounting'
          }}
        >
          <div className="*:not-first:mt-2">
            <Label className="text-[#D2CCFF] leading-[21px] text-[24px] font-medium">
              Number input with chevrons
            </Label>
            <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
              <Input className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
              <div className="flex h-[calc(100%+2px)] flex-col">
                <Button
                  slot="increment"
                  className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronUpIcon size={12} aria-hidden="true" />
                </Button>
                <Button
                  slot="decrement"
                  className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronDownIcon size={12} aria-hidden="true" />
                </Button>
              </div>
            </Group>
          </div>
        </NumberField>

        <div className="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
          <Label htmlFor={id}>Select with colored border and ring</Label>
          <Select defaultValue="1">
            <SelectTrigger id={id}>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">React</SelectItem>
              <SelectItem value="2">Next.js</SelectItem>
              <SelectItem value="3">Astro</SelectItem>
              <SelectItem value="4">Gatsby</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="text-blue-400 text-base font-semibold border-b-2 border-blue-400 pb-2">
            Taxa De Conversão Em Clientes
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              id="conversionRate"
              name="conversionRate"
              min="1"
              max="20"
              value="5"
              className="w-full h-2 bg-gradient-slider rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span
                className="text-white text-lg font-bold"
                id="conversionValue"
              >
                5
              </span>
              <span className="text-white text-lg font-bold">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold">
              Novos Clientes Por Mês
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white-10 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-bar rounded-lg transition-all duration-500 ease-out"
                  id="clientsBar"
                ></div>
              </div>
              <span
                className="text-white font-bold text-base min-w-10 text-right"
                id="clientsResult"
              >
                --
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold">
              Contatos Estimados Por Mês
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white-10 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-bar rounded-lg transition-all duration-500 ease-out"
                  id="contactsBar"
                ></div>
              </div>
              <span
                className="text-white font-bold text-base min-w-10 text-right"
                id="contactsResult"
              >
                --
              </span>
            </div>
          </div>
        </div>

        <button className="py-4 px-[31px] border border-[#BBBBBB] bg-[#3214E3] rounded-[100px] text-[#DDDDDD] font-medium text-base leading-[120%]">
          Fale com um Especialista
        </button>
      </form>
    </div>
  );
}

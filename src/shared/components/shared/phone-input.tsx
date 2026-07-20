'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import PhoneNumberInput, {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
  type Country,
  type Value,
} from 'react-phone-number-input/input';
import type { FlagProps } from 'react-phone-number-input';
import defaultLabels from 'react-phone-number-input/locale/en.json';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/shared/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { Input } from '@/shared/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof PhoneNumberInput>,
  'onChange' | 'value'
> & {
  isError?: boolean;
  onChange?: (value: Value) => void;
  value?: Value;
};

const countryOptions = getCountries().map((country) => ({
  value: country,
  label: defaultLabels[country] ?? country,
}));

const PhoneInputField = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onChange,
      value,
      defaultCountry,
      country,
      isError = false,
      ...props
    },
    ref
  ) => {
    const parsedCountry = React.useMemo(() => {
      return value ? parsePhoneNumber(value)?.country : undefined;
    }, [value]);

    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      (country ?? defaultCountry ?? parsedCountry ?? 'US') as Country
    );
    const currentCountry = (country ??
      parsedCountry ??
      selectedCountry) as Country;
    const selectedCountryCode = React.useMemo(() => {
      return getCountryCallingCode(currentCountry);
    }, [currentCountry]);

    return (
      <div
        className={cn(
          'flex h-14 w-full items-stretch overflow-hidden rounded-2xl border-[1.5px] border-ds-border-default bg-transparent px-4 shadow-xs transition-[border-color,box-shadow] hover:border-ds-border-primary-fade focus-within:border-ds-border-primary focus-within:shadow-[var(--shadow-ds-subtle-sm)]',
          isError &&
            'border-danger ring-3 ring-danger/20 focus-within:border-danger',
          props.disabled && 'border-0 bg-ds-muted opacity-50'
        )}
      >
        <CountrySelect
          disabled={props.disabled}
          options={countryOptions}
          value={currentCountry}
          callingCode={selectedCountryCode}
          onChange={setSelectedCountry}
        />
        <div className="mx-3 my-3 w-px bg-border/70" />
        <PhoneNumberInput
          ref={ref}
          className={cn(
            'flex-1 min-w-0 border-0 bg-transparent p-0 text-[15px] shadow-none outline-none placeholder:text-muted-foreground/70 focus-visible:ring-0',
            className
          )}
          defaultCountry={currentCountry}
          inputComponent={InputComponent}
          aria-invalid={isError}
          value={value || undefined}
          onChange={(nextValue) => onChange?.(nextValue || ('' as Value))}
          {...props}
        />
      </div>
    );
  }
);
PhoneInputField.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      'h-full border-0 bg-transparent px-0 text-[15px] shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0',
      className
    )}
    {...props}
  />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  callingCode: string;
  options: CountryEntry[];
  onChange: (country: Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  callingCode,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const filteredCountries = React.useMemo(() => {
    if (!searchValue) return countryList;

    const query = searchValue.toLowerCase();

    return countryList.filter(({ label, value }) => {
      const callingCode = `+${getCountryCallingCode(value)}`;

      return (
        label.toLowerCase().includes(query) ||
        callingCode.toLowerCase().includes(query)
      );
    });
  }, [countryList, searchValue]);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setSearchValue('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-full min-w-[120px] justify-start gap-2 border-0 bg-transparent px-0 text-[15px] font-normal shadow-none hover:bg-transparent focus:z-10 focus-visible:ring-0"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <span className="whitespace-nowrap text-[15px] leading-none text-foreground/90">
            {`${selectedCountry}(+${callingCode})`}
          </span>
          <ChevronsUpDown
            className={cn(
              'ml-0 size-4 text-foreground/70',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-slot="scroll-area-viewport"]'
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              {filteredCountries.length === 0 ? (
                <CommandEmpty>No country found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredCountries.map(({ value, label }) => (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ))}
                </CommandGroup>
              )}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends FlagProps {
  selectedCountry: Country;
  onChange: (country: Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInputField as PhoneInput };

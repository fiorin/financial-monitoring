"use client";

import {
  Input,
  HStack,
  Text,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../select";
import { CURRENCIES } from "@/utils/const";

interface TransactionsFiltersProps {
  onApplyFilters: (filteredTransactions: {
    min?: number;
    max?: number;
    currencies?: string[];
  }) => void;
}

const TransactionsFilters = ({ onApplyFilters }: TransactionsFiltersProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [min, setMin] = useState<string>(() => searchParams.get("min") || "");
  const [max, setMax] = useState<string>(() => searchParams.get("max") || "");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(
    () => searchParams.get("currencies")?.split(",") || []
  );

  // added fixed currencies for simplicity, but that could be dynamic for the results
  const availableCurrencies = {
    items: CURRENCIES.map((currency) => ({
      label: currency,
      value: currency,
    })),
  };

  const handleApplyFilters = () => {
    const filters: { min?: number; max?: number; currencies?: string[] } = {};

    if (min) filters.min = parseFloat(min);
    if (max) filters.max = parseFloat(max);
    if (selectedCurrencies.length) filters.currencies = selectedCurrencies;

    const params = new URLSearchParams();
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (selectedCurrencies.length)
      params.set("currencies", selectedCurrencies.join(","));

    push(`?${params.toString()}`);

    onApplyFilters(filters);
  };

  useEffect(() => {
    const filters: { min?: number; max?: number; currencies?: string[] } = {};
    if (min) filters.min = parseFloat(min);
    if (max) filters.max = parseFloat(max);
    if (selectedCurrencies.length) filters.currencies = selectedCurrencies;

    if (Object.keys(filters).length > 0) {
      onApplyFilters(filters);
    }
  }, [max, min, onApplyFilters, selectedCurrencies]);

  const handleClearFilters = () => {
    setMin("");
    setMax("");
    setSelectedCurrencies([]);

    const params = new URLSearchParams();
    push(`?${params.toString()}`);

    onApplyFilters({});
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only positive numbers or empty string
    if (/^\d*$/.test(value)) {
      setMin(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only positive numbers or empty string
    if (/^\d*$/.test(value)) {
      setMax(value);
    }
  };

  return (
    <>
      <Text fontSize="14px" color="#777" fontWeight="bold" mb=".5em">
        Filters
      </Text>
      <HStack mb="1em">
        <Input
          placeholder="Min Amount"
          value={min}
          onChange={handleMinChange}
          type="number"
          width={"200px"}
        />
        <Input
          placeholder="Max Amount"
          value={max}
          onChange={handleMaxChange}
          type="number"
          width={"200px"}
        />
        <SelectRoot
          value={selectedCurrencies}
          onValueChange={({ value }: { value: string[] }) =>
            setSelectedCurrencies(value)
          }
          multiple
          collection={createListCollection(availableCurrencies)}
        >
          <SelectTrigger clearable>
            <SelectValueText placeholder="Select currencies">
              {(items) =>
                items.length > 0
                  ? items.map((item) => item.value).join(", ")
                  : "Select currencies"
              }
            </SelectValueText>
          </SelectTrigger>
          <SelectContent>
            {availableCurrencies.items.map((currency) => (
              <SelectItem key={currency.value} item={currency}>
                {currency.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Button onClick={handleApplyFilters} colorScheme="blue">
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline">
          Clear Filters
        </Button>
      </HStack>
    </>
  );
};

export default TransactionsFilters;

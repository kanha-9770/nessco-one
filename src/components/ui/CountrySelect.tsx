"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, ChevronDown } from "lucide-react";
import { ScrollArea } from "./ScrollArea";

type Country = {
  name: string;
  code: string;
  phone: string;
};

type CountrySelectProps = {
  isoCode: string;
};

export default function CountrySelect({ isoCode }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countriesData = await response.json();
        const formattedCountries = countriesData
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            phone: country.idd.root
              ? country.idd.root +
                (country.idd.suffixes ? country.idd.suffixes[0] : "")
              : "",
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);

        const preSelectedCountry = formattedCountries.find(
          (country: Country) => country.code === isoCode.toUpperCase()
        );
        setSelectedCountry(preSelectedCountry || formattedCountries[0]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [isoCode]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setPhoneNumber("");
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = input.replace(/[^0-9]/g, "");
    setPhoneNumber(formattedInput);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[140px] justify-between text-left font-normal group "
              aria-label="Select country"
            >
              {selectedCountry && (
                <>
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-6 overflow-hidden rounded-sm">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                        width="40"
                        alt={`${selectedCountry.name} flag`}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="font-medium">{selectedCountry.phone}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-semibold text-center">
                Select a country
              </h2>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search countries"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <ScrollArea className="h-[300px] sm:max-w-[390px] rounded-md border border-gray-200 dark:border-gray-700">
                <motion.div layout className="p-2 grid gap-1">
                  <AnimatePresence>
                    {filteredCountries.map((country) => (
                      <motion.div
                        key={country.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-[90%] justify-start hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <span className="mr-3 h-5 w-7 overflow-hidden rounded-sm">
                            <img
                              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                              width="40"
                              alt={`${country.name} flag`}
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="flex-1 truncate text-left">
                            {country.name}
                          </span>
                          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {country.phone}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        </Dialog>
        <div className="relative flex-1">
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="pr-4 py-2 w-full border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type GameType = "free" | "paid" | "all";

interface GameFiltersProps {
  onFilterChange: (filters: {
    type: GameType;
    category: string;
    sort: string;
  }) => void;
}

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Trivia", value: "trivia" },
  { label: "Cards", value: "cards" },
  { label: "Dice", value: "dice" },
  { label: "Board Games", value: "board" },
  { label: "Word Games", value: "word" },
  { label: "Arcade", value: "arcade" },
];

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Highest Rated", value: "rated" },
  { label: "Most Credits", value: "credits" },
];

const GameFilters = ({ onFilterChange }: GameFiltersProps) => {
  const [type, setType] = useState<GameType>("all");
  const [category, setCategory] = useState("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sort, setSort] = useState("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleTypeChange = (value: string) => {
    const gameType = value as GameType;
    setType(gameType);
    applyFilters(gameType, category, sort);
    updateActiveFiltersCount(gameType, category, sort);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCategoryOpen(false);
    applyFilters(type, value, sort);
    updateActiveFiltersCount(type, value, sort);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setSortOpen(false);
    applyFilters(type, category, value);
    updateActiveFiltersCount(type, category, value);
  };

  const updateActiveFiltersCount = (
    typeValue: GameType,
    categoryValue: string,
    sortValue: string
  ) => {
    let count = 0;
    if (typeValue !== "all") count++;
    if (categoryValue !== "all") count++;
    if (sortValue !== "popular") count++;
    setActiveFilters(count);
  };

  const applyFilters = (
    typeValue: GameType,
    categoryValue: string,
    sortValue: string
  ) => {
    onFilterChange({
      type: typeValue,
      category: categoryValue,
      sort: sortValue,
    });
  };

  const resetFilters = () => {
    setType("all");
    setCategory("all");
    setSort("popular");
    setActiveFilters(0);
    onFilterChange({
      type: "all",
      category: "all",
      sort: "popular",
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5 text-migblue" />
          Game Filters
          {activeFilters > 0 && (
            <Badge variant="outline" className="ml-2">
              {activeFilters} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs defaultValue="all" value={type} onValueChange={handleTypeChange}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All Games</TabsTrigger>
              <TabsTrigger value="free">Free Games</TabsTrigger>
              <TabsTrigger value="paid">Paid Games</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-2">
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="justify-between w-full sm:w-1/2"
                >
                  {categories.find((cat) => cat.value === category)?.label || "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat.value}
                        value={cat.value}
                        onSelect={handleCategoryChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            category === cat.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {cat.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={sortOpen} onOpenChange={setSortOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={sortOpen}
                  className="justify-between w-full sm:w-1/2"
                >
                  {sortOptions.find((option) => option.value === sort)?.label || "Sort by"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search options..." />
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    {sortOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSortChange}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            sort === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {activeFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="ml-auto block"
            >
              Reset filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameFilters;

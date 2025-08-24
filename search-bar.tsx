import { useState } from "react";
import { Search, MapPin, Bot, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { JobSearchFilters } from "@shared/schema";

interface SearchBarProps {
  query: string;
  location: string;
  onQueryChange: (query: string) => void;
  onLocationChange: (location: string) => void;
  onSearch: () => void;
  filters: JobSearchFilters;
  onFiltersChange: (filters: JobSearchFilters) => void;
}

export default function SearchBar({ 
  query, 
  location, 
  onQueryChange, 
  onLocationChange, 
  onSearch,
  filters,
  onFiltersChange 
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const quickFilters = [
    { label: "Posted Today", value: "today" },
    { label: "Posted Tomorrow", value: "tomorrow" },
    { label: "This Week", value: "within_week" },
    { label: "Remote Only", value: "remote" },
  ];

  const handleQuickFilter = (filterType: string, value: string) => {
    if (filterType === "time") {
      onFiltersChange({ ...filters, timeFilter: value as any });
    } else if (filterType === "remote") {
      onFiltersChange({ ...filters, isRemote: value === "remote" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search jobs, ask questions, or describe your ideal role..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-20 py-4 text-lg border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-search-query"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span className="text-ai-purple text-sm font-medium">
              <Bot className="inline h-4 w-4 mr-1" />
              AI-Powered
            </span>
          </div>
        </div>
        
        {/* Location Input */}
        <div className="lg:w-64 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-4 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-location"
          />
        </div>
        
        {/* Search Button */}
        <Button 
          onClick={onSearch}
          className="bg-primary text-white px-8 py-4 hover:bg-primary-dark"
          data-testid="button-search"
        >
          Search Jobs
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mt-4">
        <span className="text-sm text-gray-600 font-medium">Quick Filters:</span>
        {quickFilters.map((filter) => (
          <Button
            key={filter.value}
            variant="secondary"
            size="sm"
            onClick={() => {
              if (filter.value === "remote") {
                handleQuickFilter("remote", filter.value);
              } else {
                handleQuickFilter("time", filter.value);
              }
            }}
            className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 ${
              (filter.value === "remote" && filters.isRemote) ||
              (filter.value === filters.timeFilter) 
                ? "bg-primary text-white hover:bg-primary-dark" 
                : ""
            }`}
            data-testid={`button-filter-${filter.value}`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobSearchFilters } from "@shared/schema";

interface FiltersSidebarProps {
  filters: JobSearchFilters;
  onFiltersChange: (filters: JobSearchFilters) => void;
}

export default function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
  const handleTimeFilterChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      timeFilter: value as any 
    });
  };

  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    const currentLevels = filters.experienceLevel || [];
    const updatedLevels = checked 
      ? [...currentLevels, level]
      : currentLevels.filter(l => l !== level);
    
    onFiltersChange({ 
      ...filters, 
      experienceLevel: updatedLevels 
    });
  };

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.jobType || [];
    const updatedTypes = checked 
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);
    
    onFiltersChange({ 
      ...filters, 
      jobType: updatedTypes 
    });
  };

  const handleSalaryRangeChange = (value: string) => {
    if (value === "any") {
      onFiltersChange({ 
        ...filters, 
        salaryMin: undefined,
        salaryMax: undefined 
      });
    } else {
      const salary = parseInt(value);
      onFiltersChange({ 
        ...filters, 
        salaryMin: salary 
      });
    }
  };

  return (
    <Card className="sticky top-4" data-testid="sidebar-filters">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Date Posted</h4>
          <RadioGroup 
            value={filters.timeFilter || "any"} 
            onValueChange={handleTimeFilterChange}
            data-testid="radio-group-time-filter"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today" className="text-sm">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tomorrow" id="tomorrow" />
              <Label htmlFor="tomorrow" className="text-sm">Tomorrow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="within_week" id="within_week" />
              <Label htmlFor="within_week" className="text-sm">Within 1 Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="before_week" id="before_week" />
              <Label htmlFor="before_week" className="text-sm">Before 1 Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any" />
              <Label htmlFor="any" className="text-sm">Any Time</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Experience Level</h4>
          <div className="space-y-2">
            {["Entry Level", "Mid Level", "Senior Level", "Executive"].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={filters.experienceLevel?.includes(level) || false}
                  onCheckedChange={(checked) => 
                    handleExperienceLevelChange(level, checked as boolean)
                  }
                  data-testid={`checkbox-experience-${level.toLowerCase().replace(' ', '-')}`}
                />
                <Label htmlFor={level} className="text-sm">{level}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Salary Range</h4>
          <Select 
            value={filters.salaryMin?.toString() || "any"} 
            onValueChange={handleSalaryRangeChange}
            data-testid="select-salary-range"
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Salary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Salary</SelectItem>
              <SelectItem value="40000">$40,000+</SelectItem>
              <SelectItem value="60000">$60,000+</SelectItem>
              <SelectItem value="80000">$80,000+</SelectItem>
              <SelectItem value="100000">$100,000+</SelectItem>
              <SelectItem value="120000">$120,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Job Type</h4>
          <div className="space-y-2">
            {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.jobType?.includes(type) || false}
                  onCheckedChange={(checked) => 
                    handleJobTypeChange(type, checked as boolean)
                  }
                  data-testid={`checkbox-job-type-${type.toLowerCase()}`}
                />
                <Label htmlFor={type} className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Remote Work */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Work Arrangement</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={filters.isRemote || false}
              onCheckedChange={(checked) => 
                onFiltersChange({ ...filters, isRemote: checked as boolean })
              }
              data-testid="checkbox-remote"
            />
            <Label htmlFor="remote" className="text-sm">Remote Work</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

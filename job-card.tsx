import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Clock, Briefcase, Heart, ExternalLink } from "lucide-react";
import { Job } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job & { matchScore?: number };
  resumeId?: string | null;
}

export default function JobCard({ job, resumeId }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `$${min.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  const getMatchBadgeColor = (score?: number) => {
    if (!score) return "bg-gray-500";
    if (score >= 90) return "bg-success";
    if (score >= 75) return "bg-warning";
    if (score >= 60) return "bg-primary";
    return "bg-gray-500";
  };

  const formatPostedTime = (date: Date | string) => {
    try {
      const postedDate = new Date(date);
      return formatDistanceToNow(postedDate, { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow" data-testid={`card-job-${job.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* Company logo placeholder */}
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <h3 
                className="text-lg font-semibold text-gray-900 hover:text-primary cursor-pointer"
                data-testid={`text-job-title-${job.id}`}
              >
                {job.title}
              </h3>
              <p className="text-primary font-medium" data-testid={`text-company-${job.id}`}>
                {job.company}
              </p>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                <span data-testid={`text-location-${job.id}`}>
                  <MapPin className="inline h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span data-testid={`text-posted-time-${job.id}`}>
                  <Clock className="inline h-4 w-4 mr-1" />
                  {formatPostedTime(job.postedDate)}
                </span>
                <span data-testid={`text-job-type-${job.id}`}>
                  <Briefcase className="inline h-4 w-4 mr-1" />
                  {job.jobType || "Full-time"}
                </span>
                {job.isRemote && (
                  <Badge variant="secondary" className="text-xs">
                    Remote
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {job.matchScore && (
              <Badge 
                className={`${getMatchBadgeColor(job.matchScore)} text-white`}
                data-testid={`badge-match-score-${job.id}`}
              >
                {job.matchScore}% Match
              </Badge>
            )}
            <Button variant="ghost" size="icon" data-testid={`button-save-job-${job.id}`}>
              <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3" data-testid={`text-description-${job.id}`}>
          {job.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {formatSalary(job.salaryMin, job.salaryMax) && (
              <span className="text-gray-900 font-semibold" data-testid={`text-salary-${job.id}`}>
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            )}
            {job.skills && job.skills.length > 0 && (
              <div className="flex space-x-2">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-blue-100 text-blue-800"
                    data-testid={`badge-skill-${job.id}-${index}`}
                  >
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.skills.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              data-testid={`button-view-details-${job.id}`}
            >
              View Details
            </Button>
            <Button 
              className="bg-primary text-white hover:bg-primary-dark"
              onClick={() => window.open(job.externalUrl, '_blank')}
              data-testid={`button-apply-${job.id}`}
            >
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

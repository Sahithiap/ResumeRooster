import { Search, Bell, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Search className="text-white h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-gray-900" data-testid="text-logo">
              ResumeRooster
            </span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-primary font-medium" data-testid="link-jobs">
              Jobs
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900" data-testid="link-companies">
              Companies
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900" data-testid="link-salary">
              Salary Insights
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900" data-testid="link-tips">
              Career Tips
            </a>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Avatar data-testid="avatar-user">
              <AvatarFallback>
                <Building className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

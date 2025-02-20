
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  submittedAt: string;
}

interface VolunteerListProps {
  volunteers: Volunteer[];
}

const VolunteerList = ({ volunteers }: VolunteerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 5;

  // Filter volunteers based on search query
  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredVolunteers.length / volunteersPerPage);
  const paginatedVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * volunteersPerPage,
    currentPage * volunteersPerPage
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search volunteers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          {paginatedVolunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="p-4 border rounded-lg space-y-2"
            >
              <h3 className="font-semibold">{volunteer.name}</h3>
              <p className="text-sm text-gray-600">{volunteer.email}</p>
              <p className="text-sm text-gray-600">{volunteer.phone}</p>
              <div className="text-sm">
                <strong>Skills:</strong>
                <p className="mt-1 text-gray-600">{volunteer.skills}</p>
              </div>
              <div className="text-sm">
                <strong>Availability:</strong>
                <p className="mt-1 text-gray-600">{volunteer.availability}</p>
              </div>
              <p className="text-xs text-gray-400">
                Submitted: {new Date(volunteer.submittedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {filteredVolunteers.length === 0 && (
            <p className="text-center text-gray-500">No volunteers found</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolunteerList;

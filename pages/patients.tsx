import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// @ts-ignore
import { IconSearch, IconPlus, IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Mock patient data
  const patients = [
    { id: "P001", name: "John Doe", age: 45, condition: "Lung Cancer", lastVisit: "2023-10-15" },
    { id: "P002", name: "Jane Smith", age: 38, condition: "Breast Cancer", lastVisit: "2023-10-18" },
    { id: "P003", name: "Robert Johnson", age: 52, condition: "Prostate Cancer", lastVisit: "2023-10-10" },
    { id: "P004", name: "Emily Davis", age: 29, condition: "Leukemia", lastVisit: "2023-10-20" },
    { id: "P005", name: "Michael Wilson", age: 61, condition: "Colorectal Cancer", lastVisit: "2023-10-05" },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button className="flex items-center gap-2">
          <IconPlus className="h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Search</CardTitle>
          <CardDescription>Search for patients by name, ID, or condition</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <IconSearch className="h-5 w-5" />
              </div>
              <Input
                type="search"
                placeholder="Search patients..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" type="button" className="flex items-center gap-2">
              <IconFilter className="h-4 w-4" />
              Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{patient.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        ID: {patient.id} | Age: {patient.age} | Last Visit: {patient.lastVisit}
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {patient.condition}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => router.push(`/patients/${patient.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="default"
                        onClick={() => router.push(`/patients/${patient.id}/genomics`)}
                      >
                        Genomic Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No patients found matching your search criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
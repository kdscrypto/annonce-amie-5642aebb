import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        className="pl-10 pr-4 h-12 w-full rounded-full"
        placeholder="Rechercher une annonce..."
      />
    </div>
  );
}
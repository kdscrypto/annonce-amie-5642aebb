import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminButton } from "./AdminButton";
import { AuthButtons } from "./AuthButtons";

export const Header = () => {
  return (
    <header 
      className="relative flex justify-between items-center rounded-2xl p-6 shadow-lg overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/5a53b4b8-8233-483e-bce7-673a6e2820a4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
      
      {/* Contenu du header avec z-index pour le placer au-dessus de l'overlay */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative">
          <img 
            src="/lovable-uploads/e3b929be-d96d-4470-869a-739d4e330db4.png" 
            alt="Mokolo Online Logo" 
            className="w-14 h-14 object-contain"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Mokolo Online
          </h1>
          <p className="text-sm text-muted-foreground">
            La marketplace camerounaise
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <AdminButton />
        <AuthButtons />
        <Link to="/create">
          <Button className="rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> Publier une annonce
          </Button>
        </Link>
        <Link to="/about" className="ml-4">
          <Button variant="ghost" className="rounded-full">
            À propos
          </Button>
        </Link>
      </div>
    </header>
  );
};
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Plus, LogIn, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { StatsBar } from "@/components/StatsBar";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et admin
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        // Vérifier si l'utilisateur est admin
        const { data: adminData } = await supabase
          .from("admin_users")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        
        setIsAdmin(!!adminData);
      }
    };

    checkAdminStatus();
  }, []);

  // Requête pour toutes les annonces
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings', selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (selectedCategory !== "Tous") {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Requête séparée pour les dernières annonces
  const { data: latestListings = [] } = useQuery({
    queryKey: ['latest-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(2);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/e3b929be-d96d-4470-869a-739d4e330db4.png" 
                  alt="Mokolo Online Logo" 
                  className="w-12 h-12"
                />
                <h1 className="text-3xl font-bold">Mokolo Online</h1>
              </div>
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin">
                        <Button variant="outline" className="rounded-full">
                          <Settings className="mr-2 h-4 w-4" /> Administration
                        </Button>
                      </Link>
                    )}
                    <Link to="/dashboard">
                      <Button variant="outline" className="rounded-full">
                        <Settings className="mr-2 h-4 w-4" /> Tableau de bord
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" className="rounded-full">
                      <LogIn className="mr-2 h-4 w-4" /> Connexion
                    </Button>
                  </Link>
                )}
                <Link to="/create">
                  <Button className="rounded-full">
                    <Plus className="mr-2 h-4 w-4" /> Publier une annonce
                  </Button>
                </Link>
              </div>
            </header>
            
            <SearchBar onSearch={setSearchQuery} />
            <CategoryFilter onCategoryChange={setSelectedCategory} />

            {isLoading ? (
              <div className="text-center py-8">Chargement des annonces...</div>
            ) : (
              <>
                {/* Section des dernières annonces */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Nos dernières annonces</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {latestListings.map((listing) => (
                      <ListingCard key={listing.id} {...listing} />
                    ))}
                  </div>
                </section>
                
                {/* Section principale des annonces */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Toutes les annonces</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                      <ListingCard key={listing.id} {...listing} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>

        <StatsBar />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
}
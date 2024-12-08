import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ListingCard } from "./ListingCard";
import type { Listing } from "@/integrations/supabase/types/listing";

export function VipListings() {
  const { data: vipListings = [], isLoading, error } = useQuery({
    queryKey: ['vip-listings'],
    queryFn: async () => {
      console.log('Début de la requête VIP listings');
      
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .eq('is_vip', true)
        .gt('vip_until', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des VIP listings:", error);
        throw error;
      }
      
      console.log('VIP listings récupérés:', data);
      return data as Listing[];
    },
  });

  if (error) {
    console.error("Erreur dans le composant VipListings:", error);
    return (
      <div className="text-center py-4 text-red-600">
        Une erreur est survenue lors du chargement des annonces VIP
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!vipListings.length) {
    return null;
  }

  return (
    <section className="space-y-6 mb-8">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Annonces VIP
        </h2>
        <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
          Premium
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vipListings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </section>
  );
}
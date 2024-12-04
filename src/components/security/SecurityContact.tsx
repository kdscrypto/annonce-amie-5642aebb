import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone } from 'lucide-react';

export function SecurityContact() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Une question sur la sécurité ?</h2>
        <p className="text-muted-foreground mb-8">
          Notre équipe de sécurité est disponible pour répondre à vos questions et 
          vous aider en cas de problème.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Nous contacter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            +237 6XX XXX XXX
          </Button>
        </div>
      </div>
    </section>
  );
}
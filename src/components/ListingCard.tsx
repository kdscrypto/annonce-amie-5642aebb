import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { useRef, useCallback, useEffect } from "react";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  image_url: string;
  location: string;
}

export function ListingCard({ id, title, price, image_url, location }: ListingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    // Handle resize if needed
  }, []);

  const observerRef = useResizeObserver(handleResize);

  // Attach observer when component mounts
  useEffect(() => {
    if (cardRef.current && observerRef.current) {
      observerRef.current.observe(cardRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Link to={`/listing/${id}`}>
      <Card className="listing-card" ref={cardRef}>
        <CardContent className="p-0">
          <img
            src={image_url || '/placeholder.svg'}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <span className="price-tag">
            {price.toLocaleString()} FCFA
          </span>
          <p className="text-sm text-gray-500">{location}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
import { Button } from "@/components/ui/button";
import PublisherCard from "@/components/PublisherCard";
import SectionTitle from "@/components/SectionTitle";
import { Company } from "@/types/api";

interface PublisherWithGameCount extends Company {
  gameCount: number;
}

export default function PublisherSection({ onViewAll, publishers, isLoading }: { onViewAll: () => void, publishers: PublisherWithGameCount[], isLoading: boolean }) {
  return (
    <section className="py-12">
      <SectionTitle title="Top Rated Publishers" colorClass="bg-primary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading placeholders
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse bg-muted/30 rounded-lg h-48"></div>
          ))
        ) : publishers.length > 0 ? (
          // Render actual publisher data
          publishers.map((publisher) => (
            <PublisherCard
              key={publisher.id}
              id={publisher.id}
              name={publisher.name}
              logo={publisher.imageUrl || "/placeholder.svg?height=100&width=100"}
              country={publisher.country}
              gameCount={publisher.gameCount}
            />
          ))
        ) : (
          // No publishers found
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No publishers found
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300" onClick={onViewAll}>
          View All Publishers
        </Button>
      </div>
    </section>
  );
} 
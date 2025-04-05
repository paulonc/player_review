import { Button } from "@/components/ui/button";
import PublisherCard from "./PublisherCard";
import SectionTitle from "./SectionTitle";
import { Company } from "@/types/api";

export default function PublisherSection({ onViewAll, publishers, isLoading }: { onViewAll: () => void, publishers: Company[], isLoading: boolean }) {
  return (
    <section className="py-12">
      <SectionTitle title="Top Rated Publishers" colorClass="bg-primary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <PublisherCard
          id="1"
          name="Bandai Namco Entertainment"
          logo="/placeholder.svg?height=100&width=100"
          country="Japan"
          rating={4.8}
          gameCount={87}
        />
        <PublisherCard
          id="2"
          name="Sony Interactive Entertainment"
          logo="/placeholder.svg?height=100&width=100"
          country="United States"
          rating={4.9}
          gameCount={64}
        />
        <PublisherCard
          id="3"
          name="FromSoftware"
          logo="/placeholder.svg?height=100&width=100"
          country="Japan"
          rating={4.9}
          gameCount={12}
        />
        <PublisherCard
          id="4"
          name="CD Projekt Red"
          logo="/placeholder.svg?height=100&width=100"
          country="Poland"
          rating={4.7}
          gameCount={8}
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-primary/20 hover:bg-primary/10 transition-all duration-300" onClick={onViewAll}>
          View All Publishers
        </Button>
      </div>
    </section>
  );
} 
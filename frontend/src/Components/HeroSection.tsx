import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
      <div className="relative overflow-hidden rounded-xl border p-8 bg-gradient-to-br from-background via-background/95 to-muted">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-white/10"></div>
        <div className="flex max-w-[980px] flex-col items-start gap-2 relative z-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Discover and Review <br className="hidden sm:inline" />
            Your Favorite Games
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Join our community of gamers to share your opinions, discover new titles, and find your next gaming
            adventure.
          </p>
        </div>
        <div className="flex gap-4 mt-6 relative z-10">
          <Button
            size="lg"
            onClick={() => navigate("/games")}
            className="cursor-pointer bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Browse Games
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

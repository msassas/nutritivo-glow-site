import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpotifyPlaylist = () => {
  return (
    <section id="spotify" className="py-20 sm:py-24 bg-[hsl(var(--secondary))]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-transparent border border-accent/40 rounded-full mb-6 text-accent">
            <Music className="w-6 h-6" />
          </div>

          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Para ouvir com calma
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
            Playlist para te acompanhar nessa jornada
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />

          <p className="text-base sm:text-lg text-foreground/80 mb-10 leading-relaxed">
            Uma seleção especial de músicas para você relaxar, se motivar e se cuidar. Porque cuidar da saúde também pode ser gostoso.
          </p>

          <Button
            variant="pill-outline"
            size="xl"
            onClick={() =>
              window.open(
                "https://open.spotify.com/playlist/2a7XLbYEIu5VGuNSGkhYhl?si=oJUOJI8bT_K-Y_3HlA4mrQ&pi=ecZ3SH0SSyi0Z",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <Music className="mr-2 h-5 w-5" />
            Ouvir no Spotify
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpotifyPlaylist;

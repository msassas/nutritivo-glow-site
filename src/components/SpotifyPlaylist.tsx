import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpotifyPlaylist = () => {
  return (
    <section id="spotify" className="py-20 bg-gradient-to-br from-secondary via-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Music className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escute Minha Playlist no Spotify
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Aproveite uma seleção especial de músicas para relaxar e se inspirar durante sua jornada de saúde e bem-estar.
          </p>

          <Button
            variant="pill"
            size="xl"
            onClick={() => window.open("https://open.spotify.com/playlist/2a7XLbYEIu5VGuNSGkhYhl?si=oJUOJI8bT_K-Y_3HlA4mrQ&pi=ecZ3SH0SSyi0Z", "_blank")}
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

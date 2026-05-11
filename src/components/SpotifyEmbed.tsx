const SpotifyEmbed = () => {
  return (
    <section className="mt-12 opacity-0 animate-fade-in-delay-5">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 text-center">
        Latest Release
      </h2>
      <div className="rounded-2xl overflow-hidden bg-card border border-border">
        <iframe
          src="https://open.spotify.com/embed/track/4PTG3Z6ehGkBFwjybzWkR8?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl"
          title="Spotify Player"
        />
      </div>
    </section>
  );
};

export default SpotifyEmbed;

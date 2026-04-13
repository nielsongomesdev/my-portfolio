"use client";

export const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-2] bg-cosmic-bg-near-black pointer-events-none">
      <div className="absolute inset-0 bg-linear-to-b from-cosmic-bg-deep-indigo via-cosmic-bg-near-black to-cosmic-bg-near-black" />
    </div>
  );
};

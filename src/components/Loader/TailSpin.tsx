import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="relative flex items-center justify-start w-10 h-10 rounded-full animate-spin"
      style={{
        "--uib-size": "40px",
        "--uib-color": "#F59E0B",
        "--uib-speed": ".9s",
        "--uib-stroke": "5px",
        "--mask-size": "calc(var(--uib-size) / 2 - var(--uib-stroke))",
        WebkitMask: "radial-gradient(circle var(--mask-size), transparent 99%, #000 100%)",
        mask: "radial-gradient(circle var(--mask-size), transparent 99%, #000 100%)",
        backgroundImage: "conic-gradient(transparent 25%, var(--uib-color))",
        animation: "spin var(--uib-speed) linear infinite",
      } as React.CSSProperties}
    ></div>
  );
};

export default Spinner;

// Logo estilo TypeScript - versão azul
export function GPLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background azul TypeScript */}
      <rect width="128" height="128" rx="6" fill="#3178C6" />

      {/* GP usando fonte bold estilo TS */}
      <text
        x="64"
        y="92"
        textAnchor="middle"
        fill="white"
        style={{
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "72px",
          fontWeight: 600,
          letterSpacing: "-4px",
        }}
      >
        GP
      </text>
    </svg>
  )
}

// Logo estilo TypeScript - versão branca/glass para fundos escuros
export function GPLogoWhite({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background - borda branca, interior transparente */}
      <rect
        x="2"
        y="2"
        width="124"
        height="124"
        rx="6"
        fill="transparent"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="3"
      />

      {/* GP usando fonte bold estilo TS */}
      <text
        x="64"
        y="92"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.9"
        style={{
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "72px",
          fontWeight: 600,
          letterSpacing: "-4px",
        }}
      >
        GP
      </text>
    </svg>
  )
}

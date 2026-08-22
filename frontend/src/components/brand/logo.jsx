export function Logo({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 170 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Yugent"
      role="img"
      {...props}
    >
      {/* यु */}
      <text
        x="0"
        y="38"
        className="fill-primary"
        fontFamily="Noto Sans Devanagari, sans-serif"
        fontSize="38"
        fontWeight="700"
      >
        यु
      </text>

      {/* gent */}
      <text
        x="30"
        y="37"
        className="fill-foreground"
        fontFamily="Cascadia Code Pl"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-1.4"
      >
        gent
      </text>
    </svg>
  );
}

import PropTypes from "prop-types";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-semibold shadow-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]",
  secondary:
    "border border-slate-800 bg-slate-900/70 text-slate-50 hover:border-cyan-400/60 hover:bg-slate-800",
  ghost: "text-slate-400 hover:text-slate-50 hover:bg-slate-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm min-h-[44px]",
  lg: "px-6 py-3 text-base min-h-[48px]",
};

export function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

Button.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

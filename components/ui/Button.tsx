import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "whatsapp" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-600 to-brand-800 text-white shadow-md shadow-brand-950/25 hover:from-brand-500 hover:to-brand-700 hover:shadow-lg hover:shadow-brand-950/30 focus-visible:ring-brand-500",
  gold:
    "bg-gradient-to-b from-gold-400 to-gold-600 text-brand-950 shadow-md shadow-gold-700/30 hover:from-gold-300 hover:to-gold-500 hover:shadow-lg focus-visible:ring-gold-500",
  whatsapp:
    "bg-gradient-to-b from-[#2ee06f] to-whatsapp-dark text-white shadow-md shadow-emerald-950/25 hover:brightness-105 hover:shadow-lg focus-visible:ring-whatsapp",
  outline:
    "border-2 border-white/70 text-white backdrop-blur-sm hover:bg-white hover:text-brand-900 hover:border-white",
  ghost: "text-brand-800 hover:bg-brand-100",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

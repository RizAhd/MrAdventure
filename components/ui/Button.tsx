import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "whatsapp" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-600 shadow-sm hover:shadow-md",
  gold: "bg-gold-500 text-brand-950 hover:bg-gold-400 focus-visible:ring-gold-500 shadow-sm hover:shadow-md",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark focus-visible:ring-whatsapp shadow-sm hover:shadow-md",
  outline: "border-2 border-white/70 text-white hover:bg-white hover:text-brand-900 backdrop-blur-sm",
  ghost: "text-brand-800 hover:bg-brand-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
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

import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  children: React.ReactNode;
  variant?: "default" | "emphasis";
  className?: string;
}

export function QuoteBlock({ children, variant = "default", className }: QuoteBlockProps) {
  return (
    <div className={cn("relative py-8 px-4 sm:px-0", className)}>
      {/* Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#838681] opacity-25" />
      <div className="relative py-4">
        {/* Quote Marks */}
        <span className="absolute top-0 left-0 text-4xl font-serif text-[#838681] opacity-70 leading-none select-none">
          «
        </span>
        
        <div className="font-sans text-[#111111]/80 px-8 text-base text-left">
          {children}
        </div>

        <span className="absolute bottom-0 right-0 text-4xl font-serif text-[#838681] opacity-70 leading-none select-none">
          »
        </span>
      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#838681] opacity-25" />
    </div>
  );
}

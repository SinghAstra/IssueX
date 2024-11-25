import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "blue" | "purple" | "orange" | "green";
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  variant = "blue",
}: StatsCardProps) {
  const variantStyles = {
    blue: "bg-[#1a1f37] hover:bg-[#1a1f37]/80 before:from-[#2d8cf0]/10 before:to-transparent",
    purple:
      "bg-[#1a1732] hover:bg-[#1a1732]/80 before:from-[#7928ca]/10 before:to-transparent",
    orange:
      "bg-[#1a1f37] hover:bg-[#1a1f37]/80 before:from-[#ff4d4d]/10 before:to-transparent",
    green:
      "bg-[#1a2637] hover:bg-[#1a2637]/80 before:from-[#33b469]/10 before:to-transparent",
  };

  const iconStyles = {
    blue: "bg-[#2d8cf0]/10 text-[#2d8cf0]",
    purple: "bg-[#7928ca]/10 text-[#7928ca]",
    orange: "bg-[#ff4d4d]/10 text-[#ff4d4d]",
    green: "bg-[#33b469]/10 text-[#33b469]",
  };

  const trendColors = {
    positive: "text-[#33b469]",
    negative: "text-[#ff4d4d]",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "border-[#1a1f37] shadow-lg",
        "before:absolute before:inset-0 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "before:bg-gradient-to-br",
        variantStyles[variant],
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {value}
              </h2>
              {trend && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive
                      ? trendColors.positive
                      : trendColors.negative
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className={cn("rounded-xl p-3", iconStyles[variant])}>
              {icon}
            </div>
          )}
        </div>
        {description && (
          <p className="mt-4 text-sm text-muted-foreground border-t border-[#2a2f45]/50 pt-4">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

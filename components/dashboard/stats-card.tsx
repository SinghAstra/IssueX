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
    blue: "bg-card hover:bg-card/80 before:from-[hsl(var(--stats-blue))]/10 before:to-transparent",
    purple:
      "bg-card hover:bg-card/80 before:from-[hsl(var(--stats-purple))]/10 before:to-transparent",
    orange:
      "bg-card hover:bg-card/80 before:from-[hsl(var(--stats-orange))]/10 before:to-transparent",
    green:
      "bg-card hover:bg-card/80 before:from-[hsl(var(--stats-green))]/10 before:to-transparent",
  };

  const iconStyles = {
    blue: "bg-[hsl(var(--stats-blue))]/10 text-[hsl(var(--stats-blue))]",
    purple: "bg-[hsl(var(--stats-purple))]/10 text-[hsl(var(--stats-purple))]",
    orange: "bg-[hsl(var(--stats-orange))]/10 text-[hsl(var(--stats-orange))]",
    green: "bg-[hsl(var(--stats-green))]/10 text-[hsl(var(--stats-green))]",
  };

  const trendColors = {
    positive: "text-[hsl(var(--stats-green))]",
    negative: "text-[hsl(var(--stats-orange))]",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "border-border shadow-lg",
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
          <p className="mt-4 text-sm text-muted-foreground border-t border-border/50 pt-4">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

type KPIChartProps = {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
};

const colorClasses = {
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-950',
    green: 'text-green-500 bg-green-50 dark:bg-green-950',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-950',
    orange: 'text-orange-500 bg-orange-50 dark:bg-orange-950',
    red: 'text-red-500 bg-red-50 dark:bg-red-950',
};

export function KPIChart({ title, value, change, changeLabel, icon, color = 'blue' }: KPIChartProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && (
                    <div className={`rounded-full p-2 ${colorClasses[color]}`}>
                        {icon}
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change !== undefined && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        {isPositive && <TrendingUp className="h-3 w-3 text-green-500" />}
                        {isNegative && <TrendingDown className="h-3 w-3 text-red-500" />}
                        <span className={isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : ''}>
                            {change > 0 ? '+' : ''}{change}%
                        </span>
                        {changeLabel && <span>{changeLabel}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

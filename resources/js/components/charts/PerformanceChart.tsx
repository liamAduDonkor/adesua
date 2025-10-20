import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

type PerformanceData = {
    subject: string;
    score: number;
    grade: string;
    average?: number;
};

type PerformanceChartProps = {
    data: PerformanceData[];
    title?: string;
    showAverage?: boolean;
};

const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
        case 'A':
        case 'A+':
            return 'text-green-600 bg-green-50 dark:bg-green-950';
        case 'B':
        case 'B+':
            return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
        case 'C':
        case 'C+':
            return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
        case 'D':
            return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
        default:
            return 'text-red-600 bg-red-50 dark:bg-red-950';
    }
};

const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
};

export function PerformanceChart({ data, title = 'Academic Performance', showAverage = true }: PerformanceChartProps) {
    const overallAverage = data.length > 0 
        ? Math.round(data.reduce((sum, item) => sum + item.score, 0) / data.length) 
        : 0;

    const getOverallGrade = (avg: number) => {
        if (avg >= 90) return 'A+';
        if (avg >= 80) return 'A';
        if (avg >= 70) return 'B';
        if (avg >= 60) return 'C';
        if (avg >= 50) return 'D';
        return 'F';
    };

    const overallGrade = getOverallGrade(overallAverage);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        {title}
                    </span>
                    {showAverage && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-normal text-muted-foreground">Overall:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(overallGrade)}`}>
                                {overallGrade}
                            </span>
                            <span className="text-lg font-bold">{overallAverage}%</span>
                        </div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="font-medium">{item.subject}</div>
                                    {item.average && (
                                        <div className="text-xs text-muted-foreground">
                                            Class average: {item.average}%
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(item.grade)}`}>
                                        {item.grade}
                                    </span>
                                    <span className="text-lg font-bold min-w-[3rem] text-right">
                                        {item.score}%
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className={`absolute h-full ${getScoreColor(item.score)} transition-all duration-300`}
                                    style={{ width: `${item.score}%` }}
                                />
                                {item.average && (
                                    <div
                                        className="absolute h-full border-r-2 border-white"
                                        style={{ left: `${item.average}%` }}
                                        title={`Class average: ${item.average}%`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {data.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No performance data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

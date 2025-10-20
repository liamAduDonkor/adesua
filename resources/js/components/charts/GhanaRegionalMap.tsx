import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { School, Users, GraduationCap } from 'lucide-react';

type RegionData = {
    region: string;
    schools: number;
    teachers: number;
    students: number;
};

type GhanaRegionalMapProps = {
    regionalData: {
        teachers_by_region: Array<{ region: string; count: number }>;
        students_by_region: Array<{ region: string; count: number }>;
        schools_by_region: Array<{ region: string; count: number }>;
    };
};

// Ghana regions with approximate SVG path coordinates
const GHANA_REGIONS: Record<string, { path: string; labelX: number; labelY: number }> = {
    'Greater Accra': {
        path: 'M 420 380 L 450 380 L 460 400 L 450 420 L 420 420 Z',
        labelX: 435,
        labelY: 400
    },
    'Ashanti': {
        path: 'M 340 300 L 380 290 L 400 320 L 390 360 L 360 370 L 330 340 Z',
        labelX: 365,
        labelY: 330
    },
    'Northern': {
        path: 'M 300 80 L 380 70 L 400 120 L 390 180 L 360 200 L 320 190 L 280 150 Z',
        labelX: 340,
        labelY: 140
    },
    'Western': {
        path: 'M 240 320 L 300 310 L 320 350 L 310 400 L 270 420 L 220 380 Z',
        labelX: 270,
        labelY: 360
    },
    'Central': {
        path: 'M 320 350 L 360 340 L 380 370 L 370 400 L 340 410 L 310 390 Z',
        labelX: 345,
        labelY: 375
    },
    'Eastern': {
        path: 'M 380 320 L 420 310 L 440 340 L 430 370 L 400 380 L 370 360 Z',
        labelX: 405,
        labelY: 345
    },
    'Volta': {
        path: 'M 440 300 L 480 300 L 490 340 L 480 380 L 450 380 L 430 350 Z',
        labelX: 460,
        labelY: 340
    },
    'Bono': {
        path: 'M 260 230 L 310 220 L 330 260 L 320 290 L 280 300 L 250 270 Z',
        labelX: 290,
        labelY: 260
    },
    'Bono East': {
        path: 'M 310 220 L 360 210 L 380 250 L 370 280 L 330 290 L 310 260 Z',
        labelX: 345,
        labelY: 250
    },
    'Upper West': {
        path: 'M 200 40 L 260 30 L 280 80 L 270 120 L 230 130 L 190 90 Z',
        labelX: 240,
        labelY: 80
    },
    'Upper East': {
        path: 'M 280 30 L 350 20 L 370 60 L 360 100 L 320 110 L 290 80 Z',
        labelX: 320,
        labelY: 65
    },
    'Savannah': {
        path: 'M 260 130 L 320 120 L 340 170 L 330 210 L 290 220 L 250 180 Z',
        labelX: 295,
        labelY: 170
    },
    'Ahafo': {
        path: 'M 280 260 L 320 250 L 335 280 L 325 310 L 290 315 L 270 290 Z',
        labelX: 300,
        labelY: 285
    },
    'Western North': {
        path: 'M 220 280 L 270 270 L 285 310 L 275 340 L 240 350 L 210 320 Z',
        labelX: 250,
        labelY: 310
    },
    'Oti': {
        path: 'M 400 250 L 450 240 L 465 280 L 455 320 L 420 330 L 395 290 Z',
        labelX: 430,
        labelY: 285
    },
    'North East': {
        path: 'M 360 60 L 420 50 L 440 100 L 430 140 L 390 150 L 360 110 Z',
        labelX: 395,
        labelY: 100
    }
};

export default function GhanaRegionalMap({ regionalData }: GhanaRegionalMapProps) {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    // Combine all regional data
    const combinedData: RegionData[] = regionalData.schools_by_region.map((school) => {
        const teachers = regionalData.teachers_by_region.find(t => t.region === school.region);
        const students = regionalData.students_by_region.find(s => s.region === school.region);
        
        return {
            region: school.region,
            schools: school.count,
            teachers: teachers?.count || 0,
            students: students?.count || 0
        };
    });

    // Find max values for color scaling
    const maxSchools = Math.max(...combinedData.map(d => d.schools));
    
    const getRegionColor = (region: string) => {
        const data = combinedData.find(d => d.region === region);
        if (!data) return 'rgb(229, 231, 235)'; // gray-200
        
        const intensity = data.schools / maxSchools;
        
        // Color gradient from light blue to dark blue
        const r = Math.floor(59 + (255 - 59) * (1 - intensity));
        const g = Math.floor(130 + (255 - 130) * (1 - intensity));
        const b = Math.floor(246 + (255 - 246) * (1 - intensity));
        
        return `rgb(${r}, ${g}, ${b})`;
    };

    const activeRegion = selectedRegion || hoveredRegion;
    const activeData = activeRegion ? combinedData.find(d => d.region === activeRegion) : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Visualization */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <School className="h-5 w-5" />
                            Ghana Regional Distribution Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-square">
                            <svg
                                viewBox="0 0 500 500"
                                className="absolute inset-0 w-full h-full border border-gray-200 rounded-lg"
                            >
                                {/* Background */}
                                <rect width="500" height="500" fill="#f9fafb" />
                                
                                {/* Regions */}
                                {Object.entries(GHANA_REGIONS).map(([region, coords]) => {
                                    const isActive = activeRegion === region;
                                    const color = getRegionColor(region);
                                    
                                    return (
                                        <g key={region}>
                                            <path
                                                d={coords.path}
                                                fill={color}
                                                stroke={isActive ? '#1d4ed8' : '#6b7280'}
                                                strokeWidth={isActive ? 3 : 1}
                                                className={`transition-all duration-200 cursor-pointer hover:opacity-80 ${isActive ? 'brightness-90' : ''}`}
                                                onMouseEnter={() => setHoveredRegion(region)}
                                                onMouseLeave={() => setHoveredRegion(null)}
                                                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                                            />
                                        </g>
                                    );
                                })}

                                {/* Region Labels */}
                                {Object.entries(GHANA_REGIONS).map(([region, coords]) => {
                                    const data = combinedData.find(d => d.region === region);
                                    if (!data) return null;
                                    
                                    return (
                                        <text
                                            key={`label-${region}`}
                                            x={coords.labelX}
                                            y={coords.labelY}
                                            textAnchor="middle"
                                            className="pointer-events-none text-[8px] font-medium"
                                            fill="#374151"
                                        >
                                            {data.schools}
                                        </text>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Fewer Schools</span>
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-4 rounded bg-gradient-to-r from-blue-200 to-blue-500"></div>
                            </div>
                            <span className="text-muted-foreground">More Schools</span>
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground text-center">
                            Click or hover on a region to view detailed statistics
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Region Details */}
            <div className="lg:col-span-1">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg">Region Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activeData ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{activeData.region}</h3>
                                    <Badge variant="outline" className="text-xs">
                                        Region
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <School className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">Schools</div>
                                            <div className="text-2xl font-bold">{activeData.schools.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <GraduationCap className="h-5 w-5 text-green-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">Teachers</div>
                                            <div className="text-2xl font-bold">{activeData.teachers.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                        <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-sm text-muted-foreground">Students</div>
                                            <div className="text-2xl font-bold">{activeData.students.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Metrics */}
                                <div className="pt-4 border-t space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Students per School</span>
                                        <span className="font-medium">
                                            {activeData.schools > 0 
                                                ? Math.round(activeData.students / activeData.schools).toLocaleString()
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Teachers per School</span>
                                        <span className="font-medium">
                                            {activeData.schools > 0 
                                                ? Math.round(activeData.teachers / activeData.schools).toLocaleString()
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Student-Teacher Ratio</span>
                                        <span className="font-medium">
                                            {activeData.teachers > 0 
                                                ? `${Math.round(activeData.students / activeData.teachers)}:1`
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <School className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                                <h3 className="font-medium mb-1">No Region Selected</h3>
                                <p className="text-sm text-muted-foreground">
                                    Hover or click on a region on the map to view its statistics
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


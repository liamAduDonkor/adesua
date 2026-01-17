import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { School, Users, GraduationCap, MapPin } from 'lucide-react';

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

// Ghana regions with accurate clickable areas based on the actual map
// Coordinates are percentages (0-100) relative to the image dimensions
const GHANA_REGIONS: Record<string, { 
    polygon: string; // SVG polygon points in percentage coordinates
    centerX: number; // Label position X (percentage)
    centerY: number; // Label position Y (percentage)
}> = {
    'Upper East': {
        polygon: '70,8 85,10 87,18 82,25 75,23 68,15',
        centerX: 77,
        centerY: 17
    },
    'North East': {
        polygon: '62,12 70,8 68,15 75,23 72,28 65,25',
        centerX: 69,
        centerY: 19
    },
    'Upper West': {
        polygon: '45,12 58,10 62,12 65,25 60,32 52,30 48,22',
        centerX: 55,
        centerY: 20
    },
    'Northern': {
        polygon: '48,22 52,30 60,32 65,25 72,28 75,35 70,45 65,48 58,42 52,38 48,32',
        centerX: 60,
        centerY: 35
    },
    'Savannah': {
        polygon: '48,32 52,38 58,42 60,48 55,52 48,48 42,40',
        centerX: 52,
        centerY: 43
    },
    'Bono East': {
        polygon: '55,52 60,48 65,48 68,52 65,58 60,58 56,55',
        centerX: 61,
        centerY: 53
    },
    'Oti': {
        polygon: '68,52 72,48 78,50 82,58 80,65 75,65 70,60',
        centerX: 76,
        centerY: 57
    },
    'Bono': {
        polygon: '48,48 55,52 56,55 52,62 48,60 44,55',
        centerX: 50,
        centerY: 55
    },
    'Ahafo': {
        polygon: '52,62 56,55 60,58 58,65 54,67',
        centerX: 56,
        centerY: 61
    },
    'Ashanti': {
        polygon: '56,55 60,58 65,58 68,62 70,68 65,72 60,70 56,68 54,67',
        centerX: 62,
        centerY: 64
    },
    'Eastern': {
        polygon: '65,58 68,52 70,60 75,65 80,65 82,70 78,75 72,73 68,70 68,62',
        centerX: 74,
        centerY: 66
    },
    'Volta': {
        polygon: '80,65 82,70 85,75 85,82 80,82 78,75',
        centerX: 82,
        centerY: 74
    },
    'Western North': {
        polygon: '38,62 44,55 48,60 52,62 50,68 45,70 40,68',
        centerX: 45,
        centerY: 63
    },
    'Western': {
        polygon: '32,72 38,62 40,68 45,70 48,78 45,85 38,88 32,85 28,78',
        centerX: 38,
        centerY: 77
    },
    'Central': {
        polygon: '45,70 50,68 54,67 56,68 60,70 58,78 52,82 48,78',
        centerX: 53,
        centerY: 74
    },
    'Greater Accra': {
        polygon: '60,70 65,72 68,70 72,73 70,78 65,80 62,78 58,78',
        centerX: 65,
        centerY: 75
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
                            <MapPin className="h-5 w-5" />
                            Ghana Regional Distribution Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
                            {/* Base Map Image */}
                            <img 
                                src="/ghana-regional-map.png" 
                                alt="Ghana Regional Map"
                                className="absolute inset-0 w-full h-full object-contain rounded-lg"
                            />
                            
                            {/* Interactive SVG Overlay */}
                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid meet"
                                className="absolute inset-0 w-full h-full"
                                style={{ pointerEvents: 'none' }}
                            >
                                {/* Interactive Regions */}
                                {Object.entries(GHANA_REGIONS).map(([region, coords]) => {
                                    const isActive = activeRegion === region;
                                    const data = combinedData.find(d => d.region === region);
                                    
                                    return (
                                        <g key={region}>
                                            {/* Clickable Polygon */}
                                            <polygon
                                                points={coords.polygon}
                                                fill={isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}
                                                stroke={isActive ? 'rgba(59, 130, 246, 0.8)' : 'transparent'}
                                                strokeWidth={isActive ? 0.5 : 0}
                                                className="transition-all duration-200 cursor-pointer"
                                                style={{ pointerEvents: 'auto' }}
                                                onMouseEnter={() => setHoveredRegion(region)}
                                                onMouseLeave={() => setHoveredRegion(null)}
                                                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                                            />
                                            
                                            {/* Region Name on Hover */}
                                            {isActive && (
                                                <g>
                                                    <rect
                                                        x={coords.centerX - 8}
                                                        y={coords.centerY - 3}
                                                        width="16"
                                                        height="6"
                                                        fill="rgba(255, 255, 255, 0.95)"
                                                        rx="1"
                                                        className="pointer-events-none drop-shadow-lg"
                                                    />
                                                    <text
                                                        x={coords.centerX}
                                                        y={coords.centerY + 1}
                                                        textAnchor="middle"
                                                        className="pointer-events-none text-[2px] font-bold fill-blue-700"
                                                    >
                                                        {region}
                                                    </text>
                                                    {data && (
                                                        <text
                                                            x={coords.centerX}
                                                            y={coords.centerY + 2.5}
                                                            textAnchor="middle"
                                                            className="pointer-events-none text-[1.5px] font-semibold fill-blue-600"
                                                        >
                                                            {data.schools} schools
                                                        </text>
                                                    )}
                                                </g>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Legend */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-100"></div>
                                    <span className="text-muted-foreground">Selected Region</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span className="text-muted-foreground">Interactive Map</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground text-center">
                                Click on any region to view detailed statistics and educational metrics
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Region Details */}
            <div className="lg:col-span-1">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <School className="h-5 w-5" />
                            Region Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activeData ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{activeData.region}</h3>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="text-xs">
                                            {activeData.region.includes('North') || activeData.region.includes('Upper') || activeData.region.includes('Savannah') ? 'Northern Belt' : 
                                             activeData.region.includes('Greater Accra') || activeData.region.includes('Central') || activeData.region.includes('Western') ? 'Coastal Region' :
                                             'Middle Belt'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Key Metrics Cards */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 shadow-sm">
                                        <School className="h-6 w-6 text-blue-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground uppercase font-semibold">Schools</div>
                                            <div className="text-3xl font-bold text-blue-700">{activeData.schools.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {((activeData.schools / combinedData.reduce((sum, d) => sum + d.schools, 0)) * 100).toFixed(1)}% of national total
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800 shadow-sm">
                                        <GraduationCap className="h-6 w-6 text-green-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground uppercase font-semibold">Teachers</div>
                                            <div className="text-3xl font-bold text-green-700">{activeData.teachers.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {((activeData.teachers / combinedData.reduce((sum, d) => sum + d.teachers, 0)) * 100).toFixed(1)}% of national total
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800 shadow-sm">
                                        <Users className="h-6 w-6 text-purple-600 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="text-xs text-muted-foreground uppercase font-semibold">Students</div>
                                            <div className="text-3xl font-bold text-purple-700">{activeData.students.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {((activeData.students / combinedData.reduce((sum, d) => sum + d.students, 0)) * 100).toFixed(1)}% of national total
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="pt-4 border-t space-y-3">
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Performance Indicators</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                                            <span className="text-muted-foreground font-medium">Students per School</span>
                                            <span className="font-bold text-base">
                                                {activeData.schools > 0 
                                                    ? Math.round(activeData.students / activeData.schools).toLocaleString()
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                                            <span className="text-muted-foreground font-medium">Teachers per School</span>
                                            <span className="font-bold text-base">
                                                {activeData.schools > 0 
                                                    ? Math.round(activeData.teachers / activeData.schools).toLocaleString()
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                                            <span className="text-muted-foreground font-medium">Student-Teacher Ratio</span>
                                            <span className="font-bold text-base">
                                                {activeData.teachers > 0 
                                                    ? `${Math.round(activeData.students / activeData.teachers)}:1`
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <MapPin className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                                <h3 className="font-medium mb-1">No Region Selected</h3>
                                <p className="text-sm text-muted-foreground px-4">
                                    Click on any region on the map to view detailed educational statistics and performance metrics
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


# Ghana Regional Map Visualization

## Overview

An interactive map visualization component that displays Ghana's 16 administrative regions with educational statistics including schools, teachers, and students per region.

## Features

### 🗺️ Interactive Map
- **Visual representation** of all 16 regions of Ghana
- **Color-coded regions** based on school density (lighter = fewer schools, darker = more schools)
- **Interactive hover states** to preview region data
- **Clickable regions** to lock selection and view detailed statistics

### 📊 Data Visualization
The map displays three key metrics for each region:
1. **Schools** - Total number of schools in the region
2. **Teachers** - Total number of teachers in the region
3. **Students** - Total number of students enrolled in the region

### 📈 Calculated Metrics
When a region is selected, the following metrics are automatically calculated:
- **Students per School** - Average student enrollment per school
- **Teachers per School** - Average teacher allocation per school
- **Student-Teacher Ratio** - Ratio of students to teachers (PTR)

## Ghana's 16 Regions

The map includes all current administrative regions:

1. **Greater Accra** - National capital region
2. **Ashanti** - Second most populous region
3. **Northern** - Largest region by area
4. **Western** - Coastal region with mining activities
5. **Central** - Coastal region with historical sites
6. **Eastern** - Agricultural region
7. **Volta** - Eastern region along Lake Volta
8. **Bono** - Western region, formerly part of Brong-Ahafo
9. **Bono East** - Eastern region, formerly part of Brong-Ahafo
10. **Upper West** - Northwestern region
11. **Upper East** - Northeastern region
12. **Savannah** - Northern region, formerly part of Northern
13. **Ahafo** - Central region, split from Brong-Ahafo
14. **Western North** - Northern Western region
15. **Oti** - Eastern region, split from Volta
16. **North East** - Northeastern region, split from Northern

## Location

The map is integrated into the **Admin Analytics Dashboard** at:
- **URL**: `/admin/analytics`
- **File**: `resources/js/pages/admin/analytics/dashboard.tsx`

## Component Details

### Component File
- **Path**: `resources/js/components/charts/GhanaRegionalMap.tsx`
- **Type**: React TypeScript Component

### Props Interface
```typescript
type GhanaRegionalMapProps = {
    regionalData: {
        teachers_by_region: Array<{ region: string; count: number }>;
        students_by_region: Array<{ region: string; count: number }>;
        schools_by_region: Array<{ region: string; count: number }>;
    };
};
```

### Backend Data Source
- **Controller**: `AdminAnalyticsController`
- **Method**: `dashboard()`
- **File**: `app/Http/Controllers/AdminAnalyticsController.php`

The controller queries the database to aggregate:
```php
$regionalAnalytics = [
    'teachers_by_region' => DB::table('teachers')
        ->join('schools', 'teachers.school_id', '=', 'schools.id')
        ->select('schools.region', DB::raw('COUNT(*) as count'))
        ->groupBy('schools.region')
        ->get(),
    'students_by_region' => DB::table('students')
        ->join('schools', 'students.school_id', '=', 'schools.id')
        ->select('schools.region', DB::raw('COUNT(*) as count'))
        ->groupBy('schools.region')
        ->get(),
    'schools_by_region' => DB::table('schools')
        ->select('region', DB::raw('COUNT(*) as count'))
        ->groupBy('region')
        ->get(),
];
```

## Usage

### Viewing the Map
1. Log in as an **Admin** user
2. Navigate to **Admin** → **Analytics**
3. Scroll to the **Ghana Regional Distribution Map** section

### Interacting with the Map
1. **Hover** over any region to see a preview of its name
2. **Click** on a region to lock the selection and view detailed statistics in the side panel
3. The side panel displays:
   - Region name and badge
   - Total schools (blue card)
   - Total teachers (green card)
   - Total students (purple card)
   - Calculated metrics (students per school, teachers per school, PTR)

### Understanding the Color Scale
- **Light Blue** regions have fewer schools
- **Dark Blue** regions have more schools
- The gradient provides a quick visual reference for school distribution across Ghana

## Technical Implementation

### SVG Path Data
Each region is represented by an SVG path with approximate coordinates. The paths are defined in the `GHANA_REGIONS` object with:
- `path` - SVG path data for the region boundary
- `labelX` - X coordinate for the school count label
- `labelY` - Y coordinate for the school count label

### Color Calculation
Colors are dynamically calculated based on school density:
```typescript
const intensity = data.schools / maxSchools;
const r = Math.floor(59 + (255 - 59) * (1 - intensity));
const g = Math.floor(130 + (255 - 130) * (1 - intensity));
const b = Math.floor(246 + (255 - 246) * (1 - intensity));
```

### State Management
The component uses React hooks for state:
- `selectedRegion` - Currently clicked/locked region
- `hoveredRegion` - Currently hovered region
- `activeRegion` - Combined state (selected takes precedence over hovered)

## Styling

The component uses:
- **Tailwind CSS** for utility classes
- **shadcn/ui** components (Card, Badge)
- **Lucide React** icons (School, Users, GraduationCap)
- **Responsive design** with grid layout

## Data Flow

1. **Database** → Schools table contains `region` field
2. **Controller** → Aggregates counts by region
3. **Inertia.js** → Passes data to React component
4. **Dashboard Page** → Receives `regionalAnalytics` prop
5. **Map Component** → Combines data and renders visualization

## Future Enhancements

Possible improvements:
- Add drill-down capability to view schools within a region
- Include additional metrics (performance, attendance rates)
- Add filtering by academic year
- Export map data as PDF/Image
- Add comparison mode between regions
- Show historical trends over time
- Add search/filter for specific regions

## Accessibility

- Keyboard navigation support through click events
- Screen reader friendly with semantic HTML
- High contrast color scheme
- Clear visual indicators for active states

## Browser Compatibility

The SVG-based map works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight** - No external mapping libraries required
- **Fast rendering** - Pure SVG with React optimization
- **Responsive** - Adapts to different screen sizes
- **No API calls** - Data loaded once with page

---

**Created**: October 20, 2025  
**Version**: 1.0  
**Author**: AI Assistant  
**System**: ADESUA (Ghana Education Management System)


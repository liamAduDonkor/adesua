import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

type Column<T> = {
    key: keyof T | string;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    title?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    exportable?: boolean;
    onExport?: () => void;
    pagination?: boolean;
    pageSize?: number;
    actions?: (row: T) => React.ReactNode;
};

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    title,
    searchable = true,
    searchPlaceholder = 'Search...',
    exportable = true,
    onExport,
    pagination = true,
    pageSize = 10,
    actions,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Filter data based on search
    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Sort data
    const sortedData = sortColumn
        ? [...filteredData].sort((a, b) => {
              const aVal = a[sortColumn];
              const bVal = b[sortColumn];
              if (aVal === bVal) return 0;
              const comparison = aVal > bVal ? 1 : -1;
              return sortDirection === 'asc' ? comparison : -comparison;
          })
        : filteredData;

    // Paginate data
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const paginatedData = pagination
        ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : sortedData;

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getValue = (row: T, key: string): any => {
        if (key.includes('.')) {
            return key.split('.').reduce((obj, k) => obj?.[k], row);
        }
        return row[key];
    };

    return (
        <Card>
            {(title || searchable || exportable) && (
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {title && <CardTitle>{title}</CardTitle>}
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            {searchable && (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder={searchPlaceholder}
                                        value={searchQuery}
                                        onChange={e => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="pl-9 w-full md:w-64"
                                    />
                                </div>
                            )}
                            {exportable && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onExport}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
            )}
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                {columns.map((column, idx) => (
                                    <th
                                        key={idx}
                                        className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                                            column.sortable ? 'cursor-pointer hover:text-foreground' : ''
                                        }`}
                                        onClick={() => column.sortable && handleSort(String(column.key))}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {column.sortable && (
                                                <ArrowUpDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actions && <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b hover:bg-muted/50">
                                        {columns.map((column, colIdx) => (
                                            <td key={colIdx} className="px-4 py-3 text-sm">
                                                {column.render
                                                    ? column.render(getValue(row, String(column.key)), row)
                                                    : getValue(row, String(column.key))}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-4 py-3 text-sm">
                                                {actions(row)}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions ? 1 : 0)}
                                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <span className="text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

/**
 * Composable for generating SVG chart paths and mock data.
 * Used by wallet and dashboard views for sparkline visualizations.
 */

export function useChart() {
    /**
     * Generate a smooth SVG path string from data points
     * using quadratic Bezier curves.
     */
    const getSmoothPath = (
        data: number[],
        width: number,
        height: number
    ): string => {
        if (data.length === 0) return '';

        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        const points: [number, number][] = data.map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - min) / range) * height;
            return [x, y];
        });

        return points.reduce((path, point, i, a) => {
            if (i === 0) {
                return `M ${point[0]},${point[1]}`;
            }

            const prev = a[i - 1]!;
            const midX = (prev[0] + point[0]) / 2;
            const midY = (prev[1] + point[1]) / 2;

            return `${path} Q ${prev[0]},${prev[1]} ${midX},${midY} T ${point[0]},${point[1]}`;
        }, '');
    };

    /**
     * Generate an array of random chart data points
     * with a directional bias (up, down, or flat).
     */
    const generateFakeData = (
        length: number = 10,
        trend: 'up' | 'down' | 'flat' = 'up'
    ): number[] => {
        let current = 50;
        const data: number[] = [];

        for (let i = 0; i < length; i++) {
            const change = Math.random() * 20 - 10;
            const bias =
                trend === 'up'
                    ? 5
                    : trend === 'down'
                    ? -5
                    : 0;

            current += change + bias;
            if (current < 0) current = 0;
            data.push(current);
        }

        return data;
    };

    return {
        getSmoothPath,
        generateFakeData,
    };
}

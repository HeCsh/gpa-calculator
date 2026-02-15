"use client";

import type { SemesterGPAPoint } from "@/lib/gpa/types";

interface GPATrendChartProps {
  data: SemesterGPAPoint[];
  maxGPA: number;
}

export function GPATrendChart({ data, maxGPA }: GPATrendChartProps) {
  if (data.length < 2) return null;

  const width = 220;
  const height = 80;
  const paddingX = 28;
  const paddingTop = 12;
  const paddingBottom = 20;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingTop - paddingBottom;

  const minGPA = Math.max(0, Math.min(...data.map((d) => d.gpa)) - 0.3);
  const maxY = Math.min(maxGPA, Math.max(...data.map((d) => d.gpa)) + 0.3);

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartW;
    const y =
      paddingTop +
      chartH -
      ((d.gpa - minGPA) / (maxY - minGPA)) * chartH;
    return { x, y, ...d };
  });

  // Build line segments with different styles for counted vs not-counted
  const segments: { path: string; dashed: boolean }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    const dashed = !!(from.notCountedByUC || to.notCountedByUC);
    segments.push({
      path: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
      dashed,
    });
  }

  return (
    <div className="mt-3">
      <p className="text-xs text-muted-foreground mb-1">Semester trend</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxWidth: width }}
      >
        {/* Grid lines */}
        {[0, 0.5, 1].map((t) => {
          const y = paddingTop + chartH * (1 - t);
          const val = (minGPA + t * (maxY - minGPA)).toFixed(1);
          return (
            <g key={t}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray="2 2"
              />
              <text
                x={paddingX - 4}
                y={y + 3}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize={8}
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Line segments */}
        {segments.map((seg, i) => (
          <path
            key={i}
            d={seg.path}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={seg.dashed ? "text-muted-foreground" : "text-primary"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={seg.dashed ? "4 3" : undefined}
            strokeOpacity={seg.dashed ? 0.5 : 1}
          />
        ))}

        {/* Dots and labels */}
        {points.map((p, i) => {
          const excluded = p.notCountedByUC;
          return (
            <g key={i} opacity={excluded ? 0.4 : 1}>
              <circle
                cx={p.x}
                cy={p.y}
                r={3}
                className={excluded ? "fill-muted-foreground" : "fill-primary"}
              />
              {/* GPA value above dot */}
              <text
                x={p.x}
                y={p.y - 6}
                textAnchor="middle"
                className={excluded ? "fill-muted-foreground" : "fill-foreground"}
                fontSize={8}
                fontWeight={600}
              >
                {p.gpa.toFixed(2)}
              </text>
              {/* Semester label below */}
              <text
                x={p.x}
                y={height - 4}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize={7}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

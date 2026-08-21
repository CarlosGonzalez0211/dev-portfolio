'use client';

import React from 'react';

export interface PixelSpriteProps {
  /** Rows of characters; '.' or ' ' is transparent. Each other char maps via palette. */
  grid: string[];
  palette: Record<string, string>;
  /** Top-left origin in SVG user units. */
  x: number;
  y: number;
  /** Size of one pixel in SVG user units. */
  pixel: number;
  /** If set, an automatic 1px outline is drawn around the silhouette in this color. */
  outline?: string;
  opacity?: number;
}

/**
 * Renders a pixel-art sprite as a grid of <rect>s. Colors are usually CSS
 * variables (e.g. 'var(--celestial)') so the sprite recolors live when the
 * theme cycle updates the variables — no React re-render required.
 */
export function PixelSprite({ grid, palette, x, y, pixel, outline, opacity = 1 }: PixelSpriteProps) {
  const rects: React.ReactElement[] = [];
  const rows = grid.length;
  const cols = grid.reduce((m, r) => Math.max(m, r.length), 0);

  const isBody = (r: number, c: number) => {
    if (r < 0 || r >= rows) return false;
    const ch = grid[r][c];
    return ch !== undefined && ch !== '.' && ch !== ' ';
  };

  if (outline) {
    for (let r = -1; r <= rows; r++) {
      for (let c = -1; c <= cols; c++) {
        if (isBody(r, c)) continue;
        if (isBody(r - 1, c) || isBody(r + 1, c) || isBody(r, c - 1) || isBody(r, c + 1)) {
          rects.push(
            <rect
              key={`o-${r}-${c}`}
              x={x + c * pixel}
              y={y + r * pixel}
              width={pixel}
              height={pixel}
              fill={outline}
            />
          );
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const fill = palette[row[c]];
      if (!fill) continue;
      rects.push(
        <rect
          key={`b-${r}-${c}`}
          x={x + c * pixel}
          y={y + r * pixel}
          width={pixel}
          height={pixel}
          fill={fill}
        />
      );
    }
  }

  return (
    <g opacity={opacity} shapeRendering="crispEdges">
      {rects}
    </g>
  );
}

/**
 * A stepped pixel pyramid: each row down is 1 pixel taller and 2 wider, with a
 * lit left face, shadowed right face, dark outline edges, and periodic stone
 * tier bands. All colors are CSS variables so it recolors with the theme.
 */
export function PixelPyramid({
  cx,
  baseY,
  rows,
  pixel,
  light,
  dark,
  outline,
  band,
}: {
  cx: number;
  baseY: number;
  rows: number;
  pixel: number;
  light: string;
  dark: string;
  outline: string;
  band: string;
}) {
  const rects: React.ReactElement[] = [];
  const apexY = baseY - rows * pixel;

  for (let r = 0; r < rows; r++) {
    const widthPixels = 2 * r + 1;
    const rowY = apexY + r * pixel;
    const leftX = Math.round(cx - (r + 0.5) * pixel);
    const isBand = r > 0 && (rows - r) % 5 === 0;

    for (let i = 0; i < widthPixels; i++) {
      const edge = i === 0 || i === widthPixels - 1;
      let fill: string;
      if (edge) fill = outline;
      else if (isBand) fill = band;
      else fill = i < widthPixels / 2 ? light : dark;

      rects.push(
        <rect
          key={`${r}-${i}`}
          x={leftX + i * pixel}
          y={rowY}
          width={pixel}
          height={pixel}
          fill={fill}
        />
      );
    }
  }

  return <g shapeRendering="crispEdges">{rects}</g>;
}

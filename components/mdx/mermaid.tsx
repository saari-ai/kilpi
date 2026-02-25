'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const [svgContent, setSvgContent] = useState('');
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Render mermaid to SVG string
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'default',
    });

    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    mermaid.render(id, chart).then(({ svg }) => {
      setSvgContent(svg);
    });
  }, [chart, resolvedTheme]);

  // Patch SVG after it's injected into the DOM
  useEffect(() => {
    if (!svgRef.current || !svgContent) return;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) {
      svgEl.style.maxWidth = 'none';
    }
  }, [svgContent, fullscreen]);

  // Escape key exits fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [fullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!e.metaKey && !e.ctrlKey) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.min(Math.max(s * delta, 0.2), 5));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    translateStart.current = { ...translate };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [translate]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning.current) return;
    setTranslate({
      x: translateStart.current.x + (e.clientX - panStart.current.x),
      y: translateStart.current.y + (e.clientY - panStart.current.y),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((f) => !f);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const isTransformed = scale !== 1 || translate.x !== 0 || translate.y !== 0;

  const toolbar = (
    <div className={`flex items-center gap-2 text-sm ${
      fullscreen
        ? 'px-4 py-2 border-t border-fd-border text-fd-muted-foreground'
        : 'mt-2 text-fd-muted-foreground'
    }`}>
      <span>{'\u2318'} + scroll to zoom, drag to pan</span>
      <div className="ml-auto flex items-center gap-2">
        {isTransformed && (
          <button
            onClick={handleReset}
            className="px-2 py-1 rounded text-sm border border-fd-border hover:bg-fd-muted transition-colors"
          >
            Reset view
          </button>
        )}
        <button
          onClick={toggleFullscreen}
          className="px-2 py-1 rounded text-sm border border-fd-border hover:bg-fd-muted transition-colors"
        >
          {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        </button>
        {fullscreen && (
          <span className="text-fd-muted-foreground/60">Esc to exit</span>
        )}
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <>
        <div className="my-4" style={{ minHeight: '300px' }} />
        <div className="fixed inset-0 z-50 flex flex-col bg-fd-background">
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              ref={svgRef}
              className="flex justify-center h-full items-center"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isPanning.current ? 'none' : 'transform 0.1s ease-out',
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
          {toolbar}
        </div>
      </>
    );
  }

  return (
    <div className="my-4 relative">
      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg border border-fd-border cursor-grab active:cursor-grabbing"
        style={{ minHeight: '300px' }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          ref={svgRef}
          className="flex justify-center"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isPanning.current ? 'none' : 'transform 0.1s ease-out',
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
      {toolbar}
    </div>
  );
}

import React from 'react';
import { AlertCircle } from 'lucide-react';

export type WaveformState = 'idle' | 'processing' | 'playing' | 'paused' | 'completed' | 'error';

export interface WaveformVisualizerProps {
  state: WaveformState;
  barCount?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorVariant?: 'brand' | 'cyan' | 'violet' | 'mono';
  showGlow?: boolean;
  errorMessage?: string;
  className?: string;
}

// Brand color palette rotation: Royal Blue, Cyan, Electric Violet
const BRAND_COLORS = [
  'bg-emiqen-blue',
  'bg-emiqen-cyan',
  'bg-emiqen-violet',
  'bg-emiqen-blue',
  'bg-emiqen-cyan',
  'bg-emiqen-violet',
  'bg-emiqen-blue',
  'bg-emiqen-cyan',
];

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  state,
  barCount = 8,
  size = 'md',
  colorVariant = 'brand',
  showGlow = true,
  errorMessage,
  className = '',
}) => {
  // Height & Bar Width definitions by size
  const sizeMap = {
    xs: { height: 'h-4', barWidth: 'w-[2px]', gap: 'gap-[2px]', maxPx: 16 },
    sm: { height: 'h-5', barWidth: 'w-[3px]', gap: 'gap-1', maxPx: 20 },
    md: { height: 'h-6', barWidth: 'w-1', gap: 'gap-1', maxPx: 24 },
    lg: { height: 'h-8', barWidth: 'w-1.5', gap: 'gap-1.5', maxPx: 32 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const count = Math.min(Math.max(barCount, 4), 8);
  const bars = Array.from({ length: count }, (_, i) => i);

  // Accessible state description for screen readers
  const stateDescription = {
    idle: 'Audio waveform idle, ready to play',
    processing: 'Generating and synthesizing speech audio...',
    playing: 'Audio playback active, live waveform animating',
    paused: 'Audio playback paused',
    completed: 'Audio playback finished',
    error: errorMessage ? `Audio error: ${errorMessage}` : 'Audio playback error',
  }[state];

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="status"
      aria-label={stateDescription}
      title={state === 'error' && errorMessage ? errorMessage : stateDescription}
    >
      {state === 'error' ? (
        <div className="flex items-center gap-1.5 text-rose-500 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMessage && <span className="text-[11px] truncate max-w-[140px]">{errorMessage}</span>}
        </div>
      ) : (
        <div
          className={`flex items-end ${currentSize.height} ${currentSize.gap} px-1.5 py-0.5 rounded transition-all ${
            state === 'playing' && showGlow ? 'filter drop-shadow-[0_0_6px_rgba(0,212,232,0.45)]' : ''
          }`}
          aria-hidden="true"
        >
          {bars.map((idx) => {
            // Determine bar color
            let colorClass = BRAND_COLORS[idx % BRAND_COLORS.length];
            if (colorVariant === 'cyan') colorClass = 'bg-emiqen-cyan';
            if (colorVariant === 'violet') colorClass = 'bg-emiqen-violet';
            if (colorVariant === 'mono') colorClass = 'bg-white';

            // Base height based on index for organic silhouette (higher in center)
            const centerDistance = Math.abs(idx - (count - 1) / 2);
            const heightPercent = Math.max(30, 95 - centerDistance * 18);

            // Determine animation class and styles per state
            let animClass = '';
            let inlineStyle: React.CSSProperties = { height: `${heightPercent}%` };

            switch (state) {
              case 'playing':
                animClass = `animate-wave-bar-${(idx % 8) + 1}`;
                break;

              case 'processing':
                animClass = `animate-wave-proc-${(idx % 8) + 1}`;
                break;

              case 'idle':
                animClass = `animate-wave-idle-${(idx % 8) + 1}`;
                break;

              case 'paused':
                // Static frozen height with reduced opacity
                animClass = 'transition-opacity duration-300 opacity-60';
                inlineStyle = { height: `${Math.max(25, heightPercent * 0.65)}%` };
                break;

              case 'completed':
                // Settled resting bars
                animClass = 'transition-all duration-500 opacity-70';
                inlineStyle = { height: `${Math.max(20, heightPercent * 0.4)}%` };
                break;

              default:
                break;
            }

            return (
              <span
                key={idx}
                className={`${currentSize.barWidth} rounded-full ${colorClass} ${animClass}`}
                style={inlineStyle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

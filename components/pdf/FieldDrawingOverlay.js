"use client";

import { useState, useCallback, useRef } from "react";

export default function FieldDrawingOverlay({ onFieldDrawn, containerRef }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const overlayRef = useRef(null);

  const getRelativePosition = useCallback((e) => {
    if (!overlayRef.current) return { x: 0, y: 0 };
    const rect = overlayRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const pos = getRelativePosition(e);
    setStartPoint(pos);
    setIsDrawing(true);
    setCurrentRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
  }, [getRelativePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || !startPoint) return;

    const pos = getRelativePosition(e);
    const x = Math.min(startPoint.x, pos.x);
    const y = Math.min(startPoint.y, pos.y);
    const width = Math.abs(pos.x - startPoint.x);
    const height = Math.abs(pos.y - startPoint.y);

    setCurrentRect({ x, y, width, height });
  }, [isDrawing, startPoint, getRelativePosition]);

  const handleMouseUp = useCallback((e) => {
    if (!isDrawing || !currentRect) return;

    setIsDrawing(false);
    setStartPoint(null);

    // Minimum size check (at least 20x20 pixels)
    if (currentRect.width >= 20 && currentRect.height >= 20) {
      // Get the center of the drawn rectangle for popup position
      const centerX = currentRect.x + currentRect.width / 2;
      const centerY = currentRect.y + currentRect.height / 2;

      onFieldDrawn({
        pixelRect: currentRect,
        popupPosition: { x: centerX, y: centerY },
      });
    }

    setCurrentRect(null);
  }, [isDrawing, currentRect, onFieldDrawn]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-10"
      style={{ cursor: "crosshair" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {currentRect && currentRect.width > 0 && currentRect.height > 0 && (
        <div
          className="absolute border-2 border-primary bg-primary/20 pointer-events-none"
          style={{
            left: currentRect.x,
            top: currentRect.y,
            width: currentRect.width,
            height: currentRect.height,
          }}
        />
      )}
    </div>
  );
}

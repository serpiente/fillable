"use client";

const FIELD_COLORS = {
  text: { border: "border-blue-500", bg: "bg-blue-500/10" },
  checkbox: { border: "border-green-500", bg: "bg-green-500/10" },
  signature: { border: "border-purple-500", bg: "bg-purple-500/10" },
};

const FIELD_ICONS = {
  text: "T",
  checkbox: "\u2713",
  signature: "\u270E",
};

export default function CustomFieldOverlay({ field, scale, pageHeight }) {
  const colors = FIELD_COLORS[field.type] || FIELD_COLORS.text;

  // Convert PDF coordinates (origin bottom-left) to DOM coordinates (origin top-left)
  const domY = (pageHeight - field.y - field.height) * scale;

  return (
    <div
      className={`absolute border-2 border-dashed ${colors.border} ${colors.bg} pointer-events-none flex items-center justify-center`}
      style={{
        left: field.x * scale,
        top: domY,
        width: field.width * scale,
        height: field.height * scale,
      }}
    >
      <span className={`text-xs font-bold opacity-50`}>
        {FIELD_ICONS[field.type]}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

const FIELD_TYPES = [
  {
    type: "text",
    label: "Text Field",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    type: "signature",
    label: "Signature",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
];

export default function FieldTypeSelector({ position, onSelect, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div
      ref={ref}
      className="absolute bg-base-100 rounded-lg shadow-xl border border-base-300 p-2 z-30"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="text-xs font-semibold text-base-content/60 px-2 py-1 mb-1">
        Select field type
      </div>
      <div className="flex flex-col gap-1">
        {FIELD_TYPES.map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="btn btn-ghost btn-sm justify-start gap-2 w-full"
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

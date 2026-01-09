"use client";

import { useEffect, useCallback, useRef, useState } from "react";

export function usePdfFormCapture(containerRef) {
  const [formValues, setFormValues] = useState({});
  const observerRef = useRef(null);

  const captureCurrentValues = useCallback(() => {
    if (!containerRef.current) return {};

    const values = {};

    // Capture text inputs
    const textInputs = containerRef.current.querySelectorAll(
      '.annotationLayer input[type="text"], .annotationLayer textarea'
    );
    textInputs.forEach((input) => {
      const name = input.name || input.id;
      if (name) {
        values[name] = input.value;
      }
    });

    // Capture checkboxes
    const checkboxes = containerRef.current.querySelectorAll(
      '.annotationLayer input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      const name = checkbox.name || checkbox.id;
      if (name) {
        values[name] = checkbox.checked;
      }
    });

    // Capture radio buttons
    const radios = containerRef.current.querySelectorAll(
      '.annotationLayer input[type="radio"]:checked'
    );
    radios.forEach((radio) => {
      const name = radio.name;
      if (name) {
        values[name] = radio.value;
      }
    });

    // Capture selects
    const selects = containerRef.current.querySelectorAll(
      '.annotationLayer select'
    );
    selects.forEach((select) => {
      const name = select.name || select.id;
      if (name) {
        values[name] = select.value;
      }
    });

    return values;
  }, [containerRef]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleInput = (e) => {
      const target = e.target;
      const name = target.name || target.id;

      if (!name) return;

      let value;
      if (target.type === "checkbox") {
        value = target.checked;
      } else if (target.type === "radio") {
        if (target.checked) {
          value = target.value;
        } else {
          return;
        }
      } else {
        value = target.value;
      }

      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const attachListeners = () => {
      const inputs = containerRef.current?.querySelectorAll(
        '.annotationLayer input, .annotationLayer textarea, .annotationLayer select'
      );

      inputs?.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("change", handleInput);
        input.addEventListener("input", handleInput);
        input.addEventListener("change", handleInput);
      });
    };

    observerRef.current = new MutationObserver(() => {
      attachListeners();
    });

    observerRef.current.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    attachListeners();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerRef]);

  return { formValues, captureCurrentValues };
}

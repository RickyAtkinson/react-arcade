import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
    if (className)
      className.split(" ").map((name) => {
        elRef.current!.classList.add(name);
      });
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal")!;
    if (elRef.current) modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current!);
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
}

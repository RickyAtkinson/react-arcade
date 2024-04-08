import { ButtonColor } from "@/index";
import getButtonClassName from "@/utils/getButtonClassName";

export default function Button({
  color = "gray",
  hover = "gray",
  disabled = false,
  onClick,
  children,
}: {
  color?: ButtonColor;
  hover?: ButtonColor;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disabled}
      className={getButtonClassName(color, hover)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

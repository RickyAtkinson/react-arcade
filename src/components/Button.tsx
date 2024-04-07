import { ButtonColor } from "@/.";
import getButtonClassName from "@/utils/getButtonClassName";

export default function Button({
  color = "gray",
  hover = "gray",
  children,
}: {
  color?: ButtonColor;
  hover?: ButtonColor;
  children: React.ReactNode;
}) {
  return (
    <button className={getButtonClassName(color, hover)}>{children}</button>
  );
}

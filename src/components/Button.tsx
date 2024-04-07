import getButtonClassName from "@/utils/getButtonClassName";

export default function Button({
  color = "gray",
  children,
}: {
  color: "gray" | "red" | "green" | "blue" | "yellow";
  children: React.ReactNode;
}) {
  return <button className={getButtonClassName(color)}>{children}</button>;
}

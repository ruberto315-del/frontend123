import { cn } from "@/lib/utils";
import type { FC } from "react";
import { Input } from "../input";

interface Props {
  label: string;
  type: "text" | "email" | "password" | "number" | "date" | "select"| "tel";
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
  [prop: string]: any;
}

const BaseField: FC<Props> = ({
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  className,
  ...props
}) => {
  if (type === "select") {
    return <div className=""> {cn("", className)}</div>;
  }

  return (
    <div className={cn("", className)}>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}{required ?" *" : ""}</label>
      <Input type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} {...props}>
      
      </Input>
    </div>
  );
};

export default BaseField;

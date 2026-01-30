import { cn } from "@/lib/utils";
import type { FC } from "react";
import { Input } from "../input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  label: string;
  type: "text" | "email" | "password" | "number" | "date" | "select" | "tel";
  placeholder?: string;
  value: any;
  required?: boolean;
  defaultValue?: any;
  items?: { label: string; value: string }[];
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
  items = [],
  defaultValue,
  ...props
}) => {
  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required ? " *" : ""}
        </label>
        <Select onValueChange={onChange} value={String(value)}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent defaultValue={String(defaultValue)} position="popper">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required ? " *" : ""}
      </label>
      <Input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default BaseField;

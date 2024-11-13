import React from "react";

import { useProducts } from "@/hooks/useProducts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";

type ColorFilterProps = {
  colors: Array<{
    name: string;
    quantity: number | string;
  }>;
  onColorChange: (color: string) => void;
};

const ColorFilter = ({ colors, onColorChange }: ColorFilterProps) => {
  const { state } = useProducts();
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <Select onValueChange={handleColorChange} value={selectedColor || ""}>
      <SelectTrigger className="w-full md:w-[180px] rounded-sm bg-background">
        <SelectValue placeholder="Color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key="all" value="all">
            All ({state?.products.length})
          </SelectItem>
          {colors.map((color) => (
            <SelectItem key={color.name} value={color.name}>
              {color.name} ({color.quantity})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ColorFilter;

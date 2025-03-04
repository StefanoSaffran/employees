import ChevronDownIcon from "../assets/icons/chevron-down.svg?react";
import ChevronUpIcon from "../assets/icons/chevron-up.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";
import CircleIcon from "../assets/icons/circle.svg?react";

const icons = {
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  search: SearchIcon,
  circle: CircleIcon,

};

type IconProps = {
  name: keyof typeof icons;
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 24, className }: IconProps) => {
  const Component: React.FC<React.SVGProps<SVGSVGElement>> = icons[name];

  return Component ? <Component width={size} height={size} className={className} /> : null;
};

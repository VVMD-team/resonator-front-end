import { formatStringShorter } from "@/lib/helpers";
import { useWindowWidth } from "@/lib/hooks";

export default function ShortMobName({
  name,
  breakpoint = 400,
  minLength = 13,
  formatShorterParams = {},
}) {
  const windowWidth = useWindowWidth();

  return windowWidth < breakpoint && name.length > minLength
    ? formatStringShorter(name, formatShorterParams)
    : name;
}

import PopperUnstyled, { PopperUnstyledProps } from "@mui/base/PopperUnstyled";
import { ForwardedRef, forwardRef } from "react";

const Popper = forwardRef(function Popper(props: PopperUnstyledProps, ref: ForwardedRef<HTMLDivElement>) {
  return (<PopperUnstyled
    {...props}
    ref={ref}
    slotProps={{
      root: { className: `-z-1`}
    }}
  />);
});

export default Popper;
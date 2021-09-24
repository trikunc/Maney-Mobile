import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.045 3C1.468 3 1 3.468 1 4.045v16.728c0 .577.468 1.045 1.045 1.045h20.91c.577 0 1.045-.468 1.045-1.045V16.59c0-.498-.352-.927-.84-1.025l-.006-.001-.034-.008a10.593 10.593 0 01-.682-.18 10.403 10.403 0 01-1.63-.636c-1.26-.63-2.035-1.415-2.035-2.332 0-.917.774-1.701 2.035-2.332.584-.291 1.177-.5 1.63-.636a10.614 10.614 0 01.683-.18l.033-.007.006-.002c.489-.098.84-.527.84-1.025V4.045C24 3.468 23.532 3 22.954 3H2.046zm19.792 14.38l.072.021v2.326H3.091V5.091h18.818v2.326l-.072.021c-.526.158-1.24.407-1.964.769-1.352.676-3.191 1.983-3.191 4.202 0 2.22 1.839 3.526 3.191 4.202.724.362 1.438.61 1.964.769zm.072-6.016a1.046 1.046 0 000 2.09h1.046a1.045 1.045 0 100-2.09h-1.046zm-7.84-.785c0-1.347-.83-2.15-2.092-2.318V7.18h-1.045v1.046H9.886V7.182H8.841v1.045H7.795v1.046h1.046v6.272H7.795v1.046h1.046v1.045h1.045v-1.045h1.046v1.045h1.045v-1.045h.131c1.475 0 2.483-.835 2.483-2.352 0-.978-.418-1.672-1.11-2.042.374-.392.587-.934.587-1.617zM9.885 9.273h1.569c1.022 0 1.568.424 1.568 1.307 0 .882-.546 1.306-1.569 1.306H9.886V9.273zm0 6.272v-2.613h2.222c.937 0 1.437.415 1.437 1.307 0 .891-.5 1.306-1.437 1.306H9.886z"
        fill={props.color ? props.color : "#9448BC"}
      />
    </Svg>
  );
}

const SvgEWallet = React.memo(SvgComponent);
export default SvgEWallet;

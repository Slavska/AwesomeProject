import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgGrid = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      style="fill: var(--color1, #fff); stroke: var(--color2, #e8e8e8)"
      stroke="#e8e8e8"
      stroke-linejoin="miter"
      stroke-linecap="butt"
      stroke-miterlimit="4"
      stroke-width="0.8649"
      d="M23.339 8.661c4.053 4.053 4.053 10.624 0 14.677s-10.624 4.053-14.677 0c-4.053-4.053-4.053-10.624 0-14.677s10.624-4.053 14.677 0z"
    ></Path>
    <Path
      fill="#bdbdbd"
      style="fill: var(--color3, #bdbdbd)"
      d="M12.331 11.719l-0.612 0.612 3.669 3.669-3.669 3.669 0.612 0.612 3.669-3.669 3.669 3.669 0.612-0.612-3.669-3.669 3.669-3.669-0.612-0.612-3.669 3.669-3.669-3.669z"
    ></Path>
  </Svg>
);
export default SvgGrid;

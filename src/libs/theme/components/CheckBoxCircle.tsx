import type { CheckboxProps } from "@mui/material";

import { Checkbox } from "@mui/material";
import {
  IconCircleCheckFilled,
  IconCircle,
  IconCircleMinus,
} from "@tabler/icons-react";

export default function CheckboxCircle(props: CheckboxProps) {
  return (
    <Checkbox
      checkedIcon={<IconCircleCheckFilled />}
      icon={<IconCircle />}
      indeterminateIcon={<IconCircleMinus />}
      {...props}
    />
  );
}

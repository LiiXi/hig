import { boolean } from "@storybook/addon-knobs/react";
const knobGroupIds = { basic: "Basic" };

const knobLabels = {
  checkmark: "Checkmark",
  multiple: "Multiple"
};

export default function getKnobs(props) {
  const { checkmark, multiple, ...otherProps } = props;

  return {
    ...otherProps,
    checkmark: boolean(knobLabels.checkmark, checkmark, knobGroupIds.basic),
    multiple: boolean(knobLabels.multiple, multiple, knobGroupIds.basic)
  };
}

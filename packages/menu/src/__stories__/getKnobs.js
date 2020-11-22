import { boolean } from "@storybook/addon-knobs/react";
const knobGroupIds = { basic: "Basic" };

const knobLabels = {
  checkmark: "Checkmark"
};

export default function getKnobs(props) {
  const { checkmark, ...otherProps } = props;

  return {
    ...otherProps,
    checkmark: boolean(knobLabels.checkmark, checkmark, knobGroupIds.basic)
  };
}

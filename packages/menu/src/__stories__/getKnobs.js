import { text } from "@storybook/addon-knobs/react";
const knobGroupIds = { basic: "Basic" };

const knobLabels = {
  label: "Label"
};

export default function getKnobs(props) {
  const { label, ...otherProps } = props;

  return {
    ...otherProps,
    label: text(knobLabels.label, label, knobGroupIds.basic)
  };
}

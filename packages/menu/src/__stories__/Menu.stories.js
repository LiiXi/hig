import React from "react";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import KnobbedThemeProvider from "@hig/storybook/storybook-support/decorators/KnobbedThemeProvider";
import Surface from "@hig/surface";
import infoOptions from "./infoOptions";
import renderStory from "./renderStory";
import stories from "./stories";
import FlyoutMenu from "./flyoutMenu";

const storybook = storiesOf("Menu", module);

stories.forEach(({ description, getProps }) => {
  storybook.add(
    description,
    withInfo({
      ...infoOptions,
      propTablesExclude: [KnobbedThemeProvider, Surface]
    })(() => {
      const props = getProps();
      const storybookType = description === `default` ? `Menu` : `MenuGroup`;
      return renderStory(props, storybookType);
    })
  );
});

storybook.add(
  "test",
  withInfo({
    ...infoOptions,
    propTablesExclude: [KnobbedThemeProvider, FlyoutMenu]
  })(() => (
    <KnobbedThemeProvider>
      <FlyoutMenu />
    </KnobbedThemeProvider>
  ))
);

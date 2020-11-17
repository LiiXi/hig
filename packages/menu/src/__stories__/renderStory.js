import React from "react";
import KnobbedThemeProvider from "@hig/storybook/storybook-support/decorators/KnobbedThemeProvider";
import Surface from "@hig/surface";
import Menu, { MenuGroup } from "../index";
import getKnobs from "./getKnobs";

export default function renderStory(props, component) {
  const { children, theme, ...otherProps } = getKnobs(props);
  const HIGComponent = component === `Menu` ? Menu : MenuGroup;

  return (
    <KnobbedThemeProvider>
      <div style={{ width: "300px" }}>
        <Surface borderRadius="m" shadow="low">
          <HIGComponent {...otherProps} onChange={active => {console.log(active)}}>{children}</HIGComponent>
        </Surface>
      </div>
    </KnobbedThemeProvider>
  );
}

import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
// import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import MenuBehavior from "./behaviors/MenuBehavior";
import MenuGroupPresenter from "./presenters/MenuGroupPresenter"
// import Menu from "./Menu";
// import stylesheet from "./stylesheet";

export default class MenuGroup extends Component {

  render() {
    const {
      checkmark,
      children,
      divider,
      multiple,
      onChange,
      stylesheet,
      ...otherProps
    } = this.props;

    const {
      onKeyDown
    } = otherProps;

    return (
      <MenuBehavior
        {...otherProps}
        multiple={multiple}
        onChange={onChange}
        onKeyDown={onKeyDown}
      >
        {({
          getActiveOption,
          getHighlightIndex,
          getOptionsInfo,
          getPreviousEvent,
          handleBlur,
          handleFocus,
          handleKeyDown,
          handleMouseMove,
          setActiveOption,
          setHighlightIndex,
          setOptionsInfo,
          setPreviousEvent
        }) => (
          <MenuGroupPresenter
            checkmark={checkmark}
            getActiveOption={getActiveOption}
            getHighlightIndex={getHighlightIndex}
            getOptionsInfo={getOptionsInfo}
            getPreviousEvent={getPreviousEvent}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onMouseMove={handleMouseMove}
            setActiveOption={setActiveOption}
            setHighlightIndex={setHighlightIndex}
            setOptionsInfo={setOptionsInfo}
            setPreviousEvent={setPreviousEvent}
            stylesheet={stylesheet}
            {...otherProps}
          >
            {children}
          </MenuGroupPresenter>
        )}
      </MenuBehavior>
    );
  }
}

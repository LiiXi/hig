import React, { Component } from "react";
import PropTypes from "prop-types";
// import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import MenuBehavior from "./behaviors/MenuBehavior";
import MenuGroupPresenter from "./presenters/MenuGroupPresenter";

export default class MenuGroup extends Component {
  static propTypes = {
    /**
     * Accepts Menu components
     */
    children: PropTypes.node,
    /**
     * Enables multiple selection
     * This will take precedent over the Menu prop
     * of the same name
     */
    multiple: PropTypes.bool,
    /**
     * Called when an option is selected/unselected
     * This will take precedent over the Menu prop of the
     * same name
     */
    onChange: PropTypes.func,
    /**
     * Adds custom/overriding styles
     * This will take precedent over the Menu prop of the
     * same name
     */
    stylesheet: PropTypes.func
  };

  render() {
    const {
      children,
      multiple,
      onChange,
      stylesheet,
      ...otherProps
    } = this.props;

    return (
      <MenuBehavior
        {...otherProps}
        multiple={multiple}
        onChange={onChange}
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
            getActiveOption={getActiveOption}
            getHighlightIndex={getHighlightIndex}
            getOptionsInfo={getOptionsInfo}
            getPreviousEvent={getPreviousEvent}
            multiple={multiple}
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

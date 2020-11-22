import React, { Component } from "react";
import PropTypes from "prop-types";
import { FocusBehavior } from "@hig/behaviors";

import MenuBehavior from "./behaviors/MenuBehavior";
import MenuPresenter from "./presenters/MenuPresenter";

export default class Menu extends Component {
  static propTypes = {
    /**
     * Shows a checkmark selection indicator
     */
    checkmark: PropTypes.bool,
    /**
     * Accepts Option components
     */
    children: PropTypes.node.isRequired,
    /**
     * Shows a divider at the bottom of the menu
     */
    divider: PropTypes.bool,
    /**
     * Enables multiple selection
     */
    multiple: PropTypes.bool,
    /**
     * Called when an option is selected/unselected
     */
    onChange: PropTypes.func,
    /**
     * Adds custom/overriding styles
     */
    stylesheet: PropTypes.func
  };

  static defaultProps = {
    multiple: false
  };

  render() {
    const {
      onChange,
      checkmark,
      children,
      divider,
      multiple,
      stylesheet,
      ...otherProps
    } = this.props;
    const { onBlur, onFocus, onKeyDown } = otherProps;

    return (
      <FocusBehavior // do i need this?
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {({ hasFocus, onBlur: handleBlur, onFocus: handleFocus }) => (
          <MenuBehavior
            {...otherProps}
            hasFocus={hasFocus}
            multiple={multiple}
            onBlur={handleBlur}
            onChange={onChange}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
          >
            {({
              getActiveOption,
              getHighlightIndex,
              getOptionsInfo,
              getPreviousEvent,
              handleBlur: handleMenuBehaviorBlur,
              handleFocus: handleMenuBehaviorFocus,
              handleKeyDown,
              handleMouseMove,
              setActiveOption,
              setHighlightIndex,
              setOptionsInfo,
              setPreviousEvent
            }) => (
              <MenuPresenter
                {...otherProps}
                checkmark={checkmark}
                divider={divider}
                getActiveOption={getActiveOption}
                getHighlightIndex={getHighlightIndex}
                getOptionsInfo={getOptionsInfo}
                getPreviousEvent={getPreviousEvent}
                multiple={multiple}
                onBlur={handleMenuBehaviorBlur}
                onFocus={handleMenuBehaviorFocus}
                onKeyDown={handleKeyDown}
                onMouseMove={handleMouseMove}
                setActiveOption={setActiveOption}
                setHighlightIndex={setHighlightIndex}
                setOptionsInfo={setOptionsInfo}
                setPreviousEvent={setPreviousEvent}
                stylesheet={stylesheet}
              >
                {children}
              </MenuPresenter>
            )}
          </MenuBehavior>
        )}
      </FocusBehavior>
    );
  }
}

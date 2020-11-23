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
     * Default Selected Option(s)
     * Should be the HTML id of the Option
     */
    defaultSelected: PropTypes.array,
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
     * Controls the selected Option(s)
     * This will not work if this is the child
     * of a MenuGroup component
     */
    selected: PropTypes.array,
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
      checkmark,
      children,
      defaultSelected,
      divider,
      menuRef,
      multiple,
      onChange,
      selected,
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
            defaultSelected={defaultSelected}
            hasFocus={hasFocus}
            multiple={multiple}
            onBlur={handleBlur}
            onChange={onChange}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
            selected={selected}
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
                menuRef={menuRef}
                multiple={multiple}
                onBlur={handleMenuBehaviorBlur}
                onFocus={handleMenuBehaviorFocus}
                onKeyDown={handleKeyDown}
                onMouseMove={handleMouseMove}
                selected={selected}
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

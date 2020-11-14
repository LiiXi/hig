import React, { Component } from "react";
import PropTypes from "prop-types";
import { FocusBehavior } from "@hig/behaviors";

import MenuBehavior from "./behaviors/MenuBehavior";
import MenuPresenter from "./presenters/MenuPresenter";
// import { MenuItemsPropType } from "./propTypes";

export default class Menu extends Component {
  static propTypes = {
    /**
     * Shows a divider at the bottom of the menu
     */
    divider: PropTypes.bool,
    /**
     * Enables multiple selection
     */
    multiple: PropTypes.bool,
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
      divider,
      multiple,
      stylesheet,
      ...otherProps
    } = this.props;
    const {
      onBlur,
      onFocus,
      onKeyDown
    } = otherProps;

    return (
      <FocusBehavior
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {({
          hasFocus,
          onBlur: handleBlur,
          onFocus: handleFocus,
        }) => (
          <MenuBehavior
            hasFocus={hasFocus}
            multiple={multiple}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
            {...otherProps}
          >
            {({
              getActiveOption,
              getHighlightIndex,
              getOptionsInfo,
              handleBlur,
              handleFocus,
              handleKeyDown,
              setActiveOption,
              setHighlightIndex,
              setOptionsInfo
            }) => (
              <MenuPresenter
                checkmark={checkmark}
                divider={divider}
                getActiveOption={getActiveOption}
                getHighlightIndex={getHighlightIndex}
                getOptionsInfo={getOptionsInfo}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                setActiveOption={setActiveOption}
                setHighlightIndex={setHighlightIndex}
                setOptionsInfo={setOptionsInfo}
                stylesheet={stylesheet}
                {...otherProps}
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

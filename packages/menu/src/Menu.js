import React, { Component } from "react";
import PropTypes from "prop-types";
import { FocusBehavior } from "@hig/behaviors";

import MenuBehavior from "./behaviors/MenuBehavior";
import MenuPresenter from "./presenters/MenuPresenter";
// import { MenuItemsPropType } from "./propTypes";

export default class Menu extends Component {
  static propTypes = {
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
// console.log(this.props);
    const {
      checkmark,
      children,
      multiple,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      // className,
      onBlur,
      onFocus,
      onKeyDown
      // onKeyUp,
      // onMouseDown,
      // onMouseEnter,
      // onMouseLeave,
      // onMouseUp
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
                getActiveOption={getActiveOption}
                getHighlightIndex={getHighlightIndex}
                getOptionsInfo={getOptionsInfo}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                setActiveOption={setActiveOption}
                setHighlightIndex={setHighlightIndex}
                setOptionsInfo={setOptionsInfo}
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { PressedBehavior } from "@hig/behaviors";
import { ThemeContext } from "@hig/theme-context";

import OptionBehavior from "./behaviors/OptionBehavior";
import OptionPresenter from "./presenters/OptionPresenter";
// import { createCustomClassNames } from "@hig/utils";

// import stylesheet from "./stylesheet";
import { variants, AVAILABLE_VARIANTS } from "./constants";
// import MenuBehavior from "./behaviors/MenuBehavior";
// import MenuPresenter from "./presenters/MenuPresenter";
// import { MenuItemsPropType } from "./propTypes";

export default class Option extends Component {
  static propTypes = {
    // id required
    // role listbox or group
  };

  static defaultProps = {
    role: "option"
  };

  componentDidMount() {
    console.log('option did mount');
    // console.log('componentDidMount');
    // console.log(this.props);
    if (this.props.setActiveOption) {
      // this.props.setActiveOption(this.props.id);
    }
    if (this.props.setHighlightIndex) {
      // this.props.setKeyboardHoverOptionIndex(this.props.id);
    }
  }

  render() {
    const {
      asset,
      children,
      disabled,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      checkmark,
      className,
      id,
      // index,
      getHighlightIndex,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      role
    } = otherProps;
    // const offsetIndex = Number(index) + 1;
// console.log('options props');
// console.log(this.props);
    return (
      <PressedBehavior
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {({
          isPressed,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onPressedMouseLeave: handlePressedMouseLeave
        }) => (
          <OptionBehavior
            {...otherProps}
            disabled={disabled}
            onMouseLeave={handlePressedMouseLeave}
          >
            {({
              getIndexFromId,
              handleClick,
              handleMouseEnter,
              handleMouseLeave,
              isActive
            }) => (
              <OptionPresenter
                asset={asset}
                checkmark={checkmark}
                disabled={disabled}
                highlighted={getHighlightIndex() === getIndexFromId(id) + 1}
                id={id}
                // ndex={index}
                isPressed={isPressed}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                role={role}
                selected={isActive()}
              >
                {children}
              </OptionPresenter>
            )}
          </OptionBehavior>
        )}
      </PressedBehavior>
    );
  }
}

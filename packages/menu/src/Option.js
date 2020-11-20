import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { PressedBehavior } from "@hig/behaviors";
import { ThemeContext } from "@hig/theme-context";

import OptionBehavior from "./behaviors/OptionBehavior";
import OptionPresenter from "./presenters/OptionPresenter";

import { variants, AVAILABLE_VARIANTS } from "./constants";

export default class Option extends Component {
  static propTypes = {
  };

  static defaultProps = {
    role: "option"
  };

  componentDidMount() {

  }

  render() {
    const {
      asset,
      children,
      disabled,
      shortcut,
      stylesheet,
      ...otherProps
    } = this.props;
    const {
      checkmark,
      id,
      getHighlightIndex,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      role
    } = otherProps;

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
              handleMouseOver,
              isActive
            }) => (
              <OptionPresenter
                {...otherProps}
                asset={asset}
                checkmark={checkmark}
                disabled={disabled}
                highlighted={getHighlightIndex() === getIndexFromId(id) + 1}
                id={id}
                isPressed={isPressed}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseOver={handleMouseOver}
                onMouseUp={handleMouseUp}
                role={role}
                selected={isActive()}
                shortcut={shortcut}
                stylesheet={stylesheet}
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

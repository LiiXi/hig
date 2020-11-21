import React, { Component } from "react";
import PropTypes from "prop-types";
import { PressedBehavior } from "@hig/behaviors";

import OptionBehavior from "./behaviors/OptionBehavior";
import OptionPresenter from "./presenters/OptionPresenter";

import { roles, AVAILABLE_ROLES } from "./constants";

export default class Option extends Component {
  static propTypes = {
    /**
     * Allows for an asset before the Option text
     * Can be from @hig/avatars, @hig/icons or
     * whatever image of yor choosing
     */
    asset: PropTypes.node,
    /**
     * Content of the Option
     */
    children: PropTypes.node.isRequired,
    /**
     * Disables the Options
     */
    disabled: PropTypes.bool,
    /**
     * HTML attribute for accessibility
     */
    role: PropTypes.oneOf(AVAILABLE_ROLES),
    /**
     * Allows for a keyboard shortcut or any
     * content to the right of the Option content
     */
    shortcut: PropTypes.node,
    /**
     * Adds custom/overriding styles
     */
    stylesheet: PropTypes.func
  };

  static defaultProps = {
    role: roles.OPTION
  };

  render() {
    const {
      asset,
      children,
      disabled,
      role,
      shortcut,
      stylesheet,
      ...otherProps
    } = this.props;
    const {
      checkmark,
      id, // is this required?
      getHighlightIndex,
      onFocus,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      // role
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
                onFocus={onFocus}
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

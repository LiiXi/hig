import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { CheckmarkSUI, CheckmarkXsUI } from "@hig/icons";
import { createCustomClassNames } from "@hig/utils";

import stylesheet from "./stylesheet";
import { variants, AVAILABLE_VARIANTS } from "../constants";

export default class OptionPresenter extends Component {
  static propTypes = {
    index: PropTypes.number,
    /** Text label of the menu section */
    label: PropTypes.string,
    variant: PropTypes.oneOf(AVAILABLE_VARIANTS),
    checkmark: PropTypes.bool,
    /** Function to modify the menu item's styles */
    stylesheet: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    role: `option`
  };

  render() {
    const {
      asset,
      disabled,
      highlighted,
      isPressed,
      label,
      variant,
      checkmark,
      children,
      selected,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      className,
      id,
      index,
      onBlur,
      onClick,
      onFocus,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
      role
    } = otherProps;

    // const defaultId = `menu-item-${index}`;
    const ariaPayload = role === `option` ? { "aria-selected": selected } : {};

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          const styles = stylesheet(this.props, resolvedRoles);
          const Checkmark = metadata.densityId === `medium-density` ? CheckmarkSUI : CheckmarkXsUI;
          /* const labelClassName = createCustomClassNames(
            className,
            "section-label"
          ); */

          return (
            <li
              // conditional payload for aria-selected
              {...ariaPayload}
              className={css(styles.menuOption)}
              disabled={disabled}
              id={id} 
              role={role}
              onBlur={onBlur}
              onClick={onClick}
              onFocus={onFocus}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              selected={selected}
              
            >
              {checkmark && role !== `presentation` ? <div className={css(styles.checkmarkWrapper)}><Checkmark /></div> : null }
              {asset ? <div className={css(styles.assetWrapper)}>{this.props.asset}</div> : null }
              {children}
            </li>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

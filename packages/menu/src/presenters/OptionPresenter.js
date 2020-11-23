import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { CheckmarkSUI, CheckmarkXsUI } from "@hig/icons";
import { createCustomClassNames } from "@hig/utils";

import stylesheet from "./stylesheet";
import { AVAILABLE_ROLES } from "../constants";

export default class OptionPresenter extends Component {
  static propTypes = {
    asset: PropTypes.node,
    checkmark: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    highlighted: PropTypes.bool,
    isPressed: PropTypes.bool,
    role: PropTypes.oneOf(AVAILABLE_ROLES),
    selected: PropTypes.bool,
    shortcut: PropTypes.node,
    stylesheet: PropTypes.func
  };

  render() {
    const {
      asset,
      checkmark,
      children,
      disabled,
      highlighted,
      isPressed,
      role,
      selected,
      shortcut,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      className,
      id
    } = otherProps;
    const payload = {...otherProps};
    delete payload.getActiveOption;
    delete payload.getHighlightIndex;
    delete payload.getOptionsInfo;
    delete payload.getPreviousEvent;
    delete payload.setActiveOption;
    delete payload.setHighlightIndex;

    const ariaPayload = role === `option` ? { "aria-selected": selected } : {};

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          const styles = stylesheet(
            {
              disabled,
              highlighted,
              isPressed,
              role,
              selected,
              shortcut,
              stylesheet: customStylesheet
            },
            resolvedRoles
          );
          const Checkmark =
            metadata.densityId === `medium-density`
              ? CheckmarkSUI
              : CheckmarkXsUI;
          return (
            <li
              // conditional payload for aria-selected
              {...payload}
              {...ariaPayload}
              className={css(styles.menuOption)}
              disabled={disabled}
              id={id}
              role={role}
              selected={selected}
            >
              {checkmark && role !== `presentation` ? (
                <div className={css(styles.checkmarkWrapper)}>
                  <Checkmark />
                </div>
              ) : null}
              {asset ? (
                <div className={css(styles.assetWrapper)}>{asset}</div>
              ) : null}
              <div className={css(styles.optionContentWrapper)}>
                {children}
                {shortcut ? (
                  <span className={css(styles.shortcutWrapper)}>
                    {shortcut}
                  </span>
                ) : null}
              </div>
            </li>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

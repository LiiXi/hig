import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { cx, css } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import Option from "../Option";
import stylesheet from "./stylesheet";

/**
 * @param {ReactNode} children
 * @returns {OptionMeta[]}
 */
function createOptions(children) {
  return Children.toArray(children).reduce((result, child, index) => {
    const { type, key, props = { index } } = child;

    if (type === Option) {
      result.push({ key, props });
    }

    return result;
  }, []);
}

export default class MenuPresenter extends Component {
  static propTypes = {
    children: PropTypes.node,
    divider: PropTypes.bool,
    stylesheet: PropTypes.func
  };

  static defaultProps = {
    
  };

  componentDidMount() {
    const optionsInfo = {};
    React.Children.forEach(this.props.children, (child, index) => {
      optionsInfo[index] = child.props;
    });
    this.props.setOptionsInfo(optionsInfo);
  }

  /** @returns {TabMeta[]} */
  getOptions() {
    return createOptions(this.props.children);
  }

  /**
   * @param {TabMeta} tab
   * @param {number} index
   * @returns {JSX.Element}
   */
  renderOption = ({ key, props }) => {
    const {
      checkmark,
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      getPreviousEvent,
      onFocus,
      setActiveOption,
      setHighlightIndex
    } = this.props;
    const payload = {
      ...props,
      checkmark,
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      getPreviousEvent,
      key,
      onFocus,
      setActiveOption,
      setHighlightIndex
    };

    return <Option {...payload} />;
  };

  /**
   * @returns {JSX.Element}
   */
  renderOptions() {
    return this.getOptions().map(this.renderOption);
  }

  render() {
    const {
      children,
      divider,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      id,
      // onBlur,
      // onFocus,
      // onKeyDown,
      // onMouseMove,
      role,
      tabIndex
    } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles }) => {
          const styles = stylesheet(
            { divider, stylesheet: customStylesheet },
            resolvedRoles
          );

          return (
            <ul
              {...otherProps}
              className={css(styles.menu)}
              id={id}
              // onBlur={onBlur}
              // onFocus={onFocus}
              // onKeyDown={onKeyDown}
              // onMouseMove={onMouseMove}
              role={role || "listbox"} // conditional or required
              tabIndex={tabIndex || "0"} // conditional w/ MenuGroup
            >
              {this.renderOptions()}
            </ul>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

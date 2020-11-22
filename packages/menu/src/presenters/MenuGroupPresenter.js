import React, { Children, Component } from "react";
// import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import Menu from "../Menu";
// import stylesheet from "./stylesheet";

/**
 * @param {ReactNode} children
 * @returns {MenuMeta[]}
 */
function createMenus(children) {
  return Children.toArray(children).reduce((result, child, index) => {
    const { type, key, props = { index } } = child;

    if (type === Menu) {
      result.push({ key, props });
    }

    return result;
  }, []);
}

export default class MenuGroupPresenter extends Component {
  /* static propTypes = {
    
  } */

  componentDidMount() {
    // new name needed
    const optionsInfo = {};
    const mergedOptions = [];
    // const totalMenus = React.Children.count(this.props.children);
    React.Children.forEach(this.props.children, (child, index) => {
      // console.log(child.props);
      optionsInfo[index] = child.props;
      //  console.log(optionsInfo[index].children);
      // console.log(child.props["role"]);
    });

    Object.keys(optionsInfo).forEach(index => {
      optionsInfo[index].children.forEach(child => {
        mergedOptions.push(child.props);
      });
    });
    /* 
    for (const index in optionsInfo) {
      optionsInfo[index].children.forEach(child =>
        mergedOptions.push(child.props))
      ;
    }
    */

    this.props.setOptionsInfo(mergedOptions);
  }

  /** @returns {MenuMeta[]} */
  getMenus() {
    return createMenus(this.props.children);
  }

  /**
   * @param {MenuMeta} tab
   * @param {number} index
   * @returns {JSX.Element}
   */
  renderMenu = ({ key, props }) => {
    const {
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      getPreviousEvent,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onMouseMove: handleMouseMove,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo,
      setPreviousEvent
    } = this.props;
    const payload = {
      ...props,
      key,
      role: "group",
      tabIndex: "-1",
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      getPreviousEvent,
      handleBlur,
      handleFocus,
      handleKeyDown,
      handleMouseMove,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo,
      setPreviousEvent
    };

    return <Menu {...payload} />;
  };

  /**
   * @returns {JSX.Element}
   */
  renderMenus() {
    return this.getMenus().map(this.renderMenu);
  }

  render() {
    const {
      // children,
      ...otherProps
    } = this.props;

    const { className } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          // const styles = stylesheet(this.props, resolvedRoles);

          return (
            <div
              // className={css(styles.menu)}
              {...otherProps}
              // onBlur={this.handleBlur}
              // onFocus={this.handleFocus}
              // onKeyDown={this.handleKeyDown}
              role="listbox" // conditional or required
              tabIndex="0" // conditional w/ MenuGroup
            >
              {this.renderMenus()}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

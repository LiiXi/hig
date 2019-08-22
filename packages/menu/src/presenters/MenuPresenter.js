import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
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
    const { type, key, props = {index} } = child;

    if (type === Option) {
      result.push({ key, props });
    }

    return result;
  }, []);
}

export default class MenuPresenter extends Component {
  static propTypes = {
    
  };

  static defaultProps = {
    
  };

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
    // const { setActiveOption } = props;
    // console.log('renderOption');
    const {
      checkmark,
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      onBlur,
      onFocus,
      onKeyDown,
      setActiveOption,
      setHighlightIndex
    } = this.props;
    /* const {
      hoveredTabIndex,
      effectiveAlign,
      effectiveOrientation,
      effectiveShowTabDivider
    } = this.state;
    const activeTabIndex = this.getActiveTabIndex();

    let showTabDivider = effectiveShowTabDivider;
    if (index === activeTabIndex || index === activeTabIndex - 1) {
      showTabDivider = false;
    }
    if (index === hoveredTabIndex || index === hoveredTabIndex - 1) {
      showTabDivider = false;
    }

    const className = cx(
      tabClassName,
      createCustomClassNames(tabsClassName, "tab")
    ); */

    const payload = {
      ...props,
      checkmark,
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      // index,
      key,
      onBlur,
      onFocus,
      onKeyDown,
      setActiveOption,
      setHighlightIndex
      /*,
      key,
      variant,
      className,
      showDivider: showTabDivider,
      align: effectiveAlign,
      orientation: effectiveOrientation,
      active: activeTabIndex === index, */
    };
//console.log(payload);
// console.log(this.props);
    return <Option {...payload} />;
  };

  /**
   * @returns {JSX.Element}
   */
  renderOptions() {
    return this.getOptions().map(this.renderOption);
  }

  componentDidMount() {
    console.log('menu presenter componentDidMount');
    const optionsInfo = {};
    React.Children.forEach(this.props.children, (child, index) => {
      // console.log(child.props);
      optionsInfo[index] = child.props;
      // console.log(child.props["role"]);
    })
    // console.log(optionIds);
    this.props.setOptionsInfo(optionsInfo);

    // push all the highlightables to associative array (k/v) => count/index
    // push the length of highlitables
  }

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    const {
      className,
      // setActiveOption
      id,
      onBlur,
      onFocus,
      onKeyDown,
      role,
      tabIndex
    } = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {

          const styles = stylesheet(this.props, resolvedRoles);

          return (
            <ul
              className={css(styles.menu)}
              id={id}
              onBlur={onBlur}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              role={role || "listbox"}// conditional or required
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

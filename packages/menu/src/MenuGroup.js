import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import { createCustomClassNames } from "@hig/utils";

import Menu from "./Menu";
import stylesheet from "./stylesheet";

/**
 * @param {ReactNode} children
 * @returns {OptionMeta[]}
 */
function createOptions(children) {
  return Children.toArray(children).reduce((result, child, index) => {
    const { type, key, props = {index} } = child;

    if (type === Menu) {
      result.push({ key, props });
    }

    return result;
  }, []);
}

export default class MenuGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    
  };

  state = {
    activeOption: this.props.multiple ? [] : null,
    highlightIndex: 0,
    optionInfo: null
  };

  setOptionsInfo = optionInfo => {
    this.setState({ optionInfo });
  }

  getOptionsInfo = () => {
    return this.state.optionInfo;
  }

  setActiveOption = activeOption => {
    if (this.props.onChange) {
      this.props.onChange(activeOption);
    }

    this.setState({ activeOption });
  }

  getActiveOption = () => {
    return this.state.activeOption;
  }

  setHighlightIndex = highlightIndex => {
    this.setState({ highlightIndex });
  }
  /**
   * @returns {boolean}
   */
  getHighlightIndex = () => {
    return this.state.highlightIndex;
  }

  getTotalOptions = () => {
    return Object.keys(this.state.optionInfo).length;
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    /// do we need handleFocus?
    // console.log('focus');
  }

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
console.log('blur');
    // this.setHighlightIndex(0);
  }

  handleKeyDown = event => {
    const {
      getHighlightIndex,
      getOptionsInfo,
      props,
      setActiveOption,
      setHighlightIndex
    } = this;
    const {
      multiple,
      onKeyDown
    } = props;
    const options = this.state.optionInfo;
    const highlightableIndexes = [];
    const viewportHeight = document.documentElement.clientHeight;

    if (onKeyDown) {
      onKeyDown(event);
    }

    // console.log(event.target.children);

    // Set up the what can be highlighted
    for (const index in options) {
      if (!options[index].disabled && options[index].role !== `presentation`) {
        highlightableIndexes.push(Number(index) + 1);
      }
    }

    switch (event.keyCode) {
      // Arrow Down
      case 40: {
        const currentIndex = highlightableIndexes.indexOf(getHighlightIndex());
        const lastIndex = highlightableIndexes.length - 1;
        // const highlightedId = getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id;
        // const highlightedIdNode = document.getElementById(highlightedId);
        // const highlightedIdTop = highlightedIdNode.getBoundingClientRect().top;

        if (currentIndex === lastIndex) {
          setHighlightIndex(highlightableIndexes[0]);
          // highlightedIdNode.scrollIntoView(true);
          document.getElementById(getOptionsInfo()[highlightableIndexes[0] - 1].id).scrollIntoView(true);
        } else {
          // console.log();
          setHighlightIndex(highlightableIndexes[currentIndex + 1]);
          document.getElementById(getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id).scrollIntoView(false);
          // console.log(document.getElementById(getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id).getBoundingClientRect().top);
          // highlightedIdNode.scrollIntoView(false);
        }
        // if (highlightedIdTop > viewportHeight) {
        // highlightedIdNode.scrollIntoView(false);
        // }

        event.preventDefault();
        break;
      }
        
      // Arrow Up
      case 38: {
        const currentIndex = highlightableIndexes.indexOf(getHighlightIndex());
        const lastIndex = highlightableIndexes.length - 1;
        
        if (currentIndex <= 0) {
          setHighlightIndex(highlightableIndexes[lastIndex]);
          document.getElementById(getOptionsInfo()[highlightableIndexes[lastIndex] - 1].id).scrollIntoView(false);
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex - 1]);
          document.getElementById(getOptionsInfo()[highlightableIndexes[currentIndex - 1] - 1].id).scrollIntoView(false);
        }
        event.preventDefault();
        break;
      // Enter,
      // Space
      }
      case 13:
      case 32: {
        if (multiple) {
          const activeOptions = this.state.activeOption;
          const currentOption = this.state.optionInfo[getHighlightIndex() - 1].id;
          if (activeOptions.indexOf(currentOption) === -1) {
            activeOptions.push(currentOption);
          } else {
            activeOptions.splice(activeOptions.indexOf(currentOption), 1);
          }

          setActiveOption(activeOptions);
        }
        if (!multiple) {
          setActiveOption(this.state.optionInfo[getHighlightIndex() - 1].id);
        }
        event.preventDefault();
        break;
      }
    }
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
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      handleBlur,
      handleFocus,
      handleKeyDown,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo
    } = this;
    const payload = {
      ...props,
      key,
      role: "group",
      tabIndex: "-1",
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      handleBlur,
      handleFocus,
      handleKeyDown,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo
    };

    return <Menu {...payload} />;
  };

  /**
   * @returns {JSX.Element}
   */
  renderOptions() {
    return this.getOptions().map(this.renderOption);
  }

  componentDidMount() {
    // console.log('menugroup componentDidMount');
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

    for (const index in optionsInfo) {
      optionsInfo[index].children.forEach(child => mergedOptions.push(child.props));
    }

    this.setOptionsInfo(mergedOptions);
    
  }

  render() {
    // console.log(this.state);
    const {
      children,
      ...otherProps
    } = this.props;

    const {} = otherProps;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {

          // const styles = stylesheet(this.props, resolvedRoles);

          return (
            <div
              // className={css(styles.menu)}
              {...otherProps}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              role="listbox" // conditional or required
              tabIndex="0" // conditional w/ MenuGroup
            >
              {this.renderOptions()}
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

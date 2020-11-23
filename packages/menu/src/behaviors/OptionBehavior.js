import { Component } from "react";
import PropTypes from "prop-types";
import selectOption from "./selectOption";

/**
 * @typedef {Object} State
 * @property {boolean} on
 */

export default class OptionBehavior extends Component {
  static propTypes = {
    children: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    getActiveOption: PropTypes.func,
    getPreviousEvent: PropTypes.func,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    role: PropTypes.string,
    setActiveOption: PropTypes.func,
    setHighlightIndex: PropTypes.func
  };

  getIndexFromId = id => {
    const options = this.props.getOptionsInfo();
    const optionIds = []

    for (const index in options) {
      optionIds.push(options[index].id);
    }

    return optionIds.indexOf(id)
  };

  handleClick = event => {
    const {
      disabled,
      getActiveOption,
      id,
      multiple,
      onClick,
      role,
      selected,
      setActiveOption
    } = this.props;
    const activeOptionsArray = [...getActiveOption()];
    const activeOptions = selectOption(id, activeOptionsArray, multiple);
    // const currentOption = this.props.id;
    // const multiple = Array.isArray(this.props.getActiveOption());

    if (onClick) {
      onClick(event);
    }

    if (disabled || role === `presentation`) {
      return;
    }

    if (selected !== undefined) {
      return;
    }



    // if (multiple) {
    /* const activeOptions = multiple ? getActiveOption() : [];

    if (activeOptions.indexOf(currentOption) === -1) {
      activeOptions.push(currentOption);
    } else {
      activeOptions.splice(activeOptions.indexOf(currentOption), 1);
    } */

    setActiveOption(activeOptions);
    // }

    /* if (!multiple) {
      setActiveOption(currentOption);
    } */
  };

  handleMouseEnter = event => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }

    // we don't want to set the highlight state on hover when scrolling via keyboard
    if (this.props.getPreviousEvent() === `keydown`) {
      return;
    }

    if (this.props.disabled || this.props.role === `presentation`) {
      return;
    }

    if (this.props.setHighlightIndex) {
      this.props.setHighlightIndex(
        Number(this.getIndexFromId(this.props.id)) + 1
      );
      // this.setState({highlightable: false});
    }
  };

  handleMouseLeave = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }

    // we don't want to set the highlight state on hover when scrolling via keyboard
    if (this.props.getPreviousEvent() === `keydown`) {
      return;
    }

    if (this.props.setHighlightIndex) {
      this.props.setHighlightIndex(0);
    }
  };

  isActive = () => {
    // const multiple = Array.isArray(this.props.getActiveOption());
    const { id, getActiveOption, multiple } = this.props;

    if (multiple) {
      return getActiveOption().indexOf(id) > -1;
    }

    return id === getActiveOption()[0];
  };

  render() {
    const {
      getIndexFromId,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      isActive
    } = this;

    return this.props.children({
      getIndexFromId,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      isActive
    });
  }
}

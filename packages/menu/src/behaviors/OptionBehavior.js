import { Component } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} State
 * @property {boolean} on
 */

export default class OptionBehavior extends Component {
  static propTypes = {
    // onChange: PropTypes.func,
    // onKeyUp: PropTypes.func,
    // children: PropTypes.func
  };

  getIndexFromId = (id) => {
    const options = this.props.getOptionsInfo();
    const optionIds = []

    for (const index in options) {
      optionIds.push(options[index].id);
    }

    return optionIds.indexOf(id)
  }

  handleClick = event => {
    const currentOption = this.props.id;
    const multiple = Array.isArray(this.props.getActiveOption()) ? true : false;

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.disabled || this.props.role === `presentation`) {
      return;
    }

    if (this.props.setActiveOption) {
      if (multiple) {
        const activeOptions = this.props.getActiveOption();

        if (activeOptions.indexOf(currentOption) === -1) {
          activeOptions.push(currentOption);
        } else {
          activeOptions.splice(activeOptions.indexOf(currentOption), 1);
        }

        this.props.setActiveOption(activeOptions);
      }

      if (!multiple) {
        this.props.setActiveOption(currentOption);
      }
    }
  }

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
      this.props.setHighlightIndex(Number(this.getIndexFromId(this.props.id)) + 1);
      // this.setState({highlightable: false});
    }
  }

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
  }

  isActive = () => {
    const multiple = Array.isArray(this.props.getActiveOption()) ? true : false;

    if (multiple) {
      return this.props.getActiveOption().indexOf(this.props.id) > -1;
    }

    if (!multiple) {
      return this.props.id === this.props.getActiveOption();
    }
  }

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

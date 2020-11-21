import { Component } from "react";
import PropTypes from "prop-types";

export default class MenuBehavior extends Component {
  static propTypes = {
    // onChange: PropTypes.func,
    // onKeyUp: PropTypes.func,
    // children: PropTypes.func
  };

  /**
   * @type {State}
   */
  state = {
    activeOption: this.props.multiple ? [] : null,
    highlightIndex: 0,
    optionInfo: null,
    previousEvent: null
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

  getPreviousEvent = () => {
    return this.state.previousEvent;
  }

  setPreviousEvent = previousEvent => {
    this.setState({ previousEvent });
  }

  getTotalOptions = () => {
    return Object.keys(this.state.optionInfo).length;
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    this.setHighlightIndex(0);
  }

  handleKeyDown = event => {
    const {
      getHighlightIndex,
      getOptionsInfo,
      props,
      setActiveOption,
      setHighlightIndex,
      setPreviousEvent
    } = this;
    const {
      multiple,
      onKeyDown
    } = props;
    const options = this.state.optionInfo;
    const highlightableIndexes = [];

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Set up options that can be highlighted
    for (const index in options) {
      if (!options[index].disabled && options[index].role !== `presentation`) {
        highlightableIndexes.push(Number(index) + 1);
      }
    }

    setPreviousEvent(event.type);

    switch (event.keyCode) {
      // Arrow Down
      case 40: {
        const currentIndex = highlightableIndexes.indexOf(getHighlightIndex());
        const lastIndex = highlightableIndexes.length - 1;

        if (currentIndex === lastIndex) {
          setHighlightIndex(highlightableIndexes[0]);
          document.getElementById(getOptionsInfo()[highlightableIndexes[0] - 1].id).scrollIntoView(false);
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex + 1]);
          document.getElementById(getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id).scrollIntoView(false);

          console.log(document.getElementById(getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id).getBoundingClientRect().top);
          console.log(window.innerHeight);
        }

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

  handleMouseMove = event => {
    // don't keep setting state
    if (this.getPreviousEvent() === event.type) {
      return;
    }

    this.setPreviousEvent(event.type);
  }

  render() {
    const getActiveOption = this.props.getActiveOption ? this.props.getActiveOption : this.getActiveOption;
    const getHighlightIndex = this.props.getHighlightIndex ? this.props.getHighlightIndex : this.getHighlightIndex;
    const getOptionsInfo = this.props.getOptionsInfo ? this.props.getOptionsInfo : this.getOptionsInfo;
    const getPreviousEvent = this.props.getPreviousEvent ? this.props.getPreviousEvent : this.getPreviousEvent;
    const handleBlur = this.props.handleBlur ? this.props.handleBlur : this.handleBlur;
    const handleFocus = this.props.handleFocus ? this.props.handleFocus : this.handleFocus;
    const handleKeyDown = this.props.handleKeyDown ? this.props.handleKeyDown : this.handleKeyDown;
    const handleMouseMove = this.props.handleMouseMove ? this.props.handleMouseMove : this.handleMouseMove;
    const setActiveOption = this.props.setActiveOption ? this.props.setActiveOption : this.setActiveOption;
    const setHighlightIndex = this.props.setHighlightIndex ? this.props.setHighlightIndex : this.setHighlightIndex;
    const setOptionsInfo = this.props.setOptionsInfo ? this.props.setOptionsInfo : this.setOptionsInfo;
    const setPreviousEvent = this.props.setPreviousEvent ? this.props.setPreviousEvent : this.setPreviousEvent;

    return this.props.children({
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
    });
  }
}

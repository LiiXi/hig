import { Component } from "react";
import PropTypes from "prop-types";
import selectOption from "./selectOption";


function checkScroll(optionId) {
  const option = document.getElementById(optionId);
  const optionBounding = option.getBoundingClientRect();

  if (
    optionBounding.top < 0 ||
    optionBounding.bottom > (window.innerHeight || document.documentElement.clientHeight)
  ) {
    // align to the top if the top of Option is out of the viewport
    if (optionBounding.top < 0) {
      option.scrollIntoView(true);
    }
    // align to the bottom if the bottom of Option is out of the viewport
    if (optionBounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
      option.scrollIntoView(false);
    }
  }
};

export default class MenuBehavior extends Component {
  static propTypes = {
    children: PropTypes.func,
    defaultSelected: PropTypes.array,
    getActiveOption: PropTypes.func,
    getHighlightIndex: PropTypes.func,
    getOptionsInfo: PropTypes.func,
    getPreviousEvent: PropTypes.func,
    handleBlur: PropTypes.func,
    handleFocus: PropTypes.func,
    handleKeyDown: PropTypes.func,
    handleMouseMove: PropTypes.func,
    multiple: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    setActiveOption: PropTypes.func,
    setHighlightIndex: PropTypes.func,
    setOptionsInfo: PropTypes.func,
    setPreviousEvent: PropTypes.func
  };

  static defaultProps = {
    defaultSelected: []
  };

  /**
   * @type {State}
   */
  state = {
    activeOption: this.isControlled() ? this.props.selected : this.props.defaultSelected,
    highlightIndex: 0,
    optionInfo: null,
    previousEvent: null
  };

  isControlled() {
    return this.props.selected !== undefined;
  };

  setOptionsInfo = optionInfo => {
    this.setState({ optionInfo });
  };

  getOptionsInfo = () => this.state.optionInfo;

  setActiveOption = activeOption => {
    if (this.props.onChange) {
      this.props.onChange(activeOption);
    }

    this.setState({ activeOption });
  };

  getActiveOption = () => this.state.activeOption;

  setHighlightIndex = highlightIndex => {
    this.setState({ highlightIndex });
  };
  /**
   * @returns {boolean} // this is wrong
   */
  getHighlightIndex = () => this.state.highlightIndex;

  getPreviousEvent = () => this.state.previousEvent;

  setPreviousEvent = previousEvent => {
    this.setState({ previousEvent });
  };

  getTotalOptions = () => Object.keys(this.state.optionInfo).length;

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    event.stopPropagation();
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    event.stopPropagation();
    this.setHighlightIndex(0);
  };

  handleKeyDown = event => {
    const {
      getHighlightIndex,
      getOptionsInfo,
      props,
      setActiveOption,
      setHighlightIndex,
      setPreviousEvent
    } = this;
    const { multiple, onKeyDown } = props;
    const options = this.state.optionInfo;
    const highlightableIndexes = [];

    if (onKeyDown) {
      onKeyDown(event);
    }

    // don't let this bubble up and trigger twice if this is within a MenuGroup component
    event.stopPropagation();
    // Set up options that can be highlighted
    /* for (const index in options) {
      if (!options[index].disabled && options[index].role !== `presentation`) {
        highlightableIndexes.push(Number(index) + 1);
      }
    } */

    Object.keys(options).forEach(index => {
      if (!options[index].disabled && options[index].role !== `presentation`) {
        highlightableIndexes.push(Number(index) + 1);
      }
    });

    setPreviousEvent(event.type);

    switch (event.keyCode) {
      // Arrow Down
      case 40: {
        const currentIndex = highlightableIndexes.indexOf(getHighlightIndex());
        const lastIndex = highlightableIndexes.length - 1;

        
        if (currentIndex === lastIndex) {
          setHighlightIndex(highlightableIndexes[0]);
          // scrollintoview
          /* 
          document
            .getElementById(getOptionsInfo()[highlightableIndexes[0] - 1].id)
            .scrollIntoView(false); */

          checkScroll(getOptionsInfo()[highlightableIndexes[0] - 1].id);
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex + 1]);
          // scrollintoviews
          /* document
            .getElementById(
              getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id
            )
            .scrollIntoView(false); */

          checkScroll(getOptionsInfo()[highlightableIndexes[currentIndex + 1] - 1].id);
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
          /* document
            .getElementById(
              getOptionsInfo()[highlightableIndexes[lastIndex] - 1].id
            )
            .scrollIntoView(false); */
          checkScroll(getOptionsInfo()[highlightableIndexes[lastIndex] - 1].id);
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex - 1]);
          /* document
            .getElementById(
              getOptionsInfo()[highlightableIndexes[currentIndex - 1] - 1].id
            )
            .scrollIntoView(false); */
          checkScroll(getOptionsInfo()[highlightableIndexes[currentIndex - 1] - 1].id);
        }
        event.preventDefault();
        break;
      }

      // Enter
      // Space
      case 13:
      case 32: {
        const activeOptionsArray = [...this.state.activeOption];
        const id = this.state.optionInfo[getHighlightIndex() - 1].id;
        const activeOptions = selectOption(id, activeOptionsArray, multiple);
        // console.log(activeOptions);
        /* if (multiple) {
          const activeOptions = this.state.activeOption;
          const currentOption = this.state.optionInfo[getHighlightIndex() - 1]
            .id;
          if (activeOptions.indexOf(currentOption) === -1) {
            activeOptions.push(currentOption);
          } else {
            activeOptions.splice(activeOptions.indexOf(currentOption), 1);
          }

          setActiveOption(activeOptions);
        }
        if (!multiple) {
          setActiveOption(this.state.optionInfo[getHighlightIndex() - 1].id);
        } */
        if (this.isControlled()) {
          return;
        }

        setActiveOption(activeOptions);
        // console.log('called');
        event.preventDefault();
        break;
      }

      default: {
        return;
      }
    }
  };

  handleMouseMove = event => {
    // don't keep setting state
    event.stopPropagation();

    if (this.getPreviousEvent() === event.type) {
      return;
    }

    this.setPreviousEvent(event.type);
  };

  render() {
    const getActiveOption = this.props.getActiveOption
      ? this.props.getActiveOption
      : this.getActiveOption;
    const getHighlightIndex = this.props.getHighlightIndex
      ? this.props.getHighlightIndex
      : this.getHighlightIndex;
    const getOptionsInfo = this.props.getOptionsInfo
      ? this.props.getOptionsInfo
      : this.getOptionsInfo;
    const getPreviousEvent = this.props.getPreviousEvent
      ? this.props.getPreviousEvent
      : this.getPreviousEvent;
    const handleBlur = this.props.handleBlur
      ? this.props.handleBlur
      : this.handleBlur;
    const handleFocus = this.props.handleFocus
      ? this.props.handleFocus
      : this.handleFocus;
    const handleKeyDown = this.props.handleKeyDown
      ? this.props.handleKeyDown
      : this.handleKeyDown;
    const handleMouseMove = this.props.handleMouseMove
      ? this.props.handleMouseMove
      : this.handleMouseMove;
    const setActiveOption = this.props.setActiveOption
      ? this.props.setActiveOption
      : this.setActiveOption;
    const setHighlightIndex = this.props.setHighlightIndex
      ? this.props.setHighlightIndex
      : this.setHighlightIndex;
    const setOptionsInfo = this.props.setOptionsInfo
      ? this.props.setOptionsInfo
      : this.setOptionsInfo;
    const setPreviousEvent = this.props.setPreviousEvent
      ? this.props.setPreviousEvent
      : this.setPreviousEvent;

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

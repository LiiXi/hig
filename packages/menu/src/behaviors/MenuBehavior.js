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
    // activeId: null,
    activeOption: this.props.multiple ? [] : null,
    highlightIndex: 0,
    optionInfo: null
    // totalOptions: null
  };

  setOptionsInfo = optionInfo => {
    this.setState({ optionInfo });
  }

  getOptionsInfo = () => {
    return this.state.optionInfo;
  }

  setActiveOption = activeOption => {
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
  }

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    this.setHighlightIndex(0);
  }

  handleKeyDown = event => {
    // console.log(event.keyCode);
    // console.log(event.code);
    const {
      getHighlightIndex,
      // getTotalOptions,
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
    
    if (onKeyDown) {
      onKeyDown(event);
    }

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

        if (currentIndex === lastIndex) {
          setHighlightIndex(highlightableIndexes[0]);
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex + 1]);
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
        } else {
          setHighlightIndex(highlightableIndexes[currentIndex - 1]);
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

  render() {
    console.log(this.state);
    /* const {
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      handleBlur,
      handleFocus,
      handleKeyDown,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo
    } = this; */
    const getActiveOption = this.props.getActiveOption ? this.props.getActiveOption : this.getActiveOption;
    const getHighlightIndex = this.props.getHighlightIndex ? this.props.getHighlightIndex : this.getHighlightIndex;
    const getOptionsInfo = this.props.getOptionsInfo ? this.props.getOptionsInfo : this.getOptionsInfo;
    const handleBlur = this.props.handleBlur ? this.props.handleBlur : this.handleBlur;
    const handleFocus = this.props.handleFocus ? this.props.handleFocus : this.handleFocus;
    const handleKeyDown = this.props.handleKeyDown ? this.props.handleKeyDown : this.handleKeyDown;
    const setActiveOption = this.props.setActiveOption ? this.props.setActiveOption : this.setActiveOption;
    const setHighlightIndex = this.props.setHighlightIndex ? this.props.setHighlightIndex : this.setHighlightIndex;
    const setOptionsInfo = this.props.setOptionsInfo ? this.props.setOptionsInfo : this.setOptionsInfo;
// console.log('menu behavior');
// console.log();
    return this.props.children({
      getActiveOption,
      getHighlightIndex,
      getOptionsInfo,
      handleBlur,
      handleFocus,
      handleKeyDown,
      setActiveOption,
      setHighlightIndex,
      setOptionsInfo
    });
  }
}

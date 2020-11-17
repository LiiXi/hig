function getRulesByPresentation(themeData) {
  return {
    fontSize: `12px`,
    color: `#3c3c3c`,
    opacity: 0.5,
    textTransform: `uppercase`
  }
}

export default function stylesheet(props, themeData) {
  const {
    disabled,
    divider,
    highlighted,
    isPressed,
    role,
    selected,
    stylesheet: customStylesheet
  } = props;
  const styles = {
    menu: {
      borderBottom: divider ? `1px solid red` : {},
      boxSizing: `border-box`,
      cursor: `pointer`,
      fontFamily: themeData[`basics.fontFamilies.main`],
      fontSize: themeData[`density.fontSizes.medium`],
      listStyle: `none`,
      margin: 0,
      outline: 0,
      padding: 0
      
    },
    menuOption: {
      display: `flex`,
      alignItems: `center`,
      minHeight: themeData[`menu.item.minHeight`],
      padding: `${themeData["menu.item.paddingVertical"]} ${themeData["menu.item.paddingHorizontal"]}`,
      ...(selected ? { fontWeight: themeData[`basics.fontWeights.bold`] } : { fontWeight: themeData[`basics.fontWeights.regular`] }),
      ...(highlighted ? { backgroundColor: themeData[`menu.item.hover.backgroundColor`] } : {}),
      ...(isPressed && (!disabled && role !== `presentation`) ? { backgroundColor: themeData[`menu.item.pressed.backgroundColor`] } : {}),
      ...(disabled ? { opacity: themeData[`colorScheme.opacity.disabled`] } : {}),
      ...(role === `presentation` ? getRulesByPresentation(themeData) : {})
    },
    checkmarkWrapper: {
      display: `flex`,
      alignItems: `center`,
      position: `relative`,
      height: themeData[`menu.item.minHeight`],
      justifyContent: `center`,
      marginRight: themeData[`menu.item.paddingHorizontal`],
      "& > svg > *": {
        opacity: 0,
        ...(selected ? { fill: themeData[`colorScheme.indicator.on`], opacity: 1 } : {})
      }
    },
    assetWrapper: {
      display: `flex`,
      justifyContent: `center`,
      marginRight: themeData[`density.spacings.extraSmall`],
      fontWeight: 400
    },
    optionContentWrapper: {
      width: `100%`
    },
    shortcutWrapper: {
      color: `red`,
      float: `right`,
      fontWeight: themeData[`basics.fontWeights.regular`]
    }
  };
// console.log(props);
  return customStylesheet ? customStylesheet(styles, props, themeData) : styles;
}

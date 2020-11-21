function getRulesByPresentation(themeData) {
  return {
    fontSize: themeData[`menu.header.fontSize`],
    color: themeData[`menu.header.fontColor`],
    opacity: 0.5,
    textTransform: `uppercase`
  };
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
      borderBottom: divider
        ? `1px solid ${themeData[`menu.divider.backgroundColor`]}`
        : {},
      boxSizing: `border-box`,
      cursor: `pointer`,
      fontFamily: themeData[`menu.fontFamily`],
      listStyle: `none`,
      margin: 0,
      outline: 0,
      padding: `${themeData["menu.container.paddingVertical"]} 0`
    },
    menuOption: {
      display: `flex`,
      color: themeData[`menu.label.fontColor`],
      fontSize: themeData[`menu.label.fontSize`],
      alignItems: `center`,
      minHeight: themeData[`menu.item.minHeight`],
      padding: `${themeData["menu.item.paddingVertical"]}
        ${themeData["menu.item.paddingHorizontal"]}`,
      ...(selected
        ? { fontWeight: themeData[`menu.label.selected.fontWeight`] }
        : { fontWeight: themeData[`menu.label.default.fontWeight`] }),
      ...(highlighted
        ? { backgroundColor: themeData[`menu.item.hover.backgroundColor`] }
        : {}),
      ...(isPressed && (!disabled && role !== `presentation`)
        ? { backgroundColor: themeData[`menu.item.pressed.backgroundColor`] }
        : {}),
      ...(disabled
        ? { opacity: themeData[`colorScheme.opacity.disabled`] }
        : {}),
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
        ...(highlighted
          ? {
              fill: themeData[`menu.item.checkmark.hover.iconColor`],
              opacity: 1
            }
          : {}),
        ...(selected
          ? {
              fill: themeData[`menu.item.checkmark.active.iconColor`],
              opacity: 1
            }
          : {})
      }
    },
    assetWrapper: {
      display: `flex`,
      justifyContent: `center`,
      marginRight: themeData[`menu.item.paddingHorizontal`],
      fontWeight: 400
    },
    optionContentWrapper: {
      display: `flex`,
      width: `100%`
    },
    shortcutWrapper: {
      color: themeData[`menu.keyboardShortcut.fontColor`],
      fontSize: themeData[`menu.keyboardShortcut.fontSize`],
      alignSelf: `center`,
      fontWeight: themeData[`menu.keyboardShortcut.fontWeight`],
      marginLeft: `auto`
    }
  };

  return customStylesheet ? customStylesheet(styles, props, themeData) : styles;
}

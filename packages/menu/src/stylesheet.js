export default function stylesheet(props, themeData) {
  const {
    highlighted,
    stylesheet: customStylesheet
  } = props;

  const styles = {
    menuOption: {
      backgroundColor: highlighted ? `blue` : ''
    }
  }

  if (customStylesheet) {
    return customStylesheet(styles, props, themeData, themeMeta);
  }
  return styles;
}

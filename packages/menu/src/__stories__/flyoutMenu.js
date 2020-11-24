import React, { Component } from "react";
import Button from "@hig/button";
import Flyout from "@hig/flyout";
import Surface from "@hig/surface";

import Menu, { Option } from "../index";

function custom(styles) {
  return {
    ...styles,
    menu: {
      ...styles.menu,
      height: `100px`
    }
  };
}

export default class FlyoutMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.menu = null;
  }

  setMenu = element => {
    this.menu = element;
  };

  handleChange = () => {
    this.setState({ open: !this.state.open });
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });

    setTimeout(() => {
      this.menu.focus();
    }, 100);
  };

  render() {
    return (
      <Flyout
        open={this.state.open}
        content={() => (
          <Surface style={{ width: "200px" }} paddingSize={null}>
            <Menu
              menuRef={this.setMenu}
              onChange={this.handleChange}
              stylesheet={custom}
            >
              <Option id="option-1">Option 1</Option>
              <Option id="option-2">Option 2</Option>
              <Option id="option-3">Option 3</Option>
            </Menu>
          </Surface>
        )}
      >
        <Button title="Menu" onClick={this.toggleOpen} />
      </Flyout>
    );
  }
}

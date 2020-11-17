import React from "react";
import Menu, { Option } from "../index";
import { AddMember24 } from "@hig/icons";
import Avatar from "@hig/avatar";

export default [
  {
    description: "default",
    getProps: () => ({
      multiple: false,
      checkmark: true,
      children: [
        <Option
          id="test-1"
          role="presentation"
          onClick={event => {console.log(event.target.innerHTML)}}
        >
          test 1
        </Option>,
        <Option id="blah-2" shortcut={<span>&#8984;</span>}>test 2</Option>,
        <Option id="uhm-3">test 3</Option>,
        <Option id="blahasdf" disabled>test 4</Option>,
        <Option id="another one">test 5</Option>,
        <Option id="another asdfs" disabled>test 6</Option>
      ]
    })
  },
  {
    description: "grouped menus",
    getProps: () => ({
      multiple: false,
      // checkmark: true, icon={<Avatar name="Maria McCaplin" size="medium" />}
      children: [
        <Menu id="1" multiple="false">
          <Option id="test-1" role="presentation">Group 1</Option>
          <Option id="blah-2">test 2</Option>
          <Option id="uhm-3">test 3</Option>
          <Option id="blahasdf" disabled>test 4</Option>
          <Option id="anotherone">test 5</Option>
          <Option id="another" disabled>test 6</Option>
        </Menu>,
        <Menu id="3" multiple="false">
          <Option id="test-1dddd" role="presentation">Group 2</Option>
          <Option id="blah-2dddd" asset={<AddMember24 />}>test 2</Option>
          <Option id="uhm-3ddddd" asset={<AddMember24 />}>test 3</Option>
          <Option id="blahasdddddddf" disabled asset={<AddMember24 />}>test 4</Option>
          <Option id="anothedddddddddrone" asset={<AddMember24 />}>test 5</Option>
          <Option id="anothdddddddder" disabled asset={<AddMember24 />}>test 6</Option>
        </Menu>,
        <Menu checkmark multiple id="2">
          <Option id="test-asdf1" role="presentation">Group 3</Option>
          <Option id="blah-2asdf">test 2</Option>
          <Option id="uhm-3asdf">test 3</Option>
          <Option id="blahasasdfasdfasddf" disabled>test 4</Option>
          <Option id="anotherasdf">test 5</Option>
          <Option id="andf" disabled>test 6</Option>
        </Menu>,
        <Menu checkmark multiple id="4">
          <Option id="tesasdfasdt-asdf1" role="presentation">Group 4</Option>
          <Option id="blaasdfasdfadsh-2asdf" asset={<Avatar name="Maria McCaplin" size="medium" />}>test 2</Option>
          <Option id="uhasdfasdfasm-3asdf" asset={<Avatar name="Maria McCaplin" size="medium" />}>test 3</Option>
          <Option id="bl11111ahasasdfasdfasddf" disabled asset={<Avatar name="Maria McCaplin" size="medium" />}>test 4</Option>
          <Option id="anasdfasdfotherasdf" asset={<Avatar name="Maria McCaplin" size="medium" />}>test 5</Option>
          <Option id="44444sadfasdfas" disabled asset={<Avatar name="Maria McCaplin" size="medium" />}>test 6</Option>
        </Menu>
      ]
    })
  }
];

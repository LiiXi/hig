import React from "react";
import Menu, { Option } from "../index";
import { AddMember24, AddFolder24, CartFull24, Cloud24, Checklist24 } from "@hig/icons";
import Avatar from "@hig/avatar";

export default [
  {
    description: "default",
    getProps: () => ({
      multiple: true,
      checkmark: true,
      children: [
        <Option
          id="test-1"
          role="presentation"
        >
          test 1
        </Option>,
        <Option id="blah-2">test 2</Option>,
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
      // checkmark: true, icon={<Avatar name="Maria McCaplin" size="medium" />}
      // multiple: false,
      children: [
        <Menu id="1" divider>
          <Option id="test-1" role="presentation">Group 1</Option>
          <Option id="blah-2">test 2</Option>
          <Option id="uhm-3">test 3</Option>
          <Option id="blahasdf" disabled>test 4</Option>
          <Option id="anotherone">test 5</Option>
          <Option id="another" disabled>test 6</Option>
        </Menu>,
        <Menu id="3" divider>
          <Option id="test-1dddd" role="presentation">Group 2</Option>
          <Option id="blah-2dddd" asset={<AddFolder24 />} shortcut={<span>&#8984; 5</span>}>test 7</Option>
          <Option id="uhm-3ddddd" asset={<AddMember24 />} shortcut={<span>&#8984; 6</span>}>test 8</Option>
          <Option id="blahasdddddddf" disabled asset={<CartFull24 />} shortcut={<span>&#8984; 7</span>}>test 9</Option>
          <Option id="anothedddddddddrone" asset={<Cloud24 />} shortcut={<span>&#8984; 8</span>}>test 10</Option>
          <Option id="anothdddddddder" disabled asset={<Checklist24 />} shortcut={<span>&#8984; 9</span>}>test 11</Option>
        </Menu>,
        <Menu checkmark id="2" divider>
          <Option id="test-asdf1" role="presentation">Group 3</Option>
          <Option id="blah-2asdf">test 12</Option>
          <Option id="uhm-3asdf">test 13</Option>
          <Option id="blahasasdfasdfasddf" disabled>test 14</Option>
          <Option id="anotherasdf">test 15</Option>
          <Option id="andf" disabled>test 16</Option>
        </Menu>,
        <Menu checkmark id="4">
          <Option id="tesasdfasdt-asdf1" role="presentation">Group 4</Option>
          <Option id="blaasdfasdfadsh-2asdf" asset={<Avatar name="Peter Parker" size="medium" />}>test 17</Option>
          <Option id="uhasdfasdfasm-3asdf" asset={<Avatar name="Bruce Wayne" size="medium" />}>test 18</Option>
          <Option id="bl11111ahasasdfasdfasddf" disabled asset={<Avatar name="Jessica Drew" size="medium" />}>test 19</Option>
          <Option id="anasdfasdfotherasdf" asset={<Avatar name="Cassandra Cain" size="medium" />}>test 20</Option>
          <Option id="44444sadfasdfas" disabled asset={<Avatar name="Stephanie Brown" size="medium" />}>test 21</Option>
        </Menu>
      ]
    })
  }
];

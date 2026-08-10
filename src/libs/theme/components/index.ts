import button from "./button";
import Card from "./Card";
import link from "./link";
import listItemButton from "./ListItemButton";
import MenuItem from "./MenuItems";
import tabs from "./Tabs";
import TextField from "./TextField";
import Drawer from "./Drawer";
import CustomSlider from "./slider";
import chip from "./chip";

const components = () => {
  return Object.assign(
    {},
    link,
    tabs,
    button,
    chip,
    listItemButton,
    MenuItem,
    TextField,
    Card,
    Drawer,
    CustomSlider,
  );
};

export default components;

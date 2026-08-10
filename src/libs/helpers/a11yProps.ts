export default function a11yProps(tabName: string, index: number) {
  return {
    id: `${tabName}-tab-${index}`,
    "aria-controls": `${tabName}-tabpanel-${index}`,
  };
}

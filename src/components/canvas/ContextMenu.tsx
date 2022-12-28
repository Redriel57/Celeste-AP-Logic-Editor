import { SubMenuData } from "../../utils/interfaces";
import { Zoom } from "../../utils/enums";
import createMenu from "../menu/Menu";


const ContextMenu = ({ anchor, editZoom, setSelected }: { anchor: HTMLDivElement | null; editZoom: (value: Zoom, component?: HTMLDivElement | null) => void; setSelected: (component: HTMLDivElement | null) => void; }): JSX.Element => {
  console.log("render ContextMenu");

  const data: SubMenuData[] = [
    {
      subMenuName: "Interactions",
      fields: [
        {
          name: "Select Element",
          onClick: () => setSelected(anchor),
          enabled: true
        },
        {
          name: "Deselect",
          onClick: () => setSelected(null),
          enabled: true
        }
      ]
    },
    {
      subMenuName: "Zoom",
      fields: [
        {
          name: "Zoom in",
          onClick: () => editZoom(Zoom.In),
          enabled: true
        },
        {
          name: "Zoom out",
          onClick: () => editZoom(Zoom.Out),
          enabled: true
        },
        {
          name: "Zoom to fit",
          onClick: () => editZoom(Zoom.Fit, anchor),
          enabled: true
        },
        {
          name: "Reset Zoom",
          onClick: () => editZoom(Zoom.Reset),
          enabled: false
        }
      ]
    }
  ];

  return createMenu(anchor, data);
}

export default ContextMenu;
import Area from "../../utils/data/Area";
import Edge from "../../utils/data/Edge";
import Popper from "../menu/Popper";


const EdgePrompt = ({ currentArea, anchor, closeMenu, addEdge }: { currentArea: Area; anchor: HTMLDivElement; closeMenu: () => void; addEdge: (edge: Edge) => void; }): JSX.Element => {
  console.log("render EdgePrompt");
  
  return (
    <Popper anchorEl={anchor} open={!!anchor}>
      <div />
    </Popper>
  );

};

export default EdgePrompt;
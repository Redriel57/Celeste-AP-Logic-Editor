import { useState, useRef, useEffect } from "react";
import Area from "../utils/data/Area";
import Room from "../utils/data/Room";
import { Coordinate } from "../utils/interfaces";

const RoomPrompt = ({ currentArea, coordinates, closeMenu }: { currentArea: Area; coordinates: Coordinate; closeMenu: () => void; }): JSX.Element => {
  console.log("render RoomPrompt");
  
  const [name, setName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!validateButton.current) return;
    
    validateButton.current.disabled = !!selectedFile && (name !== '') && !currentArea.hasRoom(name);
  }, [currentArea, name, selectedFile])

  const validate = (): void => {
    if (!!selectedFile) {
      const image = new FileReader();
      image.onload = () => {
        var img = new Image();
 
        img.onload = () => {
          const room = new Room(name, coordinates.x, coordinates.y, img.width, img.height, img);
          currentArea.addRoom(room);
        };

        img.src = image.result?.toString() ?? "";
      }
      image.readAsDataURL(selectedFile);
      closeMenu()
    }
  }

  return (
    <div className="flex flex-col flex-nowrap justify-between absolute top-10 left-10 w-64 h-64 rounded-lg border-2 border-slate-400 bg-slate-300 dark:border-slate-800 dark:bg-slate-700">
      <div className="flex justify-center w-full border-b-2 border-slate-400 dark:border-slate-800">
        <label className="font-bold text-lg">New Room</label>
      </div>
      <div className="p-2">
        <label className="p-1">Room Name</label>
        <input
          type="text" value={name} className="rounded-sm"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-2">
        <label className="p-1">Room</label>
        <input
          type="file" accept="image/png" className="rounded-sm"
          onChange={(e) => setSelectedFile(e.currentTarget.files?.item(0) ?? null)}
        />
      </div>
      <div className="p-2 w-full">
        <button
          className="bg-transparent font-semibold py-2 px-4 border border-slate-400 dark:border-slate-800 rounded"
          onClick={validate}
        >Create Room</button>
      </div>
    </div>
  );
}

export default RoomPrompt;
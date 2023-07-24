import { useDispatch, useSelector } from "react-redux";
import { rpg, vinted } from "./reducers/modeSlice";
import Toggle from "react-toggle";
import { RootState } from "./store";

export default function VintedMode() {
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.mode);

  const setVintedMode = () => {
    document.body.setAttribute("data-theme", "vinted");
  };

  const setRPGMode = () => {
    document.body.setAttribute("data-theme", "rpg");
  };

  const toggleVintedTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setVintedMode();
      dispatch(vinted());
    } else {
      setRPGMode();
      dispatch(rpg());
    }
  };

  return (
    <label>
      <Toggle
        defaultChecked={currentMode}
        icons={{
          checked: <p>V</p>,
          unchecked: null,
        }}
        onChange={toggleVintedTheme}
      />
    </label>
  );
}

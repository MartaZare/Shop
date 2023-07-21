import { useDispatch } from "react-redux";
import { rpg, vinted } from "./reducers/modeSlice";
import Toggle from "react-toggle";

function VintedMode() {
  const dispatch = useDispatch();

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
        defaultChecked={false}
        icons={{
          checked: <p>V</p>,
          unchecked: null,
        }}
        onChange={toggleVintedTheme}
      />
    </label>
  );
}

export default VintedMode;

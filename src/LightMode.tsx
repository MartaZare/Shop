import { useDispatch, useSelector } from "react-redux";
import { light, dark } from "./reducers/modeSlice";
import Toggle from "react-toggle";
import { RootState } from "./store";

export default function LightMode() {
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.mode);

  const setMode = (mode: string) => {
    document.body.setAttribute("data-theme", mode);
  };

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setMode("light");
      dispatch(light());
    } else {
      setMode("dark");
      dispatch(dark());
    }
  };

  return (
    <label>
      <Toggle
        defaultChecked={currentMode}
        icons={{
          checked: (
            <img
              className="mode-icon"
              src="../images/moon.png"
              alt="moon-icon"
            />
          ),
          unchecked: (
            <img
              className="mode-icon"
              src="../images/light.png"
              alt="sun-icon"
            />
          ),
        }}
        onChange={toggleTheme}
      />
    </label>
  );
}

function VintedMode() {
  const setVintedMode = () => {
    document.body.setAttribute("data-theme", "vinted");
  };

  const setRPGMode = () => {
    document.body.setAttribute("data-theme", "rpg");
  };

  const toggleVintedTheme = (e: React.ChangeEvent) => {
    if (e.currentTarget) {
      setVintedMode();
    } else {
      setRPGMode();
    }
  };

  const toggleRPGTheme = (e: React.ChangeEvent) => {
    if (e.currentTarget) {
      setRPGMode();
    } else {
      setVintedMode();
    }
  };

  return (
    <div className="vinted">
      <input
        className="vinted_input"
        type="checkbox"
        id="vinted-toggle"
        onChange={toggleVintedTheme}
      />
      <input
        className="rpg_input"
        type="checkbox"
        id="rpg-toggle"
        onChange={toggleRPGTheme}
      />
    </div>
  );
}

export default VintedMode;

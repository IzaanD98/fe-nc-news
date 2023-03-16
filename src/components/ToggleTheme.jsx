import { ThemeContext } from "../contexts/Theme";
import { useContext } from "react";
import { Button } from "react-bootstrap";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currTheme) => {
      return currTheme === "light" ? "dark" : "light";
    });
  };

  return (
    <Button
      variant="outline-light"
      onClick={toggleTheme}
      className={`button__${theme}`}
    >
      {theme === "light" ? "Dark Theme" : "Light Theme"}
    </Button>
  );
};

export default ToggleTheme;

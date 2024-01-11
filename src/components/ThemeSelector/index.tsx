import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import styles from "./styles.module.css";

const themes = [
  {
    name: "Sythwave 1",
    gradient: `linear-gradient(
    225deg,
    #ff3cac 0%,
    #784ba0 50%,
    #2b86c5 100%
  )`,
    baseColor: "#784ba0",
  },
  {
    name: "Deep Blue 9",
    gradient: `linear-gradient( 288deg,  rgba(0,85,255,1) 1.5%, rgba(4,56,115,1) 91.6% )`,
    baseColor: "rgba(0,85,255,1)",
  },
  {
    name: "Sunny Days",
    gradient: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(237,3,32,0.87) 20.8%, rgba(242,121,1,0.84) 74.4% )`,
    baseColor: "rgba(242,121,1,0.84)",
  },
  {
    name: "Lazy",
    gradient: `linear-gradient( 109.6deg,  rgba(61,245,167,1) 11.2%, rgba(9,111,224,1) 91.1% )`,
    baseColor: "rgba(61,245,167,1)",
  },
];

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  function handleCurrentTheme(theme: any) {
    document.documentElement.style.setProperty(
      "--background-image",
      theme.gradient
    );
    document.documentElement.style.setProperty(
      "--background-color",
      theme.baseColor
    );
    setCurrentTheme(themes.find((t) => t.gradient === theme.gradient)!);
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-image",
      currentTheme.gradient
    );
  });

  return (
    <div className={styles.container}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={styles.triggerContainer}
            style={{
              border: isOpen
                ? "0.125rem solid transparent"
                : "0.125rem solid #fafafa",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.currentThemeDemo}></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.options}>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.name}
                className="flex items-center"
                onClick={() => handleCurrentTheme(theme)}
              >
                <div className={styles.option}>
                  {theme.name}
                  <div
                    className={styles.themeDemo}
                    style={{
                      backgroundImage: theme.gradient,
                    }}
                  ></div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSelector;

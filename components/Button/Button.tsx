import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
  children?: ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary" | "outlined" | "transparent";
  size: "large" | "medium" | "small";
  icon?: JSX.Element;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant,
  size,
  icon,
}: IButtonProps) => {
  return (
    <div className={styles["button-wrapper"]}>
      <button
        type="button"
        onClick={onClick}
        className={`${styles[variant]} ${styles[size]} ${
          !children ? styles["only-icon"] : ""
        }`}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default Button;

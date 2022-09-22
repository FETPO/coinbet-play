import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary" | "outlined" | "transparent";
  size: "large" | "medium" | "small";
  icon?: JSX.Element;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  className,
  children,
  onClick,
  variant,
  size,
  icon,
  disabled,
}: IButtonProps) => {
  return (
    <div className={`${styles["button-wrapper"]} ${className || ""}`}>
      <button
        type="button"
        onClick={onClick}
        className={`${styles[variant]} ${styles[size]} ${
          !children ? styles["only-icon"] : ""
        }`}
        disabled={disabled}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default Button;

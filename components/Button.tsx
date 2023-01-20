import {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export const Button: FC<PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & HTMLAttributes<HTMLButtonElement>
>> = props => (
  <button {...props} className={clsx(styles.Button, props.className)} />
);

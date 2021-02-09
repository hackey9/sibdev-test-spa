import clsx from "clsx"
import {motion, Variants} from "framer-motion"
import React, {FC} from "react"
import css from "./Header.module.scss"


const HeaderWrapperElement: FC = ({children}) => (
  <motion.div
    className={clsx(css.wrapper)}
    layout
    layoutId={"header-wrapper"}
    variants={variants}
  >
    {children}
  </motion.div>
)
export default HeaderWrapperElement


const variants: Variants = {
  init: {
    opacity: 0,
    y: "-100%"
  },
  idle: {
    opacity: 1,
    y: 0,
  },
  exit: {

  },
}

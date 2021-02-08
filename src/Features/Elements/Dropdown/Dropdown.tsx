import React, {FC, PropsWithChildren} from "react"
import css from "./Dropdown.module.scss"



export type DropdownProps = PropsWithChildren<{
  data: Record<string, string>
  value: string
  onChange: (value: string) => void
}>

const Dropdown: FC<DropdownProps> = ({value, onChange, data}) => {

  // TODO: implement dropdown

  const current = data[value]

  return (
    <div className={css.box}>
      <div className={css.value}>{current}</div>
    </div>
  )
}
export default Dropdown

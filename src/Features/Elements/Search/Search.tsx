import Button from "Features/Elements/Button/Button"
import Input from "Features/Elements/Input/Input"
import React, {FC, PropsWithChildren} from "react"
import css from "./Search.module.scss"


export type SearchProps = PropsWithChildren<{
  placeholder?: string
  onClick?: () => void
  disabled?: boolean
  value: string
  onChange: (value: string) => void
}>

const Search: FC<SearchProps> = ({children, placeholder, onClick, disabled, value, onChange}) => {

  return (
    <div className={css.container}>
      <div className={css.frame}>
        <Input value={value} onChange={onChange} appendAt={"left"} placeholder={placeholder}>
          {children}
        </Input>
      </div>
      <div className="button">
        <Button onClick={onClick} disabled={disabled} appendTo={"right"}>Найти</Button>
      </div>
    </div>
  )
}
export default Search

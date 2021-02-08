import React, {FC, PropsWithChildren, useCallback, useEffect, useMemo, useReducer, useRef} from "react"
import css from "./Dropdown.module.scss"


export type DropdownProps = PropsWithChildren<{
  data: Record<string, string>
  value: string
  onChange: (value: string) => void
}>

const Dropdown: FC<DropdownProps> = ({value, onChange, data}) => {

  const current = data[value]
  const items = useMemo(() => Object.entries(data), [data])

  const [isOpen, toggle] = useReducer((s: boolean) => !s, false)

  const handleSelect = useCallback((key: string) => {
    onChange?.(key)

    isOpen && toggle()
  }, [isOpen, onChange])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const closer = (e: MouseEvent) => {
        e.stopPropagation()
        // try to find box element in event path
        if (e.composedPath().indexOf(ref.current!) === -1) {
          // click was outside of the box
          toggle()
        }
      }

      document.addEventListener("click", closer)
      return () => document.removeEventListener("click", closer)
    }
  }, [isOpen])


  return (
    <div className={css.box} ref={ref}>
      <div className={css.value} onClick={toggle}>{current}</div>
      {isOpen && (
        <div className={css.list}>
          {items.map(([key, name]) => (
            <div key={key} className={css.listItem} onClick={() => handleSelect(key)}>{name}</div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Dropdown

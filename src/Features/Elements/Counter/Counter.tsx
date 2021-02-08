import React, {ChangeEventHandler, FC, PropsWithChildren, useCallback, useEffect, useRef} from "react"
import css from "./Counter.module.scss"


export type CounterProps = PropsWithChildren<{
  value: number
  onChange: (value: number) => void
  min: number
  max: number
}>

const Counter: FC<CounterProps> = ({value, onChange, max, min}) => {

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const number = +e.target.value // there is number: we trust
    onChange?.(number)
  }, [onChange])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current! // we are inside useEffect: trust.
    const {x: startX, width} = node.getBoundingClientRect()


    let moving = false
    const begin = (e: PointerEvent) => {
      e.preventDefault()
      moving = true
    }
    const end = () => void (moving = false)
    const update = ({clientX}: PointerEvent) => {
      if (!moving) return
      const percent = (clientX - startX) / width
      const value = Math.round(min + (max - min) * percent)
      onChange?.(value)
    }

    node.addEventListener("pointerdown", begin)
    node.addEventListener("pointerdown", update)

    node.addEventListener("pointerup", end)
    node.addEventListener("pointerout", end)
    node.addEventListener("pointerleave", end)

    node.addEventListener("pointermove", update)


  }, [max, min, onChange])

  return (
    <div className={css.container}>
      <div className={css.slider} ref={ref}>
        <div className={css.lineAll}/>
        <div className={css.lineFill} style={{width: `${value / max * 100}%`}}>
          <div className={css.circle}/>
        </div>
      </div>
      <input type="number" min={min} max={max} step={1} value={value} onChange={handleChange}/>
    </div>
  )
}
export default Counter

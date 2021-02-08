import ModalWindow, {
  ModalWindowButtons,
  ModalWindowField,
  ModalWindowFields,
  ModalWindowHeader,
} from "Features/Blocks/Modal/Elements/ModalWindow"
import ModalWindowFullscreenBackface from "Features/Blocks/Modal/Elements/ModalWindowFullscreenBackface"
import Button from "Features/Elements/Button/Button"
import Counter from "Features/Elements/Counter/Counter"
import Dropdown from "Features/Elements/Dropdown/Dropdown"
import Headline from "Features/Elements/Headline/Headline"
import Input from "Features/Elements/Input/Input"
import Label from "Features/Elements/Input/Label"
import React, {FC, PropsWithChildren, useCallback, useEffect, useState} from "react"
import {Order} from "Services/YouTubeAPI"


export type SaveRequestModalProps = PropsWithChildren<{
  id?: number
  query: string
  title?: string
  order?: Order
  count: number

  isEdit?: boolean
  onSave?: SaveHandler
  onCancel?: () => void
}>

const SaveRequestModal: FC<SaveRequestModalProps> = (
  {
    id,
    isEdit,
    query: initialQuery,
    title: initialTitle,
    order: initialOrder,
    count: initialCount,
    onCancel,
    onSave,
  },
) => {

  const [query, setQuery] = useState(initialQuery)
  const [title, setTitle] = useState(initialTitle ?? "")
  const [sort, setSort] = useState<Order>(initialOrder ?? "relevance")
  const [count, setCount] = useState(initialCount)

  const isValid = title.length > 0 && query.length > 0

  const dropdownData: Record<Order, string> = {
    relevance: "Без сортировки",
    title: "Названию",
    viewCount: "Кол-ву просмотров",
    date: "Дате публикации",
    rating: "Рейтингу",
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = useCallback(() => onCancel?.(), [onCancel])
  const handleSave = useCallback(() => void setIsLoading(true), [])

  useEffect(() => {
    if (isLoading) {
      let shouldUpdateState = true // protect against "memory leak" warnings

      onSave?.(id ?? 0, query, title, sort, count).finally(() => {
        shouldUpdateState && setIsLoading(false)
      })

      return () => void (shouldUpdateState = false)
    }
  }, [isLoading, onSave, /* TODO: i should use refs. But it works: */ count, id, query, sort, title])

  return (
    <ModalWindowFullscreenBackface>
      <ModalWindow>

        <ModalWindowHeader>
          <Headline level={3}>{isEdit ? "Изменить" : "Сохранить"} запрос</Headline>
        </ModalWindowHeader>

        <ModalWindowFields>

          <ModalWindowField>
            <Label>Запрос</Label>
            <Input value={query} onChange={setQuery} disabled={!isEdit}/>
          </ModalWindowField>
          <ModalWindowField>
            <Label>Название</Label>
            <Input value={title} onChange={setTitle} disabled={isLoading}/>
          </ModalWindowField>
          <ModalWindowField>
            <Label>Сортировать по</Label>
            <Dropdown data={dropdownData} value={sort} onChange={setSort as any /* FIXME */}/>
          </ModalWindowField>
          <ModalWindowField>
            <Label>Максимальное количество</Label>
            <Counter value={count} onChange={setCount} min={0} max={50}/>
          </ModalWindowField>

        </ModalWindowFields>

        <ModalWindowButtons>
          <Button secondary onClick={handleCancel}>Не сохранять</Button>
          <Button disabled={!isValid} onClick={handleSave}>Сохранить</Button>
        </ModalWindowButtons>

      </ModalWindow>
    </ModalWindowFullscreenBackface>
  )
}
export default SaveRequestModal


export type SaveHandler = (id: number, query: string, title: string, sort: Order, count: number) => Promise<void>

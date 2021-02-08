import {useSelector} from "react-redux"


export function useIsAuthorized(): "background" | "authorized" | "anonymous" {

  const auth = useSelector(s => s.auth)
  const isLoading = auth.loading
  const hasToken = Boolean(auth.data?.token)
  const isUser = Boolean(auth.data?.user)

  if (isLoading && !isUser && hasToken) return "background"
  if (hasToken && isUser) return "authorized"
  return "anonymous"
}

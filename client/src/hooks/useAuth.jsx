import { useQuery } from "@tanstack/react-query"
import { checkAuth } from "../api/userApi"
import { useDispatch } from "react-redux"
import { setUserData } from "../slices/userSlice"
import { useEffect } from "react"

export const useAuth = () => {
  const dispatch = useDispatch()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => await checkAuth(),
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!isLoading && !isError && data?.isLoggedIn)
      dispatch(setUserData(data?.user))
  }, [data, dispatch, isError, isLoading])

  let isLoggedIn = data?.isLoggedIn
  if (isError) isLoggedIn = false

  return { isLoggedIn, isLoading, user: data?.user }
}

import { useQuery } from "@tanstack/react-query"
import { checkAuth } from "../api/userApi"

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => await checkAuth(),
    retry: false,
    refetchOnWindowFocus: false,
  })

  let isLoggedIn = data?.isLoggedIn
  if (isError) isLoggedIn = false

  return { isLoggedIn, isLoading, user: data?.user }
}

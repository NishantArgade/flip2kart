import { Navigate, Outlet } from "react-router-dom"
import Spinner from "./Spinner"

const ProtectedRoute = ({
  isAdminRoute = false,
  isCommonRoute = false,
  authData,
}) => {
  const { isLoggedIn, isLoading, user } = authData

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <Spinner /> */}
      </div>
    )

  let allowedRoles = []
  allowedRoles = isAdminRoute ? ["admin", "operator"] : ["user"]

  if (isLoggedIn && isCommonRoute) return <Outlet />

  if (!isLoggedIn) return <Navigate to="/login" />
  else if (isLoggedIn && !allowedRoles.includes(user?.role))
    return <Navigate to="/" />
  else return <Outlet />
}

export default ProtectedRoute

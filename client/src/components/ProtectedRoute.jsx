import { Navigate, Outlet } from "react-router-dom"
import Spinner from "./Spinner"

const ProtectedRoute = ({ isAdminRoute = false, authData }) => {
  const { isLoggedIn, isLoading, user } = authData

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <Spinner /> */}
      </div>
    )

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  } else if (
    (isLoggedIn && !isAdminRoute) ||
    (isLoggedIn && isAdminRoute && ["admin", "operator"].includes(user?.role))
  ) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedRoute

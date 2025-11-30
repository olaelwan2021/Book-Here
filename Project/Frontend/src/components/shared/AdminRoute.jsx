import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminRoute({ children }) {
    const [admin, setAdmin] = [localStorage.getItem("isAdmin"), null];
    if (!admin || admin === "false") {
        return toast.error("Access denied. Admins only."), <Navigate to="/" />;
    }

  return children;
}

export default AdminRoute;

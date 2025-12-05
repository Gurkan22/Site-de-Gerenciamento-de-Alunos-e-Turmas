import { Navigate } from "react-router-dom";
import useTokenStore from "../store/TokenStore";

interface Props {
  children: JSX.Element;
  requiredRole?: string; // e.g. 'ADMIN'
}

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  if (!tokenResponse || !tokenResponse.token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && tokenResponse.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

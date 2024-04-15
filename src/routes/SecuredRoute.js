import { shallowEqual, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import SecureLayout from "../layouts/secure/SecureLayout";

const SecuredRoute = () => {
    const location = useLocation();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn, shallowEqual);
    return (
        isLoggedIn 
            ? <SecureLayout><Outlet /></SecureLayout>
            : <Navigate to={{pathname: '/login'}} state={{from: location}} replace />
    )
}

export default SecuredRoute;
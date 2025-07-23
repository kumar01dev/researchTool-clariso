import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../utlis/SupabaseClient';

const PrivateRoute = () => {
    const [session, setSession] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setChecking(false);
        };

        checkSession();
    }, []);

    if (checking) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
                Checking authentication...
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
    };

export default PrivateRoute;
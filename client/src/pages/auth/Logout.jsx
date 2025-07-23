import { useEffect } from "react";
import { supabase } from "../../utlis/SupabaseClient";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigate("/"); // or "/login"
    };
    logout();
  }, [navigate]);

  return (
    <div className="text-white flex justify-center items-center h-screen bg-zinc-800">
      <p>Logging you out...</p>
    </div>
  );
};

export default Logout;
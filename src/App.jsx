import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";
import Signin from "./components/Signin/Signin.jsx";
import "./App.css";
import updateProfile from "./components/UpdateProfile/UpdateProfile.jsx";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then((data) => {
      setSession(data.data.session);
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      const { data } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id })
        .select();
      console.log(data);
    };
    getProfile();
  }, [session]);

  if (session) {
    return <h1>LOGGED</h1>;
  } else {
    return <Signin></Signin>;
  }
}

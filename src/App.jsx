import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";
import Signin from "./components/Signin/Signin.jsx";
import "./App.css";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then((data) => {
      setSession(data.data.session);
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      // {
      //   data {
      //     user: {
      //       id: "pollo",
      //       token: '2asds'
      //     }
      //   }
      // }
      //const userData = await supabaseClient.auth.getUser();
      // userData.data.user.id
      // const { data } = await supabaseClient.auth.getUser();
      // data.user.id

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      const { data } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id })
        .select();

      const usernameData = await supabaseClient
        .from("profiles")
        .select("username")
        .eq("id", user.id);

      setUser(usernameData.data[0]);
      console.log(usernameData);
    };

    getProfile();
  }, [session]);

  if (session) {
    if (user && user.username) {
      return (
        <div>
          <h1>Ciao {user.username}!</h1>
        </div>
      );
    } else {
      return <UpdateProfile></UpdateProfile>;
    }
  } else {
    return <Signin></Signin>;
  }
}

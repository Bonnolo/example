import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";
import Signin from "./components/Signin/Signin.jsx";
import "./App.css";
//import UpdateProfile from "./components/UpdateProfile/UpdateProfile.jsx";
import Signout from "./components/Signout/Signout.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";
import UpdateProfile from "./components/RigoUpdate/RigoUpdate.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then((data) => {
      setSession(data.data.session);
    });
  }, []);

  useEffect(() => {
    if (!session) return;
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

      const dataUsername = await supabaseClient
        .from("profiles")
        .select("username, avatarurl, website, bio")
        .eq("id", user.id);

      setUser(dataUsername.data[0]);
      console.log(dataUsername);
    };
    getProfile();
  }, [session]);

  if (session) {
    if (user && user.username) {
      return (
        <div style={{ padding: 2 + "rem" }}>
          <h1>Ciao {user.username}!</h1>
          <span>{user.avatarurl}</span>
          <br />
          <span>{user.website}</span>
          <br />
          <span>{user.bio}</span>
          {/*           <form onSubmit={Signout}>
            <button type="submit">LogOut</button>
          </form> */}
        </div>
      );
    } else {
      return <UpdateProfile></UpdateProfile>;
    }
  } else {
    return <Signin></Signin>;
  }
}

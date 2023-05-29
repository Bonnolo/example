import { useEffect, useState } from "react";
import { supabaseClient } from "./supabase-client.js";
import Signin from "./components/Signin/Signin.jsx";
import Updateprofile from "./components/UpdateProfile/UpdateProfile.jsx";
import "./App.css";
//import updateProfile from "./components/UpdateProfile/UpdateProfile.jsx";

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
      console.log(user);
      const { data } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id })
        .select()
        .then(() => {
          //console.log("Profile created!");
        });
      console.log(data);
    };
    getProfile();
  }, [session]);

  useEffect(() => {
    const insertUsername = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      console.log("true");
      const { data } = await supabaseClient
        .from("profiles")
        .upsert({ id: user.id, username: user.username })
        .select()
        .then(() => {
          console.log("Profile Updated!");
        });
      //console.log(data);
    };
    insertUsername();
  }, [session]);
  console.log(session);

  if (session) {
    if (session.user && session.user.username) {
      return (
        <div>
          <h1>Ciao {session.user.username}!</h1>
          {/* <TodoList /> */}
        </div>
      );
    } else {
      return <Updateprofile></Updateprofile>;
    }
  } else {
    return <Signin></Signin>;
  }
}

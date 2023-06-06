import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      const { error } = await supabaseClient
        .from("profiles")
        .update({
          username: username,
          avatarurl: avatarURL,
          website: website,
          bio: bio,
        })
        .eq("id", user.id);

      if (error) {
        setError(error.msg);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event) => {
    switch (event.target.name) {
      case "Username":
        setUsername(event.target.value);
        console.log("username: ", username);
        break;
      case "AvatarURL":
        setAvatarURL(event.target.value);
        console.log("avatar: ", avatarURL);
        break;
      case "Website":
        setWebsite(event.target.value);
        console.log("website: ", website);
        break;
      case "Bio":
        setBio(event.target.value);
        console.log("bio: ", bio);
        break;
    }
    //console.log(event);
  };

  return (
    <div>
      <h1>Completa il tuo profilo!</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="Username"
          placeholder="Username"
          onChange={handleInput}
        />
        <input
          type="text"
          name="AvatarURL"
          placeholder="AvatarURL"
          onChange={handleInput}
        />
        <input
          type="text"
          name="Website"
          placeholder="Website"
          onChange={handleInput}
        />
        <textarea name="Bio" placeholder="Bio" onChange={handleInput} />
        <button type="submit" /* disabled={isLoading} */>Invia</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

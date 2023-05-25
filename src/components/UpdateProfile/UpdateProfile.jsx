import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const updateProfile = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = supabaseClient.auth.getUser();
      const { data, error } = await supabaseClient
        .from("profiles")
        .update({
          username: username,
          website: website,
          bio: bio,
        })
        .eq("id", user.id);
      if (error) {
        setError(error.msg);
      } else {
        console.log(data);
      }
    } catch (error) {
      setError(error.msg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  handleInput = (event) => {
    setUsername(event.target.value);
    setWebsite(event.target.value);
    setBio(event.target.value);
  };
  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={submitHandler}>
        <input type="username" name="username" onChange={handleInput} />
        <input type="website" name="website" onChange={handleInput} />
        <input type="bio" name="bio" onChange={handleInput} />
        <button disabled={isLoading} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};
export default updateProfile;

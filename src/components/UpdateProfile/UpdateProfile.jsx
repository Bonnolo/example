import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      const { error } = await supabaseClient
        .from("profiles")
        .update({ username: username })
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
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Completa il tuo profilo!</h1>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={handleInput} />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

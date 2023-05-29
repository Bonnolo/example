import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const Updateprofile = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabaseClient.auth.update({
        username,
      });
      console.log(username, "username");
      if (error) {
        setError(error.msg);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.msg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInput = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Update Profile!</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="username" onChange={handleInput} />
        <button disabled={isLoading} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};
export default Updateprofile;

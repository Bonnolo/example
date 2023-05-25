import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
      });
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
    setEmail(event.target.value);
  };

  return (
    <div>
      <h1>Login!</h1>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" onChange={handleInput} />
        <button disabled={isLoading} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default Signin;

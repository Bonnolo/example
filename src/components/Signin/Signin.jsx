import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // const { error } = await supabaseClient.auth.signInWithOtp({
      //   email,
      // });

      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      // const { error } = await supabaseClient.auth.signInWithPassword({
      //   email,
      //   password,
      // });

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

  const submitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
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

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const signInWithDiscord = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "discord",
    });

    console.log("dataaaa: ", data);
  };

  return (
    <div>
      <button onClick={signInWithDiscord}>Sign in with discord</button>

      <h1>Register!</h1>
      <form onSubmit={submitRegister}>
        <input type="email" name="email" onChange={handleInputEmail} />
        <input type="password" name="password" onChange={handleInputPassword} />
        <button disabled={isLoading} type="submit">
          Register
        </button>
      </form>
      <h1>or Login!</h1>
      <form onSubmit={submitLogin}>
        <input type="email" name="email" onChange={handleInputEmail} />
        <input type="password" name="password" onChange={handleInputPassword} />
        <button disabled={isLoading} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;

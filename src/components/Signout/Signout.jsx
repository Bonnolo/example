import { useState } from "react";
import { supabaseClient } from "../../supabase-client.js";

const Signout = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  setIsLoading(true);
  setError(null);
  try {
    const { error } = await supabaseClient.auth.signOut();

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

export default Signout;

import { useForm } from "react-hook-form";
import { supabaseClient } from "../../supabase-client.js";

const UpdateProfile = () => {
  const { register, handleSubmit, formState } = useForm();

  const updateData = async (formData) => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const { data } = await supabaseClient
      .from("profiles")
      .upsert({ id: user.id, ...formData });
  };

  return (
    <div>
      <h1>Completa il tuo profilo</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input
          type="text"
          required
          {...register("username", { required: true, minLength: 4 })}
        />
        <input type="text" {...register("website")} />
        <textarea type="text" {...register("bio")} />
        <button type="submit">Aggiorna</button>
        {formState.errors?.username?.type === "required" && (
          <span>Il campo username è obbligatorio</span>
        )}
        {formState.errors?.username?.type === "minLength" && (
          <span>Il campo username deve avere almeno 4 lettere</span>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;

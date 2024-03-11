import { Alert, Box, Button, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  onSubmit: () => void;
  refetch: () => void;
};

const CreateForm = ({ onSubmit, refetch }: Props) => {
  const { register, handleSubmit } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    await executePost({ data });
    onSubmit();
    refetch();
  };

  const invalidEmailError = error?.response?.data?.error === "Invalid email";

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {loading && <Alert severity="info">Creating user...</Alert>}
          {error && (
            <Alert severity="error">
              {invalidEmailError
                ? "Invalid email address"
                : "Sorry - there was an error creating the user"}
            </Alert>
          )}
          <TextField
            label="First Name"
            variant="outlined"
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            {...register("lastName")}
          />
          <TextField label="Email" variant="outlined" {...register("email")} />
          <TextField
            label="Date of Birth"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("dateOfBirth")}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            {...register("phoneNumber")}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateForm;

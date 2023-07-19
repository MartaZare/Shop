import { ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducers/userSlice";

interface AddUserProps {
  setShowLogIn: (arg: boolean) => void;
}

function AddUser(props: AddUserProps) {
  const { setShowLogIn } = props;
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event?.preventDefault();
    setShowLogIn(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentUser(event.target.value));
  };

  return (
    <>
      <div className="page-align">
        <div className="log-in">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddUser;

import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducers/userSlice";

interface LogInProps {
  setShowLogIn: (arg: boolean) => void;
}

export default function LogIn(props: LogInProps) {
  const { setShowLogIn } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch(setCurrentUser(username));
    setShowLogIn(false);
  }

  return (
    <>
      <div className="page-align">
        <div className="log-in">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

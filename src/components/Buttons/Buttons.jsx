import styles from "./styles.module.css";

export const LoginButton = () => {
  return (
    <button>
      <a href="/api/auth/login">Login</a>
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button>
      <a href="/api/auth/logout">Log Out</a>
    </button>
  );
};

export const SignUpButton = () => {
  return (
    <button>
      <a href="/api/auth/signup">Sign Up</a>
    </button>
  );
};
export const CreatePostButton = () => {
  return (
    <button>
      <a href="/create-post">+</a>
    </button>
  );
};

export const SaveContinue = () => {
  return <div>Buttons</div>;
};

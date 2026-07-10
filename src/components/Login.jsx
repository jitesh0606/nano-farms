import { useState } from "react";
import supabase from "../lib/supabase";

function Login({ onLogin, goHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    onLogin();
  }

  return (
    <div className="product-page">
      <button onClick={goHome}>
        ⬅ Back Home
      </button>

      <h1>🔐 Admin Login</h1>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;
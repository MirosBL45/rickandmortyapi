import { useNavigate } from "react-router-dom";
import LoginForm from "./comonents/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import Clock from "./comonents/Clock/Clock";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <section className={styles.formSection}>
      <img src="/logoRaM.png" alt="Rick & Morty" />
      <Clock />
      <LoginForm onSuccess={() => navigate("/character-list")} />
    </section>
  );
}

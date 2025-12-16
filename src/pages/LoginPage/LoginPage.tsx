import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import Clock from "./components/Clock/Clock";

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

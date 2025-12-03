import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Developed by{" "}
        <a
          href="https://miroslavjovic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Miroslav Jovic
        </a>
        {" · "}
        Supervisor{" "}
        <a
          href="https://github.com/djukicaleksa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aleksa Djukic
        </a>
      </p>
    </footer>
  );
};


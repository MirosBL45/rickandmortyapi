import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import type { ReactNode } from "react";

import styles from "./ProtectedLayout.module.scss";

type Props = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.content}>
        <Header />
        {children}
      </main>
      <Footer />
    </div>
  );
}

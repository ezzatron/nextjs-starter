import Image from "next/image";
import bananas from "./bananas.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.example}>
      It works
      <Image src={bananas} alt="Bunches of bananas" />
    </main>
  );
}

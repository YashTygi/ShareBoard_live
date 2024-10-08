import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "@/components/homepage/page";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomePage />
    </div>
  );
}

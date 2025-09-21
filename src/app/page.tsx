import Image from "next/image";
import styles from "./page.module.css";
import link from "next/navigation";
export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
      </header>

      <main className={styles.main}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Image
          className={styles.logo}
          src="/favicon.ico"
          alt="Project Court logo"
          width={450}
          height={450}
          style = {{marginRight: "20%"}}
          priority
        />
          <div className={styles.ctas}>
            <h1 className={styles.title}>Moot Debate</h1> 
            <a
            className={styles.primary} //change the link below to a log of previous chats
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Image
              className={styles.logo} 
              src="/vercel.svg"
              alt="Vercel logomark"
              width={50}
              height={50}
              style={{ transform: "rotate(90deg)" }}
            />
            Continue Chat

          </a>
          <a //direct the following link to the new debate chat page
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            <Image
              className={styles.logo} 
              src="/vercel.svg"
              alt="Vercel logomark"
              width={50}
              height={50}
              style={{ transform: "rotate(90deg)" }}
            />
            New Chat

          </a>
          <a //direct the following link to the about page
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.about}
          >
            <Image
              className={styles.logo} 
              src="/vercel.svg"
              alt="Vercel logomark"
              width={50}
              height={50}
              style={{ transform: "rotate(90deg)" }}
            />
            About
          </a>
          </div>
       </div>

        {/* <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>. 
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={20}
            height={20}
          />
          About
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={20}
            height={20}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={20}
            height={20}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
      <footer className={styles.footer}>
        </footer>
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getAllFilesMetadata } from '../library/mdx';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My first blog JAMStack
        </h1>

        <div className={styles.grid}>
        {posts.map(post => (
          <Link href={`/${post.slug}`} className={styles.card} key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <h5>{post.slug}</h5>
          </Link>
        ))}
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(){
  const posts = await getAllFilesMetadata();
  console.log(posts);
  return {
    props: {
      posts
    }
  }
}

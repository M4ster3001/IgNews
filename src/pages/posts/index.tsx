import styles from './styles.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>{new Date().toUTCString()}</time>
            <strong>test title</strong>
            <p>content test</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({previewData}) => {

  const prismic = getPrismicClient({previewData})

  const response = await prismic.getAllByType('publication', {fetch: ['publication.title', 'publication.content'], pageSize: 10})

  return {
    props: {}
  }
}
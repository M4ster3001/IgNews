import styles from './styles.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import React from 'react'
import Link from 'next/link'

type Post = {
  slug: string
  title: string
  exercept: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post, key: React.Key) => (
            <Link key={key} href={`/posts/${post.slug}`} passHref>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.exercept}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = getPrismicClient({ previewData })

  const response = await prismic.getAllByType('publication', {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 10
  })

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updatedAt: new Date(post.data.last_publication_date).toLocaleDateString(
        'pt-BR',
        { day: '2-digit', month: 'long', year: 'numeric' }
      )
    }
  })

  return {
    props: {
      posts
    }
  }
}

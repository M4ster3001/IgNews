import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Img from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';

import girlCoding from '../../public/images/avatar.svg'
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
            <span>Hey, Welcome</span>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get access to all the publications <br />
              <span>for {product.amount} monthly</span>
            </p>

            <SubscribeButton priceId={product.priceId} />
        </section>

        <Img src={girlCoding} alt="Girl Coding"/>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product
    }
  }
}

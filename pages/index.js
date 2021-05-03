import Layout from '../components/Layout';
import HomeComponent from '../container/Homepage/index'
import Head from "../components/head";

export default function Home() {
  return (
    <Layout>
      <Head></Head>
      <div className="App">
      <HomeComponent />
      </div>
    </Layout>
  );
}

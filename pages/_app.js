// pages/_app.js
import "@/styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const protectedRoute = !["/", "/finish"].includes(router.pathname);
  return (
    <Layout protectedRoute={protectedRoute}>
      <Component {...pageProps} />
    </Layout>
  );
}

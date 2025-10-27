// pages/_app.js
import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // homepage & finish NU sunt protejate
  const protectedRoute = !["/", "/finish"].includes(router.pathname);

  return (
    <main className={space.className}>
      <Layout protectedRoute={protectedRoute}>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

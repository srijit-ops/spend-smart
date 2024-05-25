import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
      <script
      defer
  type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_ttiP6i1AVnRunsje9SU7LYn1Ldf7Ln0&libraries=places"
/>
        </Head>
      <body className="bg-[#040404]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

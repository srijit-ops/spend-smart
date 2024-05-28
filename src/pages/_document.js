import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <script
          defer
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </Head>
      <body className="bg-[#040404]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link href='lib/css/index.css' rel="stylesheet" strategy="lazyOnload"/> */}
        <link href="https://cdn.jsdelivr.net/npm/@coreui/coreui@4.2.0/dist/css/coreui.min.css" rel="stylesheet" integrity="sha384-UkVD+zxJKGsZP3s/JuRzapi4dQrDDuEf/kHphzg8P3v8wuQ6m9RLjTkPGeFcglQU" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src="lib/js/index.js" strategy="lazyOnload"/> */}
        <script src="https://cdn.jsdelivr.net/npm/@coreui/coreui@4.2.0/dist/js/coreui.bundle.min.js" integrity="sha384-n0qOYeB4ohUPebL1M9qb/hfYkTp4lvnZM6U6phkRofqsMzK29IdkBJPegsyfj/r4" crossOrigin="anonymous"></script>
      </body>
    </Html>
  )
}

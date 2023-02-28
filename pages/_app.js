import '../styles/globals.css'
import '../public/lib/css/index.css'
// import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

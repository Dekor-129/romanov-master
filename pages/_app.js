import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Analytics from '../components/Analytics'
import ScrollToTop from '../components/ScrollToTop'
import SEO from '../components/SEO'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <SEO />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default MyApp
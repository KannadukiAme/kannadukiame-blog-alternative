import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <div className="container mx-auto">
        { children }
        </div>
      </div>
      <Footer />
    </div>
  )
}

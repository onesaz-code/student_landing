import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="lp-section">
      <div className="lp-container flex flex-col items-center gap-5 text-center">
        <span className="lp-eyebrow">Page not found</span>
        <h1 className="lp-h1">We could not find that page.</h1>
        <p className="lp-lead max-w-[560px]">The link may be old or mistyped. Try one of these instead.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="lp-btn lp-btn-primary">
            Go to home
          </Link>
          <Link to="/#products" className="lp-btn lp-btn-secondary">
            See all products
          </Link>
          <Link to="/contact" className="lp-btn lp-btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}

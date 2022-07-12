import Link from 'next/link'

export default function SiteNavigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <a>Personalization Engine</a>
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item m-3">
          <Link className="navbar-brand" href="/collections">
            <a>Collections</a>
          </Link>
        </li>
        <li className="nav-item m-3">
          <Link className="navbar-brand" href="/experiences">
            <a>Experiences</a>
          </Link>
        </li>
        <li className="nav-item m-3">
          <Link className="navbar-brand" href="/rules">
            <a>Rules</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  )
}
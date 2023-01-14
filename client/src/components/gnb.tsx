import { Link } from 'react-router-dom'

const Gnb = () => (
  <nav className="gnb">
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/products">products</Link>
      </li>
      <li>
        <Link to="/cart">cart</Link>
      </li>
      <li>
        <Link to="/admin">admin</Link>
      </li>
    </ul>
  </nav>
)

export default Gnb

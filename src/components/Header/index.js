import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {BsBoxArrowRight} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-section">
      <Link to="/">
        <li className="list-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </li>
      </Link>
      <ul className="nav-options">
        <Link to="/" className="link-class">
          <li className="list-item">
            <p className="nav-option-home">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link-class">
          <li className="list-item">
            <p className="nav-option-home">Jobs</p>
          </li>
        </Link>
      </ul>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="mobile-icons-section">
        <Link to="/" className="link-class">
          <li className="list-item">
            <button className="icon-button" type="button">
              <AiFillHome className="home-icon" />
            </button>
          </li>
        </Link>
        <Link to="/jobs" className="link-class">
          <li className="list-item">
            <button type="button" className="icon-button">
              <FaSuitcase className="home-icon" />
            </button>
          </li>
        </Link>
        <Link to="/login" className="link-class">
          <li className="list-item">
            <button
              type="button"
              className="icon-button"
              onClick={onClickLogout}
            >
              <BsBoxArrowRight className="home-icon" />
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default Header

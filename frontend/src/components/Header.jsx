import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <h1>DHVSU Archives</h1>
        <Link to='/login'>Login Page</Link>
    </div>
  )
}

export default Header
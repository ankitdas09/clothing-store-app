import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crwn-logo.svg'
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context"
import { SignOutUser } from "../../utils/firebase.utils"

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    console.log(currentUser)
    const handleSignOut = async () => {
        await SignOutUser()
        setCurrentUser(null)
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>Shop</Link>
                    {currentUser ?
                        <span className="nav-link" onClick={handleSignOut}>Sign Out</span> :
                        <Link className="nav-link" to='/auth'>Sign In</Link>
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation
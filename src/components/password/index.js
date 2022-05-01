import './index.css'

const Password = props => {
  const {details, onDeletePassword, isShowPassword} = props
  const {id, website, username, password, backgroundColor} = details

  const nameInitial = username[0].toUpperCase()

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li>
      <div className="list-container">
        <div className="name-initial-container" style={{backgroundColor}}>
          <p className="name-initial">{nameInitial}</p>
        </div>
        <div className="pass-details-container">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {isShowPassword ? (
            <p className="password-text">{password}</p>
          ) : (
            <img
              className="password-img"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </div>
        <button
          onClick={deletePassword}
          className="delete-button"
          testid="delete"
          type="button"
        >
          <img
            className="delete-icon"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}
export default Password

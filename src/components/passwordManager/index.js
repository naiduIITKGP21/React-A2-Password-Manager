import {Component} from 'react'
import {v4} from 'uuid'
import Password from '../password'
import NoPasswordsView from '../noPasswordsView'
import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwords: [],
    isShowPassword: false,
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  filterBySearch = () => {
    const {passwords, searchInput} = this.state
    const filteredResults = passwords.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredResults
  }

  onDeletePassword = id => {
    const {passwords} = this.state
    this.setState({
      passwords: passwords.filter(eachPassword => eachPassword.id !== id),
    })
  }

  onCheckShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onWebsiteInput = event => this.setState({websiteInput: event.target.value})

  onUsernameInput = event => this.setState({usernameInput: event.target.value})

  onPasswordInput = event => this.setState({passwordInput: event.target.value})

  onSubmitForm = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwords: [...prevState, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {websiteInput, usernameInput, passwordInput, passwords} = this.state
    const searchResults = this.filterBySearch()
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="pm-logo-container">
            <img
              className="pm-logo-img"
              alt="app logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            />
          </div>
          <div className="pm-new-pass-container">
            <img
              className="pm-sm-img"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <div className="add-pass-card">
              <h1 className="add-new-pass-heading">Add New Password</h1>
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="icon"
                      alt="website"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onWebsiteInput}
                    value={websiteInput}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="icon"
                      alt="username"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onUsernameInput}
                    value={usernameInput}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="icon"
                      alt="password"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    />
                  </div>
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onPasswordInput}
                    value={passwordInput}
                  />
                </div>
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="pm-lg-img"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>

          <div className="pm-urpass-container">
            <div className="ur-pass-header">
              <div className="ur-pass-container">
                <p className="ur-pass-text">
                  Your Passwords
                  <span className="pass-count">{passwords.length}</span>
                </p>
              </div>
              <div className="search-container">
                <img
                  className="search-icon"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  onChange={this.onChangeSearchInput}
                  className="search-input"
                  type="search"
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-pass-container">
              <input
                id="checkbox"
                className="checkbox"
                type="checkbox"
                onChange={this.onCheckShowPassword}
              />
              <label htmlFor="checkbox" className="show-pass">
                Show Password
              </label>
            </div>
            <ul className="ul-container">
              {searchResults.length !== 0 ? (
                searchResults.map(eachObject => (
                  <Password
                    key={eachObject.id}
                    details={eachObject}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))
              ) : (
                <NoPasswordsView />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager

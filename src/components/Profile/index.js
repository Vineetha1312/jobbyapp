import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const profileApiConstants = {
  initialProfile: 'INITIAL_PROFILE',
  successProfile: 'SUCCESS_PROFILE',
  failureProfile: 'FAILURE_PROFILE',
  inProgressProfile: 'IN_PROGRESS_PROFILE',
}

class Profile extends Component {
  state = {
    profileData: {},
    profileApiStatus: profileApiConstants.initialProfile,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: profileApiConstants.inProgressProfile})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfile,
        profileApiStatus: profileApiConstants.successProfile,
      })
    } else {
      this.setState({profileApiStatus: profileApiConstants.failureProfile})
    }
  }

  renderProfileFailure = () => (
    <div className="profile-failure-section">
      <button
        className="retry-button"
        type="button"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileData} = this.state

    return (
      <div className="profile-bg-container">
        <img src={profileData.profileImageUrl} alt="profile" />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-description">{profileData.shortBio}</p>
      </div>
    )
  }

  renderProfileLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSection = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiConstants.successProfile:
        return this.renderProfileDetails()
      case profileApiConstants.failureProfile:
        return this.renderProfileFailure()
      case profileApiConstants.inProgressProfile:
        return this.renderProfileLoaderView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      Cookies.remove(jwtToken)
      history.replace('/login')
    }

    return (
      <div className="profile-container">{this.renderProfileSection()}</div>
    )
  }
}

export default Profile

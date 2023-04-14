import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'
import {RiShareBoxLine} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import SimilarJobDetailsItem from '../SimilarJobDetailsItem'
import './index.css'

const itemApiConstants = {
  initialItem: 'INITIAL_ITEM',
  successItem: 'SUCCESS_ITEM',
  failureItem: 'FAILURE_ITEM',
  inProgressItem: 'IN_PROGRESS_ITEM',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsObject: {},
    similarJobsList: [],
    lifeAtCompanyDetails: {},
    companySkillsList: [],
    itemApiStatus: itemApiConstants.initialItem,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({itemApiStatus: itemApiConstants.inProgressItem})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      const updatedJobItemDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      const updatedLifeAtCompany = {
        description: updatedJobItemDetails.lifeAtCompany.description,
        imageUrl: updatedJobItemDetails.lifeAtCompany.image_url,
      }

      const updatedCompanySkill = updatedJobItemDetails.skills.map(
        eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        }),
      )

      const updatedSimilarJobsList = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobItemDetailsObject: updatedJobItemDetails,
        similarJobsList: updatedSimilarJobsList,
        lifeAtCompanyDetails: updatedLifeAtCompany,
        companySkillsList: updatedCompanySkill,
        itemApiStatus: itemApiConstants.successItem,
      })
    } else {
      this.setState({itemApiStatus: itemApiConstants.failureItem})
    }
  }

  renderSimilarJobDetails = () => {
    const {similarJobsList} = this.state

    return (
      <ul className="similar-cards-list">
        {similarJobsList.map(eachItem => (
          <SimilarJobDetailsItem
            key={eachItem.id}
            similarItemDetails={eachItem}
          />
        ))}
      </ul>
    )
  }

  renderLoaderJobSection = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderJobItemDetailsCard = () => {
    const {
      jobItemDetailsObject,
      lifeAtCompanyDetails,
      companySkillsList,
    } = this.state
    return (
      <div key={jobItemDetailsObject.id}>
        <div className="job-item-details-section">
          <div className="job-title-logo-section">
            <img
              src={jobItemDetailsObject.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-section">
              <h1 className="company-title">{jobItemDetailsObject.title}</h1>
              <div className="rating-section">
                <AiFillStar color="#fbbf24" className="star" />
                <p className="rating">{jobItemDetailsObject.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-details-section">
            <div className="location-details">
              <div className="location-section">
                <ImLocation2 color="#ffffff" />
                <p className="location">{jobItemDetailsObject.location}</p>
              </div>
              <div className="location-section">
                <FaSuitcase color="#ffffff" />
                <p className="location">
                  {jobItemDetailsObject.employmentType}
                </p>
              </div>
            </div>
            <p className="package">{jobItemDetailsObject.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-section">
            <h1 className="description-heading">Description</h1>
            <a
              className="list-item"
              href={jobItemDetailsObject.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              <p className="visit-link">Visit</p>
              <RiShareBoxLine className="share-icon" color="#6366f1" />
            </a>
          </div>
          <p className="description">{jobItemDetailsObject.jobDescription}</p>
          <h1 className="company-title">Skills</h1>
          <ul className="skills-list">
            {companySkillsList.map(eachItem => (
              <li className="skills-list-item">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="skill-logo"
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="company-title">Life at Company</h1>
          <div className="life-at-company-section">
            <p className="life-at-company-description">
              {lifeAtCompanyDetails.description}
            </p>
            <img
              src={lifeAtCompanyDetails.imageUrl}
              alt="life at company"
              className="company-life-image"
            />
          </div>
        </div>
        <h1 className="company-logo">Similar Jobs</h1>
        {this.renderSimilarJobDetails()}
      </div>
    )
  }

  renderJobFailureSection = () => (
    <div className="job-failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-retry-button"
        type="button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsSection = () => {
    const {itemApiStatus} = this.state
    switch (itemApiStatus) {
      case itemApiConstants.successItem:
        return this.renderJobItemDetailsCard()
      case itemApiConstants.failureItem:
        return this.renderJobFailureSection()
      case itemApiConstants.inProgressItem:
        return this.renderLoaderJobSection()
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
      <div className="job-item-details-container">
        <Header />
        <div className="jobItemDetails-card">
          {this.renderJobDetailsSection()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails

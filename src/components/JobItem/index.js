import {Link} from 'react-router-dom'
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-className">
      <li className="job-item-bg-container">
        <div className="logo-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-section">
            <h1 className="job-title">{title}</h1>
            <div className="star-section">
              <AiFillStar color="#fbbf24" className="star" />
              <p className="star-count">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-details">
          <div className="details-section">
            <div className="location-section">
              <ImLocation2 color="#ffffff" />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-section">
              <FaSuitcase color="#ffffff" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem

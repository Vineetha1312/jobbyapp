import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobDetailsItem = props => {
  const {similarItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarItemDetails

  return (
    <li className="similar-job-card">
      <div className="job-title-logo-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-section">
          <h1 className="company-title">{title}</h1>
          <div className="rating-section">
            <AiFillStar color="#fbbf24" className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="des-heading">Description</h1>
      <p className="des">{jobDescription}</p>
      <div className="location-details">
        <div className="location-section">
          <ImLocation2 color="#ffffff" />
          <p className="location">{location}</p>
        </div>
        <div className="location-section">
          <FaSuitcase color="#ffffff" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobDetailsItem

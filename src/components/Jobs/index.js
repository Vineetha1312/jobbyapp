import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Profile from '../Profile'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobApiConstants = {
  jobInitial: 'JOB_INITIAL',
  jobSuccess: 'JOB_SUCCESS',
  jobFailure: 'JOB_FAILURE',
  jobInProgress: 'JOB_IN_PROGRESS',
}

const jobTotalApiConstants = {
  jobInitialApi: 'JOB_INITIAL_API',
  jobSuccessApi: 'JOB_SUCCESS_API',
  jobFailureApi: 'JOB_FAILURE_API',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    activeEmployementTypeId: '',
    activeSalaryRangeId: '',
    jobApiStatus: jobApiConstants.jobInitial,
    jobTotalApiStatus: jobTotalApiConstants.jobInitialApi,
    isJobsFound: true,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobApiStatus: jobApiConstants.jobInProgress})
    const {
      activeEmployementTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedJobData,
        jobApiStatus: jobApiConstants.jobSuccess,
        jobTotalApiStatus: jobTotalApiConstants.jobSuccessApi,
      })
    } else {
      this.setState({
        jobApiStatus: jobApiConstants.jobFailure,
        jobTotalApiStatus: jobTotalApiConstants.jobFailureApi,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSalaryRange = salaryRangeId => {
    this.setState({activeSalaryRangeId: salaryRangeId}, this.getJobsList)
  }

  changeEmployementType = employmentTypeId => {
    this.setState({activeEmployementTypeId: employmentTypeId}, this.getJobsList)
  }

  onEnterSearchInput = () => {
    const {jobsList, searchInput} = this.state
    const filterJobsList = jobsList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filterJobsList.length > 0) {
      this.setState({jobsList: filterJobsList}, this.getJobsList)
    } else {
      this.setState({isJobsFound: false})
    }
  }

  renderNoJobs = () => (
    <div className="job-failure-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobSearchInputElement = () => {
    const {searchInput} = this.state
    return (
      <div className="input-search-container">
        <input
          type="search"
          placeholder="Search"
          className="jobs-search-element"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onEnterSearchInput}
        >
          <BsSearch color="#ffffff" className="search-icon" />
        </button>
      </div>
    )
  }

  renderEmploymentTypeList = () => (
    <ul>
      {employmentTypesList.map(eachItem => (
        <EmploymentTypeItem
          employmentTypeDetails={eachItem}
          key={eachItem.employmentTypeId}
          changeEmployementType={this.changeEmployementType}
        />
      ))}
    </ul>
  )

  renderSalaryRangeSection = () => (
    <ul className="salary-section-container">
      {salaryRangesList.map(eachItem => (
        <SalaryRangeItem
          key={eachItem.salaryRangeId}
          salaryRangeDetails={eachItem}
          changeSalaryRange={this.changeSalaryRange}
        />
      ))}
    </ul>
  )

  renderJobsList = () => {
    const {jobsList, isJobsFound} = this.state

    return (
      <div>
        {isJobsFound ? (
          <ul>
            {jobsList.map(eachItem => (
              <JobItem key={eachItem.id} jobDetails={eachItem} />
            ))}
          </ul>
        ) : (
          this.renderNoJobs()
        )}
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
        We cannot seem to find the page your are looking for.
      </p>
      <button
        className="failure-retry-button"
        type="button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderJobSection = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderTotalSection = () => (
    <div className="jobs-section">
      {this.renderJobSearchInputElement()}
      <div>
        <div className="jobs-details-section">
          <div className="left-section">
            <Profile />
            <hr className="horzontal-line" />
            <h1 className="employment-heading">Type of Employment</h1>
            {this.renderEmploymentTypeList()}
            <hr className="horzontal-line" />
            <h1 className="employment-heading">Salary Range</h1>
            {this.renderSalaryRangeSection()}
          </div>
          {this.renderJobApi()}
        </div>
      </div>
    </div>
  )

  renderJobApi = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case jobApiConstants.jobSuccess:
        return this.renderJobsList()
      case jobApiConstants.jobFailure:
        return this.renderJobFailureSection()
      case jobApiConstants.jobInProgress:
        return this.renderLoaderJobSection()
      default:
        return null
    }
  }

  renderTotalJobApi = () => {
    const {jobTotalApiStatus} = this.state
    switch (jobTotalApiStatus) {
      case jobTotalApiConstants.jobSuccessApi:
        return this.renderTotalSection()
      case jobTotalApiConstants.jobFailureApi:
        return this.renderJobFailureSection()
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
      <div className="jobs-bg-container">
        <Header />
        {this.renderTotalJobApi()}
      </div>
    )
  }
}

export default Jobs

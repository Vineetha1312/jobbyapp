import './index.css'

const EmploymentTypeItem = props => {
  const {employmentTypeDetails, changeEmployementType} = props
  const {label, employmentTypeId} = employmentTypeDetails

  const onClickEmploymentType = () => {
    changeEmployementType(employmentTypeId)
  }

  return (
    <li className="type-of-employment-item" onClick={onClickEmploymentType}>
      <input type="checkbox" id="checkbox" />
      <label className="employment-type" htmlFor="checkbox">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem

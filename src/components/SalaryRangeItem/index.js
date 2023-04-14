import './index.css'

const SalaryRangeItem = props => {
  const {salaryRangeDetails, changeSalaryRange} = props
  const {label, salaryRangeId} = salaryRangeDetails

  const onClickSalaryRange = () => {
    changeSalaryRange(salaryRangeId)
  }

  return (
    <li className="type-of-employment-item" onClick={onClickSalaryRange}>
      <input type="radio" id="radio" className="radio-items" />
      <label className="employment-type" htmlFor="radio">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem

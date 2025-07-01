import PropTypes from 'prop-types'

function LoadingSpinner({
  size = 'md',
  message = 'Loading...',
  showMessage = true,
  className = ''
}) {
  const spinnerClass = [
    'loading-spinner',
    `loading-spinner-${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="loading-container">
      <div className={spinnerClass}>
        <div className="spinner-circle"></div>
      </div>
      {showMessage && message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  className: PropTypes.string
}

export default LoadingSpinner

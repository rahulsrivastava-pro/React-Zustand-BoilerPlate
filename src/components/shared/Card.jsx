import PropTypes from 'prop-types'

function Card({
  children,
  header,
  footer,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}) {
  const cardClass = [
    'card',
    `card-${variant}`,
    hover ? 'card-hover' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClass} {...props}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'elevated', 'bordered', 'flat']),
  hover: PropTypes.bool,
  className: PropTypes.string
}

export default Card

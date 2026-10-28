import PropTypes from 'prop-types';

export function Card({ children, className = '', interactive = false }) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 backdrop-blur-sm transition-colors ${
        interactive ? 'hover:border-cyan-400/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  interactive: PropTypes.bool,
};
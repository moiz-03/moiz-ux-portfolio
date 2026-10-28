import PropTypes from 'prop-types';

export function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-slate-800 text-slate-300',
    accent: 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20',
    concept: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'accent', 'concept']),
};
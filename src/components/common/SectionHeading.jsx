import PropTypes from 'prop-types';

export function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>
      )}
    </div>
  );
}

SectionHeading.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left']),
};
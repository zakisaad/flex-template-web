import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '../../config';
// import IconLogo from './IconLogo';
import LogoImage from './puff-logo.png';
import LogoImageIcon from './puff-logo-small.png';
import css from './Logo.css';

const Logo = props => {
  const { className, format, ...rest } = props;
  const mobileClasses = classNames(css.logoMobile, className);

  if (format === 'desktop') {
    return <img className={className} src={LogoImage} alt={config.siteTitle} {...rest} />;
  }

  return <img className={mobileClasses} style={{ height: '30px' }} src={LogoImageIcon} alt={config.siteTitle}  {...rest} />;
  // return <IconLogo className={mobileClasses} {...rest} />;
};

const { oneOf, string } = PropTypes;

Logo.defaultProps = {
  className: null,
  format: 'desktop',
};

Logo.propTypes = {
  className: string,
  format: oneOf(['desktop', 'mobile']),
};

export default Logo;

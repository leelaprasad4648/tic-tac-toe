import * as React from 'react';
import { Button as AntButton } from 'antd';
// import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ title, id, disabled, text, style, children, onClick, loading, icon, bgColor, textColor }) => (
    <AntButton
        disabled={disabled}
        id={id}
        loading={loading}
        onClick={onClick}
        style={{ width: '100%', ...style, ...{backgroundColor: bgColor, color: textColor || '#000000'} }}
        title={title}
        icon={icon}
    >
        {children}
        {text}
    </AntButton>
);

export default Button;

// Button.defaultProps = {
//     children: '',
//     disabled: false,
//     id: '',
//     image: '',
//     loading: false,
//     onClick: () => {},
//     size: '',
//     style: {},
//     text: '',
//     title: '',
// };
// Button.propTypes = {
//     children: PropTypes.string,
//     disabled: PropTypes.bool,
//     id: PropTypes.string,
//     image: PropTypes.string,
//     loading: PropTypes.bool,
//     onClick: PropTypes.func,
//     size: PropTypes.string,
//     style: PropTypes.shape(),
//     text: PropTypes.string,
//     title: PropTypes.string,
//     type: PropTypes.string.isRequired,
// };

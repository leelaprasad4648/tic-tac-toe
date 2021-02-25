import React from 'react';
import { Input as AntdInput } from 'antd';
import './index.scss';
import PropTypes from 'prop-types';

const getInputType = (type, properties, onChange, onKeyDown, style, defaultValue) => {
    const InputType = type === 'input' ? AntdInput : AntdInput[type];

    return (
        <InputType
            className="login-input"
            id={`${properties.name}`}
            {...properties}
            defaultValue={defaultValue}
            disabled={properties.disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
            style={{ ...style }}
            type={type}
        />
    );
};

const Input = ({ type, className, helperText, style, label, properties, onChangeHandler, required, onKeyDown, defaultValue }) => (
    <div className={`input-row ${className}`} style={style}>
        {label && (
            <label htmlFor={`${properties.name}`} title={label}>
                {`${label}`}
                {required && <span>*</span>}
            </label>
        )}
        {getInputType(type, properties, onChangeHandler, onKeyDown, style, defaultValue)}
        { helperText && <div className="helper-text">{helperText}</div>}
    </div>
);

export default Input;

Input.defaultProps = {
    className: '',
    defaultValue: '',
    helperText: false,
    onChangeHandler: () => {},
    onKeyDown: () => {},
    required: false,
    style: {},
    type: 'input'
};
Input.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    helperText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    label: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func,
    onKeyDown: PropTypes.func,
    properties: PropTypes.shape({
        disabled: PropTypes.bool,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    }).isRequired,
    required: PropTypes.bool,
    style: PropTypes.shape({}),
    type: PropTypes.string,
};

import React, {useState} from 'react';
import {Row, Col} from 'antd/lib/grid';
import {Modal, Radio} from 'antd';
import Button from '../Button';
import './index.scss';

const RadioSelect = ({label, className, style, properties, selectedValue, helperText, onRadioItemChange, modalTitle, checkBoxOptions}) => {
    const [showModal, toggleModal] = useState(false);
    const [selectedRadioValue, setSelectedValue] = useState(selectedValue);
    const radioStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '80px',
        lineHeight: '30px',
        background: '#EFF3FF 0% 0% no-repeat padding-box',
        border: '1px solid #70707026',
        borderRadius: '15px',
        paddingLeft: '28px'
    };

    return (
        <>
            {showModal && (
                <Modal title={modalTitle} visible={showModal} footer={null} onCancel={()=>toggleModal(!showModal)}>
                    <Radio.Group onChange={(e) => setSelectedValue(e.target.value)} value={selectedRadioValue}>
                        {checkBoxOptions && checkBoxOptions.map(option => (
                            <Radio style={radioStyle} value={option.value}>
                                {option.name}
                            </Radio>
                        ))}
                        <Row gutter={10}>
                            <Col xs={24} md={12}>
                                <Button
                                    text="CANCEL"
                                    onClick={()=>toggleModal(!showModal)}
                                    bgColor="#ffffff"
                                    textColor="#4B7BFF"
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <Button
                                    text="OK"
                                    onClick={() => {onRadioItemChange(selectedRadioValue); toggleModal(!showModal)}}
                                    bgColor="#4B7BFF"
                                    textColor="#ffffff"
                                />
                            </Col>
                        </Row>
                    </Radio.Group>
                </Modal>
            )}
            <div className={`radio-select ${className}`} style={style}>
                {label && (
                    <label htmlFor={`${properties.name}`} title={label} className="radio-select-label">
                        {`${label}`}
                    </label>
                )}
                <div className="selectedCheckboxOption" onClick={()=>toggleModal(!showModal)}>
                    {selectedValue}
                </div>
                { helperText && <div className="helper-text">{helperText}</div>}
            </div>
        </>
    )
}

export default RadioSelect;
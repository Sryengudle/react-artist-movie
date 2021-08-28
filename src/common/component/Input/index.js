import React, { useRef, useState, useEffect } from 'react';
import { Input, Label, FormFeedback, Col } from 'reactstrap';
import { INPUT_TYPES } from './inputTypes'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './input.scss';

function InputField(props) {
  const [inputValue, setInputValue] = useState('');
  const [isInValid, setIsInValid] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (
      props.value &&
      props.value.length > 0
    ) {
      setInputValue(props.value);
      isValidChange(props.value);
    } else setInputValue(props.value);

  }, [props.value]);

  const onChange = (e) => {
    setInputValue(e.target.value);
    isValidChange(e.target.value);
  }

  const isValidChange = (value) => {
    let field = {};
    field[props.type] = value;

    if (props.required !== true) {
      props.inputChanged(value, null);
      return;
    }

    if (props.required === true) {
      if (
        props.type == INPUT_TYPES.NUMBER &&
        value > props.max ||
        value < props.min
      ) {
        setIsInValid(true);
        // second param is isInValid
        props.inputChanged(value, true);
      } else {
        setIsInValid(false);
        // second param is isInValid
        props.inputChanged(value, false);
      }
    } else {
      setIsInValid(true);
      props.inputChanged(value, true);
    }
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setInputValue(e.target.value);
      props.onKeyDown(e.target.value);
    }
  }

  return (
    <Col 
      xl={props.width ? props.width : 12} 
      className={classnames('custom-padding', { 'inline-input': props.inline })}
    >
      <div className={'inputField ' + (props.required && isInValid ? 'invalid' : 'valid')}>
        <Label for={props.name} className='label'>{props.label}
          {props.required === true ? <span className='text-danger'> * </span> : null}
        </Label>
        <Input
          bsSize={props.size}
          disabled={props.disabled}
          autoComplete="off"
          invalid={props.required && isInValid}
          ref={inputRef}
          name={props.name}
          step={props.type === 'number' ? props.step : '1'}
          value={inputValue}
          type={props.type}
          onChange={onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyUp={props.onKeyUp}
          onKeyDown={keyPress}
          placeholder={props.placeholder}
          required={props.required}
          min={props.min}
          max={props.max}
          autoFocus={props.autoFocus}
        >
          {
            props.type === INPUT_TYPES.SELECT
              ?
              <React.Fragment>
                {Array.isArray(props.options) && props.options.length > 0 && props.required !== true ? <option disabled={true}></option> : null}
                {
                  Array.isArray(props.options) ? props.options.map((opt, i) => {
                    if (i === 0) {
                      return (
                        <React.Fragment key={i}>
                          {!props.hideEmptyOption && <option key={i - 1} ></option>}
                          <option key={i} name={opt} value={opt}>{opt}</option>
                        </React.Fragment>
                      );

                    }
                    return (<option key={i} name={opt} value={opt}>{opt}</option>);
                  })
                    :
                    (<option disabled={true}> No option available </option>)
                }
              </React.Fragment>
              : null
          }
        </Input>
      </div>
    </Col>
  );
}

InputField.defaultProps = {
  onFocus: function () { },
  onBlur: function () { },
  onKeyDown: function () { },
  onKeyUp: function () { },
  disabled: false
}

InputField.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  disabled: PropTypes.bool
}

export default InputField;

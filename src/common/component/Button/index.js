import React from 'react'
import Button from 'reactstrap/lib/Button';
import './button.scss';

export default (props) => {
    return (
        <Button
            color={props.buttonType}
            onClick={props.buttonClick}
            size={props.size ? props.size : 'sm'}
            className='commonButton'
            disabled={props.isDisabled}
        >
            {props.innerContent}
        </Button>
    );
};

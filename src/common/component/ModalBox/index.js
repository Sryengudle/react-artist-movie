import React from 'react'
import Modal from 'reactstrap/lib/Modal';

export default class ModalBox extends React.Component {
    render() {
        return (
            <Modal
                centered
                zIndex='1000'
                isOpen={this.props.open}
                size={this.props.size}
                backdrop={this.props.className.split(' ').indexOf('smallmodalBox') >= 0}
                toggle={this.props.onClose}
                className={this.props.className}>
                {this.props.children}
            </Modal>
        )
    }
}

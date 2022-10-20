import React from "react";
import ReactDOM from "react-dom";
const modal = document.getElementById("modal");
const body = document.body;

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        this.el.classList.add("w-full", "h-full");
    }

    componentDidMount() {
        modal.appendChild(this.el);
        modal.style.zIndex = 1;
        body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        modal.removeChild(this.el);
        modal.style.zIndex = -1;
        body.style.overflow = "unset";
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

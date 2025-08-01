import React from "react"

function ContainerContent(props) {
    
    const mediaQueryStyle = window.matchMedia("(max-width: 1025px)").matches
    ? { marginTop: "100px" }
    : {};
    return (
        <div
        style={{
        height: "86.965vh",
        width: "300%",
        marginLeft: "-80%",
        marginTop:"50px",
        fontFamily: "Ahmed",
        fontSize: ".6vw",
        ...mediaQueryStyle,
        }}
        >{props.children}</div>
    )   
}
export default ContainerContent;
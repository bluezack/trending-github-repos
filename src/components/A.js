import React from 'react'

//this an external link component

const A = (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
)

export default A;
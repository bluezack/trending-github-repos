import React from 'react'

const A = (props) => (
    <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
)

export default A;
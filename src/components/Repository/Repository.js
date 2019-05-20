import React from 'react'

export default function Repository(props) {
    const { id, name, desc } = props;
    return (
        <div>
            <h3>{name}</h3>
            <p>{desc}</p>
        </div>
    )
}

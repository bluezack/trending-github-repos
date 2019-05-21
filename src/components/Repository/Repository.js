import React from 'react'
import moment from 'moment'

import './Repository.css'

export default function Repository(props) {
    const { name, desc, owner, stars, issues, date } = props;
    return (
        <div className="Repository">
            <div className="owner-image">
                <a href={owner.url}><img src={owner.avatar} alt={owner.url} /></a>
            </div>
            <div className="content">
                <h3>{name}</h3>
                <p>{desc}</p>
                <div className="info">
                    <span>Stars: {stars}</span>
                    <span>Issues: {issues}</span>
                    <span>Submitted: <strong>{moment(date).fromNow()}</strong> By: <a href={owner.url}>{owner.name}</a></span>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import moment from 'moment'

import A from '../A'
import './Repository.css'

export default function Repository(props) {
    const { name, url, desc, owner, stars, issues, date } = props;
    return (
        <div className="Repository">
            <div className="owner-image">
                <A href={owner.url}><img src={owner.avatar} alt={owner.url} /></A>
            </div>
            <div className="content">
                <h3><A href={url} >{name}</A></h3>
                <p>{desc}</p>
                <div className="info">
                    <span>Stars: {stars}</span>
                    <span>Issues: {issues}</span>
                    <span>Submitted <strong>{moment(date).fromNow()}</strong> By <A href={owner.url}>{owner.name}</A></span>
                </div>
            </div>
        </div>
    )
}
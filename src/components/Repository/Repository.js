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
                    <div>
                        <i className="la la-star-o"></i>
                        <span>{stars}</span>
                    </div>
                    <div>
                        <i className="la la-exclamation-circle"></i>
                        <span>{issues}</span>
                    </div>
                    <div>
                        <span>Submitted</span>
                        <strong>{moment(date).fromNow()}</strong>
                        <span>By </span>
                        <A href={owner.url}>{owner.name}</A>
                    </div>
                </div>
            </div>
        </div>
    )
}
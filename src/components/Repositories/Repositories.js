import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Repository from '../Repository/Repository'
import './Repositories.css'

export class Repositories extends Component {
    state = {
        repositories: [],
        itemsPerPage: 8,
        totalPages: 0,
        scrolling: false,
        errors: []
    }

    date = moment().subtract(1, 'months').format('YYYY-MM-DD');


    componentDidMount() {
        axios.get('https://api.github.com/search/repositories', {
            params: { q: `created:>${this.date}`, sort: 'stars', order: 'desc', per_page: this.state.itemsPerPage },
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(progressEvent.lengthComputable)
                console.log(percentCompleted);
            }
        })
            .then(res => {
                const newRepositories = res.data.items.map(r => ({
                    id: r.id,
                    name: r.name,
                    desc: r.description,
                    url: r.html_url,
                    owner: { avatar: r.owner.avatar_url, url: r.owner.html_url, name: r.owner.login },
                    stars: r.watchers_count,
                    issues: r.open_issues_count,
                    date: r.created_at
                }))
                const { repositories } = this.state
                this.setState({
                    repositories: [...repositories, ...newRepositories]
                })
            })
            .catch(err => this.state.errors.push({ error: err }))
    }


    render() {
        return (
            <div className="Repositories">
                <h2>Trending Github Repositories</h2>
                <ul>
                    {this.state.errors.map(error => (<li>error</li>))}
                </ul>
                <ul>
                    {this.state.repositories.map(repo => <li key={repo.id}><Repository {...repo} /></li>)}
                </ul>
            </div>
        )
    }
}

export default Repositories

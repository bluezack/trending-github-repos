import React, { Component } from 'react'
import axios from 'axios'
import Repository from '../Repository/Repository'

export class Repositories extends Component {
    state = {
        repositories: [],
        itemsPerPage: 30,
        totalPages: 0,
        scrolling: false
    }


    componentDidMount() {
        axios.get('https://api.github.com/search/repositories', { params: { q: 'created:>2017-10-22', sort: 'stars', order: 'desc' } })
            .then(res => {
                const newRepositories = res.data.items.map(r => ({ id: r.id, name: r.name, desc: r.description }))
                const { repositories } = this.state
                this.setState({
                    repositories: [...repositories, ...newRepositories]
                })
            })
    }


    render() {
        return (
            <div>
                <h3>Repositories</h3>
                <ul>
                    {this.state.repositories.map(repo => <li key={repo.id}><Repository {...repo} /></li>)}
                </ul>
            </div>
        )
    }
}

export default Repositories

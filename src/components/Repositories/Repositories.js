import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Repository from '../Repository/Repository'
import Loading from '../Loading/Loading'
import './Repositories.css'

export class Repositories extends Component {
    state = {
        repositories: [],
        page: 1,
        totalPages: 100,
        loading: false,
        errors: [],
    }

    date = moment().subtract(1, 'months').format('YYYY-MM-DD');
    ITEMS_PER_PAGE = 8;

    componentDidMount() {
        //load data for the first time
        this.loadData();
        //Add Event Listner For Scrolling Event so Handler will load More Data if scroll reaches the end
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    //Handle user scrolling event

    handleScroll = () => {
        const { loading, totalPages, page } = this.state
        if (totalPages <= page) return //reaches the last page, no more data
        if (loading) return //already loading data
        const lastRepo = document.querySelector('.Repository:last-child') //last Repository

        const lastRepoOffset = lastRepo.offsetTop + lastRepo.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight

        if (pageOffset > lastRepoOffset) {
            this.loadData();
        }
    }


    loadData() {

        this.setState({ loading: true })//Start loading Animation

        axios.get('https://api.github.com/search/repositories', { params: { q: `created:>${this.date}`, sort: 'stars', order: 'desc', per_page: this.ITEMS_PER_PAGE, 'page': this.state.page } })
            .then(res => {

                //Extract Nedded Informations and Add it to State

                const newRepositories = res.data.items.map(r => ({
                    id: r.id,
                    name: r.name,
                    desc: r.description,
                    url: r.html_url,
                    owner: { avatar: r.owner.avatar_url, url: r.owner.html_url, name: r.owner.login },
                    stars: r.watchers_count,
                    issues: r.open_issues_count,
                    date: r.created_at,
                }))

                this.setState(prevState => ({
                    repositories: [...prevState.repositories, ...newRepositories],
                    page: prevState.page + 1,
                    errors: [],
                    loading: false
                }))
            })
            .catch(err => this.setState(prevState => ({ errors: [...prevState.errors, err.message] })))
    }


    render() {
        return (
            <div className="Repositories">
                <h2>Trending Github Repositories</h2>
                <p>The most starred Github repos that were created in the last 30 days</p>
                <TransitionGroup>
                    {this.state.repositories.map(repo => (
                        <CSSTransition key={repo.id} timeout={200} classNames="item"><Repository {...repo} /></CSSTransition>
                    ))}
                </TransitionGroup>

                {this.state.loading && <Loading />}

                {this.state.errors.map((err, i) => (<p className="error" key={i}>{err}</p>))}

            </div >
        )
    }
}

export default Repositories

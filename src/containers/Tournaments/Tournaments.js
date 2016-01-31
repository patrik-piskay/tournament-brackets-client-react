import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/object';
import { Link } from 'react-router';

import {
    fetchTournaments,
    loadTournamentDetail
} from 'actions';

import styles from './style.less';

class Tournaments extends Component {
    componentDidMount() {
        this.props.fetchTournaments();
    }

    renderTournaments(tournaments) {
        return tournaments.map((tournament, index) => {
            return (
                <li key={index}>
                    <Link to={`/tournament/${tournament.id}`} className={styles.link}>
                        {tournament.name}
                    </Link>
                </li>
            );
        });
    }

    render() {
        const ACTIVE = 'active';
        const FINISHED = 'finished';

        const activeFilter = this.props.routes[2].path === ACTIVE;
        const finishedFilter = this.props.routes[2].path === FINISHED;

        const filteredTournaments = this.props.tournaments.filter((tournament) => {
            if (activeFilter || finishedFilter) {
                return (activeFilter && !tournament.finished) || (finishedFilter && tournament.finished);
            } else {
                return true;
            }
        });

        return (
            <div className={styles.tournaments}>
                { /*TODO loader state*/ }
                <h2>{`${activeFilter && ACTIVE || finishedFilter && FINISHED}`} tournaments</h2>

                { filteredTournaments.length > 0 &&
                    <ul>
                        { this.renderTournaments(filteredTournaments) }
                    </ul>
                }

                { filteredTournaments.length === 0 &&
                    <p className={`text-center ${styles.noResultMsg}`}>
                        There are no {`${activeFilter && ACTIVE || finishedFilter && FINISHED}`} tournaments at the moment
                    </p>
                }
            </div>
        );
    }
}

Tournaments.propTypes = {
    tournaments: PropTypes.array.isRequired,
    fetchTournaments: PropTypes.func.isRequired,
    loadTournamentDetail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        tournaments: values(state.tournaments)
    };
};

export default connect(mapStateToProps, {
    fetchTournaments,
    loadTournamentDetail
})(Tournaments);
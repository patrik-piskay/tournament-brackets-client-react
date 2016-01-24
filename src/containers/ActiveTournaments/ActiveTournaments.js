import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/object';
import { Link } from 'react-router';

import {
    fetchActiveTournaments,
    loadTournamentDetail
} from 'actions';

import styles from './style.less';

class ActiveTournaments extends Component {
    componentDidMount() {
        this.props.fetchActiveTournaments();
    }

    renderTournaments() {
        return this.props.activeTournaments.map((tournament, index) => {
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
        return (
            <div>
                <ul className={styles.tournaments}>
                    { this.renderTournaments() }
                </ul>
            </div>
        );
    }
}

ActiveTournaments.propTypes = {
    activeTournaments: PropTypes.array.isRequired,
    fetchActiveTournaments: PropTypes.func.isRequired,
    loadTournamentDetail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        activeTournaments: values(state.tournaments).filter((tournament) => !tournament.finished)
    };
};

export default connect(mapStateToProps, {
    fetchActiveTournaments,
    loadTournamentDetail
})(ActiveTournaments);
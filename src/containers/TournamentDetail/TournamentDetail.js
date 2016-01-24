import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/object';
import { Link } from 'react-router';
import classnames from 'classnames';

import {
    fetchTournamentDetail
} from 'actions';
import Match from 'components/Match/Match';

import styles from './style.less';

class TournamentDetail extends Component {
    componentDidMount() {
        this.props.fetchTournamentDetail(this.props.params.id);
    }

    componentWillReceiveProps(newProps) {
        const { id, round } = newProps.params;

        if (!round) {
            this.props.history.pushState(null, `/tournament/${id}/round/${newProps.currentRound + 1}`);
        }

        if (this.props.params.id !== id) {
            this.props.fetchTournamentDetail(id);
        }
    }

    renderRoundText(round, roundCount) {
        switch (roundCount - round) {
            case 0:
                return 'Final';
            case 1:
                return 'Semi-finals';
            case 2:
                return 'Quarter-finals';
            default:
                return `${round}. round`;
        }
    }

    renderHeader(tournamentId, round) {
        const { tournaments } = this.props;
        const roundCount = this.props.rounds.length;

        return (
            <div>
                { round > 1 &&
                    <Link to={`tournament/${tournamentId}/round/${round - 1}`} className={classnames({
                        [styles['back-btn']]: true
                    }, 'btn btn-primary btn-lg')}>
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        Previous round
                    </Link>
                }

                <h2>{ tournaments[tournamentId].name } - { this.renderRoundText(round, roundCount) }</h2>

                { round < roundCount &&
                    <Link to={`tournament/${tournamentId}/round/${round + 1}`} className={classnames({
                        [styles['fwd-btn']]: true
                    }, 'btn btn-primary btn-lg')}>
                        Next round
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </Link>
                }
            </div>
        );
    }

    renderMatches(matchIds) {
        const { matches } = this.props;

        return matchIds.map((matchId, index) => {
            return (
                <li key={index}>
                    { matches[matchId].player1 && matches[matchId].player2 &&
                        <Link to={`/match/${matchId}`} className={styles.link}>
                            <Match {...matches[matchId]} />
                        </Link>
                    ||
                        <Match {...matches[matchId]} />
                    }
                </li>
            );
        });
    }

    render() {
        const { tournaments } = this.props;
        const tournamentId = parseInt(this.props.params.id, 10);
        const round = parseInt(this.props.params.round, 10);

        return tournaments[tournamentId] && this.props.rounds[round-1] ? (
            <div className={styles.tournament}>
                { this.renderHeader(tournamentId, round) }

                <ul className={styles.matches}>
                    { this.renderMatches(this.props.rounds[round-1]) }
                </ul>
            </div>
        ) : null;
    }
}

TournamentDetail.propTypes = {
    fetchTournamentDetail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        tournaments: state.tournaments,
        rounds: state.rounds.rounds,
        currentRound: state.rounds.currentRoundBeingPlayed,
        matches: state.matches
    };
};

export default connect(mapStateToProps, {
    fetchTournamentDetail
})(TournamentDetail);
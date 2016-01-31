import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
            this.props.history.replaceState(null, `/tournament/${id}/round/${newProps.currentRound + 1}`);
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
            <div className={styles.header}>
                <div className={classnames(styles.roundBtn, 'col-md-2', styles.noPadding)}>
                    { round > 1 &&
                            <Link to={`tournament/${tournamentId}/round/${round - 1}`} className="btn btn-primary btn-lg btn-block">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className={styles.roundText}>Previous round</span>
                            </Link>
                    }
                </div>

                <div className={classnames(styles.tournamentName, 'col-md-8')}>
                    <h2>{ tournaments[tournamentId].name } - { this.renderRoundText(round, roundCount) }</h2>
                </div>

                <div className={classnames(styles.roundBtn, 'col-md-2', styles.noPadding)}>
                    { round < roundCount &&
                        <Link to={`tournament/${tournamentId}/round/${round + 1}`} className="btn btn-primary btn-lg btn-block">
                            <span className={styles.roundText}>Next round</span>
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </Link>
                    }
                </div>
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
            <div className={styles.tournamentDetail}>
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
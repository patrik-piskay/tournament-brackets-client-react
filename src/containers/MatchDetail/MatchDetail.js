import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import {
    fetchMatchDetail,
    toggleSetScoreFormVisibility,
    setScore
} from 'actions';

import styles from './style.less';

const format = (date) => {
    return moment(date).format('DD.MM.YYYY, HH:mm');
};

class MatchDetail extends Component {
    componentDidMount() {
        const { id } = this.props.params;

        if (!this.props.matches[id]) {
            this.props.fetchMatchDetail(id);
        }
    }

    handleSetScore() {
        const matchId = this.props.params.id;
        const player1Score = this.refs.player1Score.value;
        const player2Score = this.refs.player2Score.value;

        this.props.setScore(matchId, player1Score, player2Score);
    }

    render() {
        const matchId = this.props.params.id;
        const match = this.props.matches[matchId];
        const { setScoreFormVisible } = this.props.matchDetail;

        return match ? (
            <div className={styles['match-detail']}>
                <h2>{match.player1} <span className={styles.vs}>vs</span> {match.player2}</h2>

                { !match.played_at &&
                    <div>
                        <div className={styles.info}>
                            Not played yet
                        </div>

                        <div className={classnames({
                            [styles.setScore]: true,
                            [styles.visible]: setScoreFormVisible
                        })}>
                            { this.props.matchDetail.error &&
                                <div className={styles.error + ' alert alert-danger'}>{this.props.matchDetail.error}</div>
                            }

                            <span className={styles.name}>{match.player1}</span>
                            <input ref="player1Score" type="number" min="0" defaultValue="0" className={styles.scoreInput} />
                            <span className={styles.separator}>:</span>
                            <input ref="player2Score" type="number" min="0" defaultValue="0" className={styles.scoreInput} />
                            <span className={styles.name}>{match.player2}</span>

                            <div>
                                <button
                                    onClick={this.props.toggleSetScoreFormVisibility}
                                    className="btn btn-danger btn-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={this.handleSetScore.bind(this)}
                                    className="btn btn-success btn-lg"
                                >
                                    Set score
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={this.props.toggleSetScoreFormVisibility}
                            className={classnames({
                                'btn btn-primary btn-lg': true,
                                [styles.hidden]: setScoreFormVisible
                            })}
                        >
                            Set score
                        </button>
                    </div>
                }

                { match.played_at &&
                    <div>
                        <div className={styles.score}>
                            {match.player1_score}
                            <span className={styles.separator}>:</span>
                            {match.player2_score}
                        </div>
                        <div className={styles.info}>Played at: { format(match.played_at) }</div>
                    </div>
                }
            </div>
        ) : null;
    }
}

MatchDetail.propTypes = {
    fetchMatchDetail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        matches: state.matches,
        matchDetail: state.matchDetail
    };
};

export default connect(mapStateToProps, {
    fetchMatchDetail,
    toggleSetScoreFormVisibility,
    setScore
})(MatchDetail);
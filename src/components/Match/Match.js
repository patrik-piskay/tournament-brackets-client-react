import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './style.less';

const renderScore = (score) => {
    if (score === null) {
        return '-';
    } else {
        return score;
    }
};

const Match = (props) => {
    const played = !!props.played_at;
    const winner = props.player1_score > props.player2_score ? props.player1 : props.player2;

    return (
        <div>
            <div className={classnames({
                [styles.player]: true,
                [styles.winner]: played && winner === props.player1,
                [styles.loser]: played && winner !== props.player1
            })}>
                <div className={classnames({
                    [styles.name]: true,
                    [styles['not-assigned']]: !props.player1
                })}>{ props.player1 || '-' }</div>
                <div className={styles.score}>{ renderScore(props.player1_score) }</div>
            </div>

            <div className={styles.separator}>
                <div className={styles.name}>vs</div>
                <div className={styles.score}>:</div>
            </div>

            <div className={classnames({
                [styles.player]: true,
                [styles.winner]: played && winner === props.player2,
                [styles.loser]: played && winner !== props.player2
            })}>
                <div className={classnames({
                    [styles.name]: true,
                    [styles['not-assigned']]: !props.player2
                })}>{ props.player2 || '-' }</div>
                <div className={styles.score}>{ renderScore(props.player2_score) }</div>
            </div>
        </div>
    );
};

Match.propTypes = {
    id: PropTypes.string.isRequired,
    player1: PropTypes.string,
    player2: PropTypes.string,
    player1_score: PropTypes.number,
    player2_score: PropTypes.number,
    next_round_id: PropTypes.string,
    played_at: PropTypes.string
};

export default Match;
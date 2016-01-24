import React from 'react';

import { Router, Route, IndexRedirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import ActiveTournaments from 'containers/ActiveTournaments/ActiveTournaments';
// import FinishedTournaments from 'containers/FinishedTournaments/FinishedTournaments';
import TournamentDetail from 'containers/TournamentDetail/TournamentDetail';
import MatchDetail from 'containers/MatchDetail/MatchDetail';

import styles from './style.less';

const history = createHistory({
    queryKey: false
});

const TournamentBrackets = (props) => {
    return (
        <div className={styles.root}>
            <h1>Tournament brackets</h1>
            <div>
                { props.children }
            </div>
        </div>
    );
};

const routes = () => { // eslint-disable-line react/no-multi-comp
    return (
        <Router history={history} >
            <Route path="/" component={TournamentBrackets}>
                <IndexRedirect to="tournaments" />

                <Route path="tournaments" component={ActiveTournaments}>
                    <IndexRedirect to="active" />
                    <Route path="active" component={ActiveTournaments} />
                </Route>

                <Route path="tournament/:id" component={TournamentDetail}>
                    <Route path="round/:round" component={TournamentDetail} />
                </Route>

                <Route path="match/:id" component={MatchDetail} />
            </Route>
        </Router>
    );
};

export default routes;
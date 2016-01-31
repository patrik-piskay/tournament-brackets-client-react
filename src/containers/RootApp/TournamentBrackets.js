import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import { slide as BurgerMenu } from 'react-burger-menu';

import history from 'utils/history';
import Menu from 'components/Menu/Menu';
import Tournaments from 'containers/Tournaments/Tournaments';
import TournamentDetail from 'containers/TournamentDetail/TournamentDetail';
import MatchDetail from 'containers/MatchDetail/MatchDetail';
import CreateTournament from 'containers/CreateTournament/CreateTournament';
import ErrorComponent from 'containers/Error/Error';

import styles from './style.less';

const TournamentBrackets = (props) => {
    return (
        <div>
            <BurgerMenu>
                <Menu />
            </BurgerMenu>
            <div className={styles.root}>
                <div>
                    <ErrorComponent />
                    { props.children }
                </div>
            </div>
        </div>
    );
};

const routes = () => { // eslint-disable-line react/no-multi-comp
    return (
        <Router history={history} >
            <Route path="/" component={TournamentBrackets}>
                <IndexRedirect to="tournaments" />

                <Route path="tournaments/new" component={CreateTournament} />

                <Route path="tournaments" component={Tournaments}>
                    <IndexRedirect to="active" />
                    <Route path="all" component={Tournaments} />
                    <Route path="active" component={Tournaments} />
                    <Route path="finished" component={Tournaments} />
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
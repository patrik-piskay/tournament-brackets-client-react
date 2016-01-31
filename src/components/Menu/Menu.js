import React, { Component } from 'react';

import { Link } from 'react-router';
import classnames from 'classnames';

import styles from './style.less';

export default class Menu extends Component {
    constructor() {
        super();

        this.state = {
            tournamentsCollapsed: true
        };
    }

    handleClick(e) {
        e.preventDefault();

        this.setState({
            tournamentsCollapsed: !this.state.tournamentsCollapsed
        });
    }

    render() {
        return (
            <div>
                <div className={styles.item}>
                    <Link to="/tournaments/new" className={styles.menuLink}>
                        <span className="glyphicon glyphicon-plus"></span>
                        New tournament
                    </Link>
                </div>
                <div className={styles.item}>
                    <Link to="/tournaments/active" className={styles.menuLink}>
                        <span className="glyphicon glyphicon-th-list"></span>
                        Tournament list

                        <div className={styles.collapsible} onClick={this.handleClick.bind(this)}>
                            <span className={classnames({
                                [styles.triangle]: true,
                                [styles.triangleCollapsed]: !this.state.tournamentsCollapsed,
                                [styles.triangleExpanded]: this.state.tournamentsCollapsed
                            })}></span>
                        </div>
                    </Link>
                    <div className={classnames({
                        [styles.sublinks]: true,
                        [styles.hidden]: this.state.tournamentsCollapsed,
                        [styles.shown]: !this.state.tournamentsCollapsed
                    })}>
                        <Link to="/tournaments/all" className={styles.menuLink}>
                            All
                        </Link>
                        <Link to="/tournaments/active" className={styles.menuLink}>
                            Active
                        </Link>
                        <Link to="/tournaments/finished" className={styles.menuLink}>
                            Finished
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

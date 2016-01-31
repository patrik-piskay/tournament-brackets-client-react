import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import {
    changeValue,
    createNewTournament
} from 'actions';

import styles from './style.less';

class CreateTournament extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameError: false,
            playersError: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = this.refs.name.value;
        const players = this.refs.players.value;

        this.props.createNewTournament(name, players);
    }

    handleInputChange(field, event) {
        const value = event.target.value;

        this.props.changeValue(field, value);
    }

    render() {
        return (
            <div className={styles.newTournament}>
                <h2>Create new tournament</h2>
                <form className="form-horizontal">
                    <div className={classnames({
                        'form-group form-group-lg': true,
                        'has-error' : this.props.form.errors.name
                    })}>
                        <label htmlFor="name" className="col-lg-4 control-label">Name</label>
                        <div className="col-lg-2">
                            <input
                                ref="name"
                                onChange={this.handleInputChange.bind(this, 'name')}
                                value={this.props.form.name}
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Tournament name" />
                        </div>
                    </div>
                    <div className={classnames({
                        'form-group form-group-lg': true,
                        'has-error' : this.props.form.errors.players
                    })}>
                        <label htmlFor="players" className="col-lg-4 control-label">Players</label>
                        <div className="col-lg-4">
                            <textarea
                                ref="players"
                                onChange={this.handleInputChange.bind(this, 'players')}
                                value={this.props.form.players}
                                className="form-control"
                                rows="3"
                                id="players"
                                placeholder="comma separated list of players goes here..."
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="form-group form-group-lg">
                        <div className="col-lg-2 col-lg-offset-4">
                            <Link to="/" className={`${styles.submitBtn} btn btn-danger btn-lg btn-block`}>Cancel</Link>
                        </div>
                        <div className="col-lg-2">
                            <button onClick={this.handleSubmit.bind(this)} className={`${styles.submitBtn} btn btn-success btn-lg btn-block`}>
                                Create new tournament
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

CreateTournament.propTypes = {
    changeValue: PropTypes.func.isRequired,
    createNewTournament: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        form: state.newTournament
    };
};

export default connect(mapStateToProps, {
    changeValue,
    createNewTournament
})(CreateTournament);
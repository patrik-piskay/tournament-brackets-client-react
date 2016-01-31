import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './style.less';

class Error extends Component {
    render() {
        const { error } = this.props;
        return error ? (
            <div className={styles.error}>
                <div className="alert alert-danger"><strong>Ups!</strong> {error}</div>
            </div>
        ) : null;
    }
}

Error.propTypes = {
    error: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps)(Error);
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PropTypes } from 'prop-types';

// export default class PrivateHeader extends Component {
//     constructor(props) {
//         super(props);
//         this.logout = this.logout.bind(this);
//     }

//     logout() {
//         Accounts.logout();
//         //this.props.history.push('/');
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <button type="button" onClick={this.logout}>Logout</button>
//             </div>
//         );
//     }
// }

const PrivateHeader = (props) => {
    return (
        <div className="private-header">
            <div className="private-header__content">
                <h1 className="private-header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

//to use proptypes in statless functional components, export at the bottom
export default PrivateHeader;
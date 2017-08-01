import React, { Component } from 'react';

import LinksList from './linkslist';
import PrivateHeader from './privateheader';
import AddLink from './addlink';
import LinksListFilter from './linkslistfilter';

//statless functional component
export default Link = () => {
    return (
        <div>
            <PrivateHeader title="My links" />
            <div className="page-content">
                <LinksListFilter />
                <AddLink />
                <LinksList />
            </div>
        </div>
    );
}

// export default class Link extends Component {
//     render() {
//         return (
//             <div>
//                 <PrivateHeader title="My links" />
//                 <LinksList />
//                 <AddLink/>
//             </div>
//         );
//     }
// }
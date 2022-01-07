import * as React from 'react';
import {useLocation} from 'react-router-dom';

export default function Profile() {
    const location = useLocation();

    return (
        <div>Welcome {location.state.username}!</div>
    );
}
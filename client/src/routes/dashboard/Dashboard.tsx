import React, { PureComponent } from 'react';
import DashboardPage from '../../components/dashboard/DashboardPage'
import ProtectedRoute  from '../../components/protectedRoute/ProtectedRoute';

interface Props {
    location: any
}

class Dashboard extends PureComponent<Props> {
    render() {
        const{ location } = this.props;
        return (
            <ProtectedRoute redirectTo='/' location={location} Component={DashboardPage}/>
        )
    }
}

export default Dashboard;
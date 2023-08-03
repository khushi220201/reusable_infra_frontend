import UsersTable from 'components/settings/User';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clearRedux as clearReduxUser } from 'redux/slice/userSlice';


export default function Users() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(clearReduxUser());

    }, []);

    // JSX
    return (
        <div>
            <UsersTable />
        </div>
    );
}

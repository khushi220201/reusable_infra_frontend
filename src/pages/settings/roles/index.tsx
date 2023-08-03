import RoleTable from 'components/settings/Role';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clearRedux as clearReduxRole } from 'redux/slice/roleTableSlice';



export default function Roles() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(clearReduxRole());

    }, []);

    // JSX
    return (
        <div>
           <RoleTable />
        </div>
    );
}

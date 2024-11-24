import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getBackendUrl } from "./constants";

export const MyContext = createContext()

const AppContextProvider = (props) => {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState('');
    const [departments, setDepartments] = useState([])
    const [companyDataSeed, setCompanyDataSeed] = useState(1)
    const [departmentDataSeed, setDepartmentDataSeed] = useState(1)
    const [users, setUsers] = useState([])
    const [userDataSeed, setUserDataSeed] = useState(1)

    //get company
    useEffect(() => {
        console.log("fetching company")
        axios.get(`${getBackendUrl()}` + 'api/company/')
            .then(function (response) {
                setCompanyData(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [companyDataSeed])

    //get departments
    useEffect(() => {
        console.log("fetching departments")
        if (localStorage.getItem('token')) {
            axios.get(`${getBackendUrl()}` + 'api/departments/', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            }).then(function (response) {
                setDepartments(response.data)
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [departmentDataSeed])

    //get users
    useEffect(() => {
        console.log("fetching users")
        if (localStorage.getItem('token')) {
            axios.get(`${getBackendUrl()}` + 'api/users/', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            }).then(function (response) {
                setUsers(response.data)
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [userDataSeed])

    const value = {
        companyData, setCompanyData, companyData, setCompanyDataSeed, loading, setLoading, departments, setDepartments,
        users,setUsers,userDataSeed,setUserDataSeed
    }

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    )
}

export default AppContextProvider

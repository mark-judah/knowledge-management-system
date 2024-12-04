import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getBackendUrl } from "./constants";
import { useLocation } from "react-router-dom";

export const MyContext = createContext()

const AppContextProvider = (props) => {
    const [loading, setLoading] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const [companyDataSeed, setCompanyDataSeed] = useState(1)
    const [departments, setDepartments] = useState([])
    const [departmentDataSeed, setDepartmentDataSeed] = useState(1)
    const [users, setUsers] = useState([])
    const [userDataSeed, setUserDataSeed] = useState(1)
    const [articles, setArticles] = useState([])
    const [articleDataSeed, setArticleDataSeed] = useState(1)
    const [faqs, setFaqs] = useState([])
    const [faqsDataSeed, setFaqsDataSeed] = useState(1)
    const location = useLocation();
    console.log(location.pathname)
    //get company
    useEffect(() => {
        console.log("fetching company")
        axios.get(`${getBackendUrl()}` + 'api/company/', {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).then(function (response) {
            setCompanyData(response.data)
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            if (error.response.status == 401 && location.pathname != '/login') {
                console.log('logging out')
                logout()
            }
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
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    logout()
                }
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
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    logout()
                }
            })
        }
    }, [userDataSeed])

    //get articles
    useEffect(() => {
        console.log("fetching articles")
        if (localStorage.getItem('token')) {
            axios.get(`${getBackendUrl()}` + 'api/articles/', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            }).then(function (response) {
                setArticles(response.data)
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    logout()
                }
            })
        }
    }, [articleDataSeed])

    //get faqs
    useEffect(() => {
        console.log("fetching faqs")
        if (localStorage.getItem('token')) {
            axios.get(`${getBackendUrl()}` + 'api/faqs/', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
            }).then(function (response) {
                setFaqs(response.data)
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                if (error.response.status == 401 && location.pathname != '/login') {
                    console.log('logging out')
                    logout()
                }
            })
        }
    }, [faqsDataSeed])

    
    const logout = () => {
        localStorage.removeItem("token");
        window.location.replace('/login')
    }

    const value = {
        logout,
        companyData, setCompanyData, companyData, setCompanyDataSeed, loading, setLoading,
        departments, setDepartments, departmentDataSeed, setDepartmentDataSeed, users, setUsers,
        userDataSeed, setUserDataSeed, articles, setArticles, articleDataSeed, setArticleDataSeed, 
        faqs, setFaqs, faqsDataSeed, setFaqsDataSeed
    }

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    )
}

export default AppContextProvider

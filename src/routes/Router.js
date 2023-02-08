import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import Home from '../pages/Home';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignupForm';
import CompanySearchPage from '../pages/CompanySearchPage';
import CompanyDetailPage from '../pages/CompanyDetailPage';
import JobSearchPage from '../pages/JobSearchPage';
import UserProfileForm from '../pages/UserProfileForm';
import NotFound from '../pages/NotFound';
import Protected from './Protected';

const Router = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <Routes>
            {/* UNPROTECTED ROUTES */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />

            {/* PROTECTED ROUTES */}
            <Route path='/companies' element={
                <Protected currentUser={currentUser} >
                    <CompanySearchPage />
                </Protected>}>
            </Route>

            <Route path='/companies/:handle' element={
                <Protected currentUser={currentUser} >
                    <CompanyDetailPage />
                </Protected>}>
            </Route>

            <Route path='/jobs' element={
                <Protected currentUser={currentUser} >
                    <JobSearchPage />
                </Protected>}>
            </Route>

            <Route path='/profile' element={
                <Protected currentUser={currentUser} >
                    <UserProfileForm />
                </Protected>}>
            </Route>
            
            {/* NOT FOUND */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Router;
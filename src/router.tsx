import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/Auth/LoginView'
import RegisterView from './views/Auth/RegisterView'
import ConfirmAccountView from './views/Auth/ConfirmAccountView'
import RequestNewCodeView from './views/Auth/RequestNewCodeView'
import ForgotPasswordView from './views/Auth/ForgotPasswordView'
import NewPasswordView from './views/Auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/404/NotFound'

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>

                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />} />
                    <Route path='/projects/:projectId' element={<ProjectDetailsView />} />
                    <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/update-password' element={<ChangePasswordView />} />
                    </Route>

                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />}></Route>
                    <Route path='/auth/register' element={<RegisterView />}></Route>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />}></Route>
                    <Route path='/auth/request-code' element={<RequestNewCodeView />}></Route>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />}></Route>
                    <Route path='/auth/new-password' element={<NewPasswordView />}></Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
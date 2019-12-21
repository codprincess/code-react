import React, { Component } from 'react'
import {HashRouter,Redirect,Route,Switch} from 'react-router-dom'
import App from '../App'
import Admin from '../pages/admin/Admin'
import Home from '../pages/home/Home'
import Buttons from '../pages/general/buttons'
import Icons from '../pages/general/Icons'
import Loadings from '../pages/general/loadings'
import Modals from '../pages/general/modals'
import Notifications from '../pages/general/notifications'
import TabsR from '../pages/general/tabs'
import Carousels from '../pages/general/carousels'
import Editors from '../pages/general/editor'
import Messages from '../pages/general/messages'
import Drag from '../pages/general/draggable'
import BasicTable from '../pages/basictable/BasicTable'
import HighTable from '../pages/basictable/highTable'
import Register from '../pages/form/register'
import Logins from '../pages/form/login'
import StepForm from '../pages/form/stepForm'
import TestForm from '../pages/form/testForm'
import User from '../pages/user/user'
import User2 from '../pages/user/user2'
import City from '../pages/city/city'
import Order from '../pages/order'
import Permission from '../pages/permission'
class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App></App>
                <Switch>
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path="/general/buttons" component={Buttons}></Route>
                                <Route path="/general/Icons" component={Icons}></Route>
                                <Route path="/general/loadings" component={Loadings}></Route>
                                <Route path="/general/modals" component={Modals}></Route>
                                <Route path="/general/notifications" component={Notifications}></Route>
                                <Route path="/general/tabs" component={TabsR}></Route>
                                <Route path="/general/carousels" component={Carousels}></Route>
                                <Route path="/general/editor" component={Editors}></Route>
                                <Route path="/general/messages" component={Messages}></Route>
                                <Route path="/general/draggable" component={Drag}></Route>
                                <Route path="/basictable/BasicTable" component={BasicTable}></Route>
                                <Route path="/basictable/highTable" component={HighTable}></Route>
                                <Route path="/form/register" component={Register}></Route>
                                <Route path="/form/login" component={Logins}></Route>
                                <Route path="/form/stepForm" component={StepForm}></Route>
                                <Route path="/form/testForm" component={TestForm}></Route>
                                <Route path="/user/user" component={User}></Route>
                                <Route path="/user/user2" component={User2}></Route>
                                <Route path="/city/city" component={City}></Route>
                                <Route path="/order/index" component={Order}></Route>
                                <Route path="/permission/index" component={Permission}></Route>
                                <Redirect to="/home" />
                            </Switch>
                        </Admin>
                    }></Route>
                </Switch>
            </HashRouter>
        )
    }
}

export default IRouter

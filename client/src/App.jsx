import React from 'react'
import './app.css'
import AddLead from './pages/AddLead/AddLead'
import LeadList from './pages/LeadList/LeadList'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import EditLead from './pages/EditLead/EditLead'
import LeadsDashboard from './pages/Leads_Dashboard/LeadsDashboard'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/add' element={<AddLead/>} />
          <Route path='/list' element= {<LeadList/>} />
          <Route path='/update/:id' element={<EditLead/>} />
          <Route path='/' element={<LeadsDashboard/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

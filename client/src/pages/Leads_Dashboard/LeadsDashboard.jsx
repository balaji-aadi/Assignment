import React, { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';
import '../Leads_Dashboard/dashboard.css'
import axios from 'axios'
import LeadCards from './LeadCards';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'


const LeadsDashboard = () => {
  const [data, setData] = useState([])
  const [qualifiedLeads, setQualifiedLeads] = useState([])
  const [proposalLeads, setProposalLeads] = useState([])
  const [wonLeads,setWonLeads] = useState([])
  const [lostLeads,setLostLeads] = useState([])

  let add,
        NewLead = data,
        qualified = qualifiedLeads,
        proposal = proposalLeads,
        won = wonLeads,
        lost = lostLeads;


  useEffect(() => {
    const dashboardData = async () => {
      const new_lead= await axios.get('http://localhost:5000')
      const qualified_lead = await axios.get('http://localhost:5000/getqualified')
      const proposal_lead = await axios.get('http://localhost:5000/getproposal')
      const won_lead = await axios.get('http://localhost:5000/getwon')
      const lost_lead = await axios.get('http://localhost:5000/getlost')

      setData(new_lead.data);
      setQualifiedLeads(qualified_lead.data)
      setProposalLeads(proposal_lead.data)
      setWonLeads(won_lead.data)
      setLostLeads(lost_lead.data)
    }
    dashboardData()
  }, [])




  const deleteDataNew = async(id) => {
    await axios.delete(`http://localhost:5000/new/${id}`,{withCredentials:true})
  }

  const deleteDataProposal = async(id) => {
    await axios.delete(`http://localhost:5000/proposal/${id}`,{withCredentials:true})
  }

  const deleteDataQualified = async(id) => {
    await axios.delete(`http://localhost:5000/qualified/${id}`,{withCredentials:true})
  }

  const deleteDataWon = async(id) => {
    await axios.delete(`http://localhost:5000/won/${id}`,{withCredentials:true})
  }


  const deleteDataLost = async(id) => {
    await axios.delete(`http://localhost:5000/lost/${id}`,{withCredentials:true})
  }


  const insertDataNew = async(add) => {
    await axios.post('http://localhost:5000/createLead',add)
  }

  const insertDataProposal = async(add) => {
    await axios.post('http://localhost:5000/proposalLead',add)
  }

  const insertDataQualified = async(add) => {
    await axios.post('http://localhost:5000/qualifiedLead',add)
  }

  const insertDataWon = async(add) => {
    await axios.post('http://localhost:5000/wonLead',add)
  }

  const insertDataLost = async(add) => {
    await axios.post('http://localhost:5000/lostLead',add)
  }

  const onDragEnd = (result) => {
    // console.log(result)
    

    const {source,destination} = result;
    // console.log(source)
    // console.log(destination)
    // source -> data ko uthya
    // destination -> data ko dala

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    


//   source data is added in add variable and remove from the state

    if(source.droppableId === 'newLeads'){
      console.log(NewLead[source.index])
      add = NewLead[source.index];
      // Getting the id 
      // console.log(NewLead[source.index]._id)
      const id = NewLead[source.index]._id
      deleteDataNew(id)
      NewLead.splice(source.index, 1);
    }

    else if(source.droppableId === 'proposalLeads'){
      add = proposal[source.index];
      const id = proposal[source.index]._id
      deleteDataProposal(id)
      proposal.splice(source.index, 1)
    }

    else if(source.droppableId === 'wonLeads'){
      add = won[source.index];
      const id = won[source.index]._id
      deleteDataWon(id)
      won.splice(source.index, 1)
    }

    else if(source.droppableId === 'lostLeads'){
      add = lost[source.index];
      const id = lost[source.index]._id
      deleteDataLost(id)
      lost.splice(source.index, 1)
    }

    else{
      add = qualified[source.index];
      const id = qualified[source.index]._id
      deleteDataQualified(id)
      qualified.splice(source.index, 1);
    }

// Adding the data in the state 

    if(destination.droppableId === 'newLeads'){
      insertDataNew(add)
      NewLead.splice(destination.index,0,add);
    }
    else if(destination.droppableId === 'proposalLeads'){
      insertDataProposal(add)
      proposal.splice(destination.index,0,add);
    }
    else if(destination.droppableId === 'wonLeads'){
      insertDataWon(add)
      won.splice(destination.index,0,add);
    }
    else if(destination.droppableId === 'lostLeads'){
      insertDataLost(add)
      lost.splice(destination.index,0,add);
    }
    else{
      insertDataQualified(add)
      qualified.splice(destination.index,0,add);
    }

    setQualifiedLeads(qualified)
    setData(NewLead)
    setProposalLeads(proposal)
    setWonLeads(won)
    setLostLeads(lost)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='dashboard_container'>
        <div className='leadlist_heading'>
          <div className='leadlist_headingLeft'>
            <h1>Leads</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dignissimos.</p>
          </div>
          <div className='leadlist_headingRight'>
            <Link to={'/list'}><ListAltIcon className='leadlist_icon' /></Link>
            <AddRoundedIcon className='dashboard_plus' />
            <Link to={'/add'}><button className='leadlist_btn'>Add Leads</button></Link>
          </div>
        </div>

        <div className='cards_container'>

          <Droppable droppableId='newLeads'>
            {
              (provided) => (
                <div className='card2' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='dashboard_headings'>
                    <h4>New</h4>
                    <p>AED 308,805.00</p>
                    <Link to={'/add'}><AddRoundedIcon style={{ fontSize: "1rem", cursor: "pointer", marginTop: '2px' }} /></Link>
                  </div>
                  {
                    data.map((leads,index) => (
                      <LeadCards leads={leads} index= {index} />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>

          <Droppable droppableId='qualifiedLeads'>
            {
              (provided) => (
                <div className='card2' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='dashboard_headings'>
                    <h4>Qualified</h4>
                    <p>AED 308,805.00</p>
                    <Link to={'/add'}><AddRoundedIcon style={{ fontSize: "1rem", cursor: "pointer", marginTop: '2px' }} /></Link>
                  </div>
                  {
                    qualifiedLeads.map((leads,index) => (
                      <LeadCards leads={leads} index= {index} />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>

          <Droppable droppableId='proposalLeads'>
            {
              (provided) => (
                <div className='card2' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='dashboard_headings'>
                    <h4>Proposal</h4>
                    <p>AED 308,805.00</p>
                    <Link to={'/add'}><AddRoundedIcon style={{ fontSize: "1rem", cursor: "pointer", marginTop: '2px' }} /></Link>
                  </div>
                  {
                    proposalLeads.map((leads,index) => (
                      <LeadCards leads={leads} index= {index} />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>

          <Droppable droppableId='wonLeads'>
            {
              (provided) => (
                <div className='card2' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='dashboard_headings'>
                    <h4>Won</h4>
                    <p>AED 308,805.00</p>
                    <Link to={'/add'}><AddRoundedIcon style={{ fontSize: "1rem", cursor: "pointer", marginTop: '2px' }} /></Link>
                  </div>
                  {
                    wonLeads.map((leads,index) => (
                      <LeadCards leads={leads} index= {index} />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>

          <Droppable droppableId='lostLeads'>
            {
              (provided) => (
                <div className='card2' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='dashboard_headings'>
                    <h4>Lost</h4>
                    <p>AED 308,805.00</p>
                    <Link to={'/add'}><AddRoundedIcon style={{ fontSize: "1rem", cursor: "pointer", marginTop: '2px' }} /></Link>
                  </div>
                  {
                    lostLeads.map((leads,index) => (
                      <LeadCards leads={leads} index= {index} />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }

          </Droppable>

        </div>

      </div>
    </DragDropContext>
  )
}

export default LeadsDashboard

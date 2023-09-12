import React, { useEffect, useState } from 'react'
import '../AddLead/addLead.css'
import { Country } from 'country-state-city'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddLead = () => {

    const [countryCode, setCountryCode] = useState([])
    const navigate = useNavigate()
    const [leadsData, setLeadsData] = useState({
        organization : "",
        opportunity : "",
        email: "",
        countryCode: "",
        phonenumber: "",
        team: "",
        type: "",
        product: "",
        date: "",
        countryName: "",
        revenue: "",
        ratings: ""

    })

    const changeHandle = (e) => {
        setLeadsData({
            ...leadsData, [e.target.name]: e.target.value
        })
    }



    useEffect(() => {
        setCountryCode(Country.getAllCountries());
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/createLead',leadsData)
        navigate('/')
    }

    return (
        <div className='addlead_container'>
            <div className='top_heading'>
                <h3>Add Lead</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rerum vitae odio accusamus. </p>
            </div>
            <hr />
            <form className='addlead_form' onSubmit={handleSubmit}>
                <div className='addlead1_details'>
                    <div className='addlead1_heading'>
                        <h4>Lead Pipeline</h4>
                        <p>This will be displayed on Lead</p>
                    </div>
                    <div className='addlead1_input'>
                        <label htmlFor="input1">Organization/Contact</label>
                        <select id="input1" name='organization' onChange={changeHandle}>
                            <option>Select</option>
                            <option>JK's Opportunity</option>
                            <option>Neon Textile Opportunity</option>
                        </select>
                        <label htmlFor="">Opportunity</label>
                        <input type="text" placeholder='e.g. Product Pricing' name='opportunity' onChange={changeHandle} />
                    </div>
                </div>

                <hr />

                <div className='addlead1_details'>
                    <div className='addlead1_heading'>
                        <h4>Details</h4>
                        <p>Add Contact details for lead Pipeline</p>
                    </div>
                    <div className='addlead2_input'>
                        <label htmlFor="input2">Email</label>
                        <input type="email" placeholder='Email' name='email' onChange={changeHandle}/>


                        <label htmlFor="">Phone Number</label>
                        <div className='country_select'>
                            <select onChange={changeHandle} name='countryCode'>
                                {
                                    countryCode.map((code, index) => {
                                        return (
                                            <>
                                            <option key={index}>{code.phonecode}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" placeholder='7898251171' name='phonenumber' onChange={changeHandle}/>
                        </div>
                    </div>
                </div>


                <hr />


                <div className='addlead1_details'>
                    <div className='addlead1_heading'>
                        <h4>Setup Lead</h4>
                    </div>
                    <div className='addlead1_input'>
                        <label htmlFor="input1">Select Team</label>
                        <select id="input1" name='team' onChange={changeHandle}>
                            <option>Select</option>
                            <option>Team A</option>
                            <option>Team B</option>
                            <option>Team C</option>
                        </select>
                        <label htmlFor="input1">Lead Type</label>
                        <select id="input1" name='type' onChange={changeHandle}>
                            <option>Select</option>
                            <option>New</option>
                            <option>Qualified</option>
                            <option>Proposal</option>
                            <option>Won</option>
                            <option>Lost</option>
                        </select>
                        <label htmlFor="">Product</label>
                        <input type="text" placeholder='Add Products' name='product' onChange={changeHandle}/>
                        <label htmlFor="">Expect Revenue</label>
                        <div className='country_select'>
                            <select onChange={changeHandle} name='countryName'>
                                {
                                    countryCode.map((item, index) => {
                                        return (
                                            <option key={index}>{item.isoCode} </option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" placeholder='0.00' name='revenue' onChange={changeHandle}/>
                        </div>


                        <label htmlFor="">Due date</label>
                        <input type="date" placeholder='dd-mm-yyyy' name='date' onChange={changeHandle}/>

                        <label htmlFor="input1">Rating</label>
                        <select id="input1" name='ratings' onChange={changeHandle}>
                            <option>select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                <div className='btns'>
                    <Link to={'/'}><button className='addlead_btn1'>Cancel</button></Link>
                    <button className='addlead_btn2'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddLead

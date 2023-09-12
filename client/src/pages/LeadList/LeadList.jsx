import React, { useEffect, useState } from 'react'
import '../LeadList/leadlist.css'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { BiEdit } from 'react-icons/bi'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LeadList = () => {
    const [search, setSearch] = useState("")
    const keys = ["opportunity", "team", "organization", "email", "type"]
    const [leadsData, setLeadsData] = useState([])
    // const [qualifiedLeads, setQualifiedLeads] = useState([])

    useEffect(() => {
        // const getLeadsData = async() => {
        //    const res = await axios.get('http://localhost:5000')
        // //    const qualified_lead = await axios.get('http://localhost:5000/getqualified')
        //    setLeadsData(res.data);
        // //    setLeadsData(qualified_lead.data)
        // }
        // getLeadsData()

        const urls = [
            "http://localhost:5000",
            "http://localhost:5000/getqualified",
            "http://localhost:5000/getproposal",
            "http://localhost:5000/getwon",
            "http://localhost:5000/getlost"
        ];

        

        function multipleApiCall() {

            const promises = urls.map(url => axios.get(url));

            Promise.all(promises).then(responses => {
                let data = [];

                responses.forEach(response => {
                    data = data.concat(response.data);
                });

                setLeadsData(data);
            });
        }
        multipleApiCall()
    }, [])



    const handleClick = async (id) => {
        const deleteUrls = [
            `http://localhost:5000/new/${id}`,
            `http://localhost:5000/proposal/${id}`,
            `http://localhost:5000/qualified/${id}`,
            `http://localhost:5000/won/${id}`,
            `http://localhost:5000/lost/${id}`
        ];
        // await axios.delete(`http://localhost:5000/new/${id}`, { withCredentials: true })
        // setLeadsData(leadsData.filter(item => item._id !== id))
        const promises = deleteUrls.map(url => axios.delete(url));
        Promise.all(promises).then(res => {
            setLeadsData(leadsData.filter(item => item._id !== id))
        })
        
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'opportunity', headerName: 'Opportunity Lead', width: 150 },
        { field: 'team', headerName: 'Team', width: 130 },
        { field: 'organization', headerName: 'Contact name', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 200,
        },

        { field: 'phonenumber', headerName: 'Phone', width: 130 },
        { field: 'revenue', headerName: 'Expected Revenue', width: 150 },
        { field: 'type', headerName: 'Stages', width: 130 },
        {
            field: 'action', headerName: 'Actions', width: 130, renderCell: (params) => {
                return (
                    <>
                        <Link to={'/update/' + params.row._id}><BiEdit className="userListEdit" /></Link>
                        <DeleteOutlinedIcon className="userListDelete" onClick={() => handleClick(params.row._id)} />

                    </>

                )
            }
        },

    ];


    return (
        <div className='leadlist_container'>
            <div className='leadlist_heading'>
                <div className='leadlist_headingLeft'>
                    <h2>Lead List</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dignissimos.</p>
                    <SearchOutlinedIcon className='search' />
                    <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='leadlist_headingRight'>
                    <AddRoundedIcon className='plus' />
                    <Link to={'/add'}><button className='leadlist_btn'>Add Leads</button></Link>
                </div>
            </div>

            <div className='leadlist_grid'>
                <h3>All Leads</h3>

                <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        rows={leadsData.filter(item => keys.some(key => item[key].toLowerCase().includes(search)))}
                        // .filter(item => keys.some(index => item[index].toLowerCase().includes(search)))
                        disableRowSelectionOnClick
                        columns={columns}
                        getRowId={row => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}

export default LeadList

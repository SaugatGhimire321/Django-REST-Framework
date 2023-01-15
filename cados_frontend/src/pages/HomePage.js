import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {

  const [advocates, setAdvocates] = useState([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState(null)

  useEffect(()=>{
    getData()
  },[])

  let getData = async (query= '') => {
    let response =await axios.get(`https://cados.up.railway.app/advocates?query=${query}`)
    console.log('RESPONSEE:', response)
    setAdvocates(response.data.advocates)
    setTotal(response.data.total)
    setPagination(response.data.pagination)
  }

  let searchData = (e) => {
    e.preventDefault()
    let query = e.target.query.value
    getData(query)
  }

  return (
    <div className='main--container'>
        <h1>Search {total} developer advocates found by @dennisivy's webscraper and the TwitterAPI.</h1>

        <div className='form--wrapper'>
          <form onSubmit={searchData} id='search_form'>            
            <input type="text" name="query" placeholder='Search advocate'/>
            <input type="submit" value="Search" className='btn--primary'/>
          </form>
        </div>

        <div className='advocate_list'>
          {advocates.map((advocate,index) => (
            <div className='advocate_preview_wrapper' key={index}>
              <div className='advocate_preview_header'>
                <Link to={`/advocate/${advocate.username}`}>
                  <img className='advocate_preview_image' src={advocate.profile_pic}/>
                </Link>
                <div>
                  <strong>{advocate.name}</strong>
                  <br></br>
                  <a href={advocate.twitter}>@{advocate.username}</a>
                </div>
                <p className="bio--preview">{advocate.bio}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default HomePage
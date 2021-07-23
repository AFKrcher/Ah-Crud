import {FormControl, Button, Paper} from '@material-ui/core';
import {useState, useEffect} from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Grid from '@material-ui/core/Grid';
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  title:{
      fontWeight: "bold",
      flexGrow: 1,
  },
  button:{
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'rgb(241, 232, 220)',
      borderRadius: "5",
  },
  input: {
        color: "white",
        "&.Mui-focused": { // increase the specificity for the pseudo class
          color: "white"
        }
  },
}));

function Form(){
    const classes = useStyles();
    const [blogs, setBlogs] = useState([])
    // const URL = 'https://ahcrudserver.herokuapp.com/blogs' // <-- When deployed, just use heroku server link. Otherwise, use http://localhost:3001/blogs
    const URL = "http://localhost:3001/blogs"
      
    // fetches data from backend server & reloads on-screen info after changes
    function fetchData () {
      fetch(URL)
      .then(resp=>resp.json())
      .then(data=>{
        setBlogs(data)})
    }
    // reloads info after changes w/o refresh
    useEffect(()=>{
      fetchData()
     }, [])
  
    // Posts input to server
    async function Submit (e) {
      e.preventDefault()
      if(e.target.title.value !== '' && e.target.body.value !== ''){  
        let data = {title: e.target.title.value, body: e.target.body.value}
        fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res=>res.status)
        .then(res=>{console.log('Response: ', res)
        fetchData()
      })
        e.target.body.value = ''
        e.target.title.value = ''
      }
    }
    
    function Visit(id){
      window.location.href=`/${id}`
    }

  return(
    <div >
      <br/>
        <FormControl className={classes.input}>
          <div className="nestedGrid">
          <form onSubmit={Submit}> 
            <input type="text" id="title" className="inputs" placeholder="Title" />  
            {/* <TextField id='title' InputProps={{className: classes.input}} label="Title" inputProps={{maxLength:255}}/>  */}
            <br />
            <textarea id='body' className="inputs" placeholder="This accepts multiple lines"/>
            {/* <TextField variant="outlined" InputProps={{className: classes.input}} id='body' multiline="true" placeholder="This accepts multiple lines" /> */}
            <br />
            <Button className={classes.button} id='submitButton' variant="contained" color="primary" type="submit">
              Create <AddCircleIcon />
            </Button>
          </form>
          </div>
        </FormControl>
        <h2>Read from our finest selection...</h2>
    <Grid container className="gridContainer">
    {blogs.map(blog=>{
      return  (
      <Grid container className="blogPost" id={blog.id} style={{width:"25%"}}>
        <Grid container justifyContent="center" alignItems="center">
          <div className="nestedGrid">
            <Grid item style={{margin:"5%"}}>
              <b className="blogTitle" onClick={(e)=> Visit(blog.id)}>
              {blog.title}
              </b>
            </Grid>
            <Grid item style={{margin:"5%"}}> 
              <p>
                {blog.body.slice(0, 30)}...
              </p>
            </Grid>
          </div>
        </Grid>
      </Grid>
        )})}
    </Grid>
    </div>
     )
}

export default Form
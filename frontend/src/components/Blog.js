import { useLocation } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title:{
      fontWeight: "bold",
      flexGrow: 1,
  },
  button:{
    color: 'rgb(241, 232, 220)'
  }
});

function Blog(){
  const classes = useStyles();
  const[blog, setBlog] = useState([{id: 'Loading...', title: 'Loading...', body: 'Loading...'}])
  const location = useLocation()
  // const URL = `https://ahcrudserver.herokuapp.com`; // When deployed, just use heroku server link. Otherwise, use http://localhost:3001
  const URL = 'http://localhost:3001'

  // fetches data from backend server & reloads on-screen info after changes
  useEffect(() => {
      async function fetchData () {
        await fetch(URL+location.pathname)
        .then(resp=>resp.json())
        .then(data=>{
          setBlog(data)})
      }
      fetchData()
  }, [])


  var counter = 0;
      //Edit Button
      function Edit(e, blog){
          counter++;
          var currentTitle = document.getElementById(blog[0].id)
          var editTitle = document.createElement('input')
          editTitle.setAttribute('id', 'editTitle')
          editTitle.setAttribute('class', 'nestedInput')
          var titleVal = document.createElement('placeholder')

          var currentBody = document.getElementById('blogBody')
          var editBody = document.createElement('textarea')
          editBody.setAttribute('id', 'editBody')
          editBody.setAttribute('class', 'nestedInput')
          var bodyVal = document.createElement('placeholder')
          
          // 1st click shows input box and delete button
            if(counter%2){
              if(blog[0].title === '1. Click on this title! *NOT CLICKBAIT*'){
                  editTitle.setAttribute('value', 'Click it again!')
                }else{
              editTitle.setAttribute("value", blog[0].title)
                }
              currentTitle.replaceChild(editTitle, currentTitle.childNodes[0])
              editTitle.focus()
              editTitle.select()
              document.getElementById("del"+blog[0].id).style.visibility = "visible"

              editBody.value = blog[0].body
              currentBody.replaceChild(editBody, currentBody.childNodes[0])
          
          // 2nd click updates database if changes were made...
            }else if(document.getElementById('editBody').value !== blog[0].body || document.getElementById('editTitle').value !== blog[0].title){
              var updatedTitle = document.getElementById('editTitle').value
              var updatedBody = document.getElementById('editBody').value
              let data = { id: blog[0].id, title: updatedTitle, body: updatedBody}
              fetch(URL+'/blogs', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(res=>res.status)
              .then(res=>{console.log('Response: ', res)
              })
              
              titleVal.innerHTML = document.getElementById('editTitle').value
              bodyVal.innerHTML = document.getElementById('editBody').value
              currentTitle.replaceChild(titleVal, currentTitle.childNodes[0])
              currentBody.replaceChild(bodyVal, currentBody.childNodes[0])
  
            // ... or reverts back to normal.
            }else{
              titleVal.innerHTML = blog[0].title
              bodyVal.innerHTML = blog[0].body
              currentTitle.replaceChild(titleVal, currentTitle.childNodes[0])
              currentBody.replaceChild(bodyVal, currentBody.childNodes[0])
            }
        }
      
        // Deletes an item 
        function Delete(e, id) {
          console.log(URL, "/", id)
          let data = { id: id }
          fetch(URL+'/blogs', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(resp=>resp.status)
          .then(data=>{console.log('Response: ', data)
        })
        console.log('done')
          // window.location.replace("/");
        }

  return(
      <div style={{width: "50%", marginLeft:"24%"}}>
      <br />
      <Button id={'edit'+blog[0].id} className={classes.button} onClick={(e)=>Edit(e, blog)} color="primary"><EditIcon /></Button>
      <Button id={"del"+blog[0].id} className={classes.button} onClick={(e)=>Delete(e, blog[0].id)} ><DeleteIcon /></Button>
      <div>
      <h1 id={blog[0].id}>
      {blog[0].title}
      </h1>
      </div>
      <div id={'blogBody'}>
        <div>
          {blog[0].body.split("\n").map((i) =>{
            return(
              <p>{i}</p>
              )
            })}
        </div>
      </div>
      </div>
  )
}

export default Blog;
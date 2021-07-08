import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import React from 'react'

const axios = require('axios');


const RepoList = ({
        setIsFetching,
        username,
        setError,
        repoList,
        setRepoList,
        repoListRef,
        setIsValidUser,
        isValidUserRef
    
    }) => { 


    useEffect(() => {
        setError(false)
        const fetchData = async () => {
            try {
                setIsFetching(true)
                const userRes = await axios.get(`https://api.github.com/users/${username}`)
                setIsFetching(false)
                if(userRes.status===200){
                    // console.log('in')
                    setIsValidUser(true)    
                }
                //console.log(userRes.data)
            }
            catch (e) {
                // console.log(Object.keys(e))
                if(e.response.data.message.startsWith('You have sent an invalid request')){
                    setError('invalid username!')
                    setIsValidUser(false)
                }
                else if(e.response.data.message.startsWith('API rate limit exceeded')){
                    setError('Please try again after sometime!')
                    setIsValidUser(false)
                }
                else{
                    setError('Something went wrong!')
                    console.log(e.response.data.message)
                    setIsValidUser(false)
                }
                setIsFetching(false)
            }

            

            if(isValidUserRef.current){
                try{
                    setIsFetching(true)
                    const response = await axios.get(`https://api.github.com/users/${username}/repos`,)
                    //console.log(response.data)
                    
                    if(response.data.length > 0){
                        var key;
                        response.data.forEach(async(repo) => {
                            if(repo.language !== null){
                                key = repo.language
                            }
                            else{
                                const res = await axios.get(`${repo.languages_url}`,)
                                    key = (Object.keys(res.data).length === 0) ? 'no dominant language': Object.keys(res.data)[0]
                            }
                            var data = {}  
                            if(!Object.keys(repoListRef.current).includes(key)){
                                data = {...repoListRef.current, [key]: [{name:repo.name, description: repo.description, url: repo.html_url}] }
                            }
                            else{
                                data = {...repoListRef.current}
                                data[key].push({name:repo.name, description: repo.description, url: repo.html_url})
                            }
                            setRepoList(data)
                        }) 
                    }  
                    else{
                        setRepoList(0)
                    }
    
                    setIsFetching(false)
                        
                }
                catch (exception) {
                    console.log(exception.response.data.message)
                    if(exception.response.status===404){
                        setError('something went wrong!')
                    }
                    setRepoList(null)
                    setIsFetching(false)
                }
            }
        }
        if(username){
            fetchData()
        }
        return () => {
            setRepoList([]); 
        };
    }, [isValidUserRef, repoListRef, setError, setIsFetching, setIsValidUser, setRepoList, username])
    

    var sortedKeys
    if(repoList){
        sortedKeys = Object.keys(repoList).sort((a, b) => repoList[b].length - repoList[a].length)
    }

    return (
        <Container id='repos'>

            {repoList!==0 && <ol id="recs" >
                {sortedKeys && sortedKeys.map((lang, index) => (
                    <div key = {index}>
                        <li key = {index} id="lang">{lang}</li>
                        <div>
                            <ol id='olist'>
                                {repoList[lang].map((repo, i) => {
                                    return <li key = {i}>
                                        <p>name: {repo.name}</p>
                                        <p>description: {repo.description ? repo.description: 'no description'}</p>
                                        <p>url: <a href={repo.url}>{repo.url}</a></p>
                                    </li>
                                })}
                            </ol> 
                        </div> 
                    </div>
                ))}
            </ol>}

            {repoList === 0 && <p style = {{textAlign:'center'}}>no repos</p>} 
        </Container>
    ); 

}
 
export default RepoList;
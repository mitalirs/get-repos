import React from 'react'
import Form1 from './Form';
import RepoList from './RepoList';
import useState from 'react-usestateref'
const Home = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)
    const [repoList, setRepoList, repoListRef] = useState({})
    const [isValidUser, setIsValidUser, isValidUserRef] = useState(false)
    let props = {
        isFetching,
        setIsFetching,
        username,
        setUsername,
        error,
        setError,
        repoList,
        setRepoList,
        repoListRef,
        isValidUser,
        setIsValidUser,
        isValidUserRef
    }
    return ( 
        <div>
            <Form1 {...{username, setUsername, isFetching}}/>
            {username &&  <RepoList {...props}/>}
            {username && isFetching && <p style = {{textAlign:'center'}}>Loading...</p>}
            {error && <p style = {{textAlign:'center'}}>{error}</p>}
        </div>
    );
}
 
export default Home;
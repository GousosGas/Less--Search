import React,{Component} from 'react';
import SearchBar from './SearchBar';
import Youtube from '../apis/Youtube';
import VideoList from './VideoList';

class App extends Component{

    state={
        videos:[]
    };

    onTermSubmit=async term=>{
        //console.log(term)

       const response =await Youtube.get('/search',{
            params:{
                q:term
            }
        });

        this.setState({videos:response.data.items})
    };

    render(){
        return <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit}  />
            <p>Found {this.state.videos.length} videos</p>
            <VideoList videos={this.state.videos}/>
        </div>
    }
}

export default App;
import React,{Component} from 'react';
import SearchBar from './SearchBar';
import Youtube from '../apis/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends Component{

    state={
        videos:[],
        selectedVideo:null
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

    onVideoSelect =(video)=>{
      this.setState({selectedVideo:video});

    };

    render(){
        return <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit}  />
            <p>Found {this.state.videos.length} videos</p>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}/>
        </div>
    }
}

export default App;
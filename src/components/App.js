import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Youtube from '../apis/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Menu from './Menu';

class App extends Component {

    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount(){
        this.onTermSubmit('greece');
    }
    onTermSubmit = async term => {
        //console.log(term)

        const response = await Youtube.get('/search', {
            params: {
                q: term
            }
        });

        this.setState({
            videos: response.data.items,
            selectedVideo:response.data.items[0]
        })
    };

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});

    };

    render() {
        return <div className="ui container">
            <Menu/>
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo}/>

                    </div>
                    <div className="five wide column">
                        <VideoList
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}/>
                    </div>

                </div>

            </div>
        </div>
    }
}

export default App;
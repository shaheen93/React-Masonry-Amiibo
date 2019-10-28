import React from 'react';
import Masonry from 'react-masonry-component';
 
const masonryOptions = {
    transitionDuration: 0
};
 
const imagesLoadedOptions = { background: '.my-bg-image-el' }
 
class Gallery extends React.Component {

    
    

    state = {
        items:[],
        loading : false,
      }
      
     
      
      componentDidMount() {
          
        this.setState({ loading: true });

          fetch('https://www.amiiboapi.com/api/amiibo/')
          .then(response => response.json())
          .then(data => this.setState({ items : data.amiibo, loading: false }));         
      }

      changeHandler(e) {
          if(document.getElementById("input").value.length===0){
            fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => this.setState({ items : data.amiibo, loading: false }));       

          }else{
        this.setState({ loading: true });

        const Svalue=document.getElementById("input");

        fetch(`https://www.amiiboapi.com/api/amiibo/?character=${Svalue.value}`)
        .then(response => response.json())
        .then(data => this.setState({ items : data.amiibo, loading: false }));
      }}



    render() {
        const { items , loading } = this.state;
        if (loading) {
          return <p>Loading ...</p>;
        }
        return (
            <div>
                <div>
                    <input type="text" id="input" placeholder="Search..." />
                    <button onClick={this.changeHandler.bind(this)} >Search</button>
                        <ul>
                            ...
                        </ul>

                </div>

            <div> 
            <Masonry
                className={'my-gallery-class'} // default ''
                //elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
                style={{margin:'0 auto', width:'99%'}}
            >
                {this.state.items.map((v, i) => {
            return (
              <div
                key={i}
                style={{margin:'0 2px 10px 0',borderRadius :'25px',border: 'outset rgb(150, 150, 150, 0.2) 2px'}}>
                <img src= {this.state.items[i].image} style={{width:`260px`,height:`auto`}} />
              </div>
            )}
          )}
            </Masonry>
            </div>
            </div>
        );
    }
}
 
export default Gallery;
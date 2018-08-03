import React, { Component } from 'react';
const maxHeight = 650;
const minHeight = 300;
const TEXT_LENGTH = 35;
const HOLLYWOOD = 'H';
const BOLLYWOOD = 'B';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {
          id: 1,
          name: 'Mission: Impossible - Fallout',
          image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
          type: HOLLYWOOD,
        },
        {
          id: 2,
          name: 'Avengers: Infinity War',
          image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
          type: HOLLYWOOD,
        },
        {
          id: 3,
          name: 'Jurassic World: Fallen Kingdom',
          image: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
          type: HOLLYWOOD,
        },
        {
          id: 4,
          name: 'Dhadak',
          image: 'https://www.filmibeat.com/img/220x275/popcorn/movie_posters/dhadak-20171115173308-16596.jpg',
          type: BOLLYWOOD,
        },
        {
          id: 5,
          name: 'Student of the year 2',
          image: 'https://www.filmibeat.com/img/165x100x246/popcorn/trending_news/soty2-gets-a-new-release-date-2795.jpg',
          type: BOLLYWOOD,
        },
        {
          id: 6,
          name: 'Gold',
          image: 'https://cdn.bollywoodmdb.com/movies/smallthumb/2018/gold/poster.jpg',
          type: BOLLYWOOD,
        }
      ]
    }
  }

  onDragStart = (ev, id, type) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("type", type);
  }

  onDrop = (ev, type) => {
    let { movies } = this.state;
    let id = parseInt(ev.dataTransfer.getData("id"));
    let oldType = ev.dataTransfer.getData("type");

    if (oldType !== type) {
      let newArray = movies.map(movie => {
        if (movie.id === id) {
          let obj = {
            id: movie.id,
            name: movie.name,
            image: movie.image,
            type: type,
          }
          return Object.assign({}, obj)
        }
        return movie;
      });
      this.setState({ movies: newArray })
    }
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  hollywood() {
    let { movies } = this.state;
    let length = movies && movies.length > 0 ? movies.filter((movie) => movie.type === BOLLYWOOD).length : 0;

    return (
      <div className="swimlane">
        <div className="swimlane-color status-hollywood" ></div>
        <div className="swimlane-header">
          <h3 className="swimlane-title clearfix">
            <div className="rename-swimlane">
              <div className="title" >Hollywood</div>
              <div className="count"><span>(</span><span >{length}</span><span>)</span></div>
            </div>
          </h3>
        </div>
        <div style={{
          maxHeight: maxHeight,
          minHeight: minHeight
        }}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, HOLLYWOOD)} className="fill-remaining-height scrollbars workflow-cards-scroll-wrapper is-scrollable" >
          <ul className="card-wrapper droppable" >
            {movies && movies.length > 0 ?
              movies.filter((movie) => movie.type === HOLLYWOOD).map((movie, key) => {
                return (
                  <li className="card" key={key} draggable onDragStart={(e) => this.onDragStart(e, movie.id, movie.type)}>
                    <div className="thumbnail" style={{ backgroundPosition: 'initial', backgroundImage: `url(${movie.image})` }}></div>
                    <div className="content"><span className="title">{movie.name ? movie.name.substring(0, TEXT_LENGTH) + (movie.name.length > TEXT_LENGTH ? '...' : '') : ''} </span></div>
                  </li>
                )
              }) : null}
          </ul>
        </div>
      </div >
    )
  }

  bollywood() {
    let { movies } = this.state;
    let length = movies && movies.length > 0 ? movies.filter((movie) => movie.type === BOLLYWOOD).length : 0;
    return (
      <div className="swimlane">
        <div className="swimlane-color status-bollywood" ></div>
        <div className="swimlane-header">
          <h3 className="swimlane-title clearfix">
            <div className="rename-swimlane">
              <div className="title" >Bollywood</div>
              <div className="count"><span>(</span><span >{length}</span><span>)</span></div>
            </div>
          </h3>
        </div>
        <div style={{
          maxHeight: maxHeight,
          minHeight: minHeight
        }}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, BOLLYWOOD)}
          className="fill-remaining-height scrollbars workflow-cards-scroll-wrapper is-scrollable" >
          <ul className="card-wrapper droppable" >
            <ul className="card-wrapper droppable" >
              {movies && movies.length > 0 ?
                movies.filter((movie) => movie.type === BOLLYWOOD).map((movie, key) => {
                  return (
                    <li className="card" key={key} draggable onDragStart={(e) => this.onDragStart(e, movie.id, movie.type)}>
                      <div className="thumbnail" style={{ backgroundPosition: 'initial', backgroundImage: `url(${movie.image})` }}></div>
                      <div className="content"><span className="title">{movie.name ? movie.name.substring(0, TEXT_LENGTH) + (movie.name.length > TEXT_LENGTH ? '...' : '') : ''} </span></div>
                    </li>
                  )
                }) : null}
            </ul>
          </ul>
        </div>
      </div >
    )
  }

  render() {
    return (
      <div className="screens-main">
        <br />
        <br />
        <h1 style={{textAlign: 'center'}}>React Drag and Drop</h1>
        <div className="project_workflow">
          {this.hollywood()}
          {this.bollywood()}
        </div>
      </div>
    );
  }
}

export default App;
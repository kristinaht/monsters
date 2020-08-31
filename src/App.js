import React, { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component'

import { SearchBox } from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({monsters: users}));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }
  render(){
    const { monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()) )
    
    return (
      <div className="App">
        <SearchBox
          placeholder='search monsters'
          handleChange= {this.handleChange} />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;

//setState in onChange:
//because setState is async function, the searchField is one letter behind. In order to fix this, I pass another argument to setState - I pass in the callback function

//setState doesn't update the DOM right away. We declare that the DOM needs to be updated, but React calculates the best time to actually update the DOM.

//REMEMBER: if you want to do something with the state right after you set it, you have to do it inside the second argument function within setSTate function. This callback f is called right after setState

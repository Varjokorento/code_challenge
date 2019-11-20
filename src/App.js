import React, {Component} from 'react';
import './App.css';
import {List} from './components/List.js';
import {PlayerForm} from './components/PlayerForm.js';
import Container from '@material-ui/core/Container';
import {InfoModal} from './components/InfoModal.js';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import { AMAZON_URL } from './env/env';

class App extends Component {

  state = {
    rows: []
  }

  componentDidMount() {
    this.fetchPlayerData();
  }

  fetchPlayerData = () => {
    axios.get(AMAZON_URL).then((res) => {
      this.setState({
        rows: res.data
      })
    })
   
  }

  sortBy = sortCriteria => {
    if (sortCriteria === "asc") {
    this.setState(
      {rows: this.state.rows.sort(this.compareAsc)}
    )
    } else {
      this.setState(
        {rows: this.state.rows.sort(this.compareDesc)}
      )
    }
  }
  
  compareAsc = ( a, b ) => {
    if ( a.score < b.score ){
      return -1;
    }
    if ( a.score > b.score ){
      return 1;
    }
    return 0;
  }

  compareDesc = ( a, b ) => {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }

  addPlayer = (player) => {
    let updatedRows = this.state.rows;
    updatedRows.push(player);
    this.setState(
      {rows: updatedRows}
    )
  }


 render() {
  return (
    <div className="App">
      <center>
        <h1>Baseball Hall of Fame</h1>
        <Container maxWidth="sm">
          <img src="title.png" width="60%" height="60%"></img>
          <List rows={this.state.rows}/>
          <Button onClick = {() => this.sortBy("desc")}>Sort by Top Players!</Button>
          <Button onClick = {() => {this.sortBy("asc")}}>Sort by Bottom Players!</Button>
          <PlayerForm addPlayer={this.addPlayer}/>
          <InfoModal/>
        </Container>  
      </center>
    </div>
  );
  }
}
export default App;

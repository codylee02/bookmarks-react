import React from 'react';
import './App.css';

import AddBookmark from './addBookmark/AddBookmark';
import BookmarkApp from './bookmarkApp/BookmarkApp';


// const bookmarks = [
//   {
//     title:"Google",
//     url: "http://www.google.com",
//     rating: "3",
//     description: "No evil"
//   },
//     {
//       title:"Facebook",
//       url: "http://www.facebook.com",
//       rating: "5",
//       description: "Spend too much time here"
//     }
// ]





export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    }
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    })
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    });
  }

  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$Q6FyXSZBsFXyqgD93Ab0euXmeGfE3hm.jdBjwUVlSDDDU.DwGNmt2",
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    const page = this.state.showAddForm
      ? <AddBookmark 
        showForm={show => this.setShowAddForm(show)}
        handleAdd={bookmark => this.addBookmark(bookmark)} />
      : <BookmarkApp 
        bookmarks={this.state.bookmarks} 
        showForm={show => this.setShowAddForm(show)} />
  return (
    <main className='App'>
      {page}
    </main>
  );
}
}
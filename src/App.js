import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/bookmarkList";
import BookmarksContext from "./BookmarksContext";
import EditBookmark from "./EditBookmark/EditBookmark";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import Rating from "./Rating/rating";

class App extends Component {
  state = {
    bookmarks: [],
    error: null
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
    });
  };

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  };

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(
      bm => bm.id !== bookmarkId
    );
    this.setState({
      bookmarks: newBookmarks
    });
  };

  editBookmark = editedBookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(bookmark =>
        bookmark.id !== editedBookmark.id ? bookmark : editedBookmark
      )
    });
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/bookmarks`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }));
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      editBookmark: this.editBookmark
    };
    return (
      <main className="App">
        <h1>Bookmarks!</h1>

        <Rating />
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route exact path="/" component={BookmarkList} />
            <Route
              exact
              path="/edit-bookmark/:bookmarkId"
              component={EditBookmark}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><BookmarkItem title={'hello'} url={'http://www.google.com'}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

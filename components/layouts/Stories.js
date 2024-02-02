import React from 'react';
import timeago from 'epoch-timeago';

const Stories = ({ state, onDelete }) => {
  const handleDeleteClick = (itemId) => {
    onDelete(itemId);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Upvote</th>
            <th>Score</th>
            <th>Title</th>
            <th>Author</th>
            <th>Time</th>
            <th>Comments</th>
            <th>Add</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.map(({ item, author, title, score, comments_count, time, url }) => (
            <tr key={item}>
              <td>
                <i className="fas fa-sort-up" />
              </td>
              <td>{score}</td>
              <td>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              </td>
              <td>
                <i className="fas fa-user" />
                <a
                  href={`https://news.ycombinator.com/user?id=${author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author}
                </a>
              </td>
              <td>
                <i className="fas fa-clock"> {timeago(time * 1000)}</i>
              </td>
              <td>
                <i className="far fa-comment-alt" />
                <a
                  href={`https://news.ycombinator.com/item?id=${item}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {comments_count}
                </a>
              </td>
              <td>
                <button className="btn_add_del">Add</button>
              </td>
              <td>
                <button className="btn_add_del" onClick={() => handleDeleteClick(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Stories;
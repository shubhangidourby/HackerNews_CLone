import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Stories from "./layouts/Stories";
import Loader from "./layouts/shimmer";

const News = props => {
  const [state, setState] = useState([]);
  const [count, setCount] = useState(21);
  const [isLoading, setLoading] = useState(false);

  const checkRoute = () => {
    let route;
    switch (props.location.pathname) {
      case "/top":
        route = "/topstories";
        break;
      default:
        route = "/notFound";
        break;
    }
    return route;
  };

  const formatComponent = (item, callback) => {
    setState(item);
    callback();
  };

  const showMoreContent = () => {
    setLoading(true);
    getData(checkRoute(), count, count + 20).then(arr => {
      getDetails(arr).then(item =>
        formatComponent(item, () => {
          setCount(count + 20);
          setLoading(false);
          window.scrollTo(0, 0);
        })
      );
    });
  };

  const getDetails = async function(arr) {
    const promises = arr.map(async item => {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
      );
      return {
        item,
        author: data.by,
        title: data.title,
        score: data.score,
        comments_count: data.descendants,
        time: data.time,
        url:
          data.url != null
            ? data.url
            : `https://news.ycombinator.com/item?id=${item}`
      };
    });
    const results = await Promise.all(promises);
    return results.sort((a, b) => b.time - a.time); // Sort by time in descending order
  };

  const getData = async function(category, start, end) {
    const arr = [];
    try {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0${category}.json?print=pretty`
      );
      data.slice(start, end).map(item => arr.push(item));
    } catch (error) {
      return error;
    }
    return arr;
  };

  useEffect(() => {
    getData(checkRoute(), 0, 20).then(arr => {
      getDetails(arr).then(item =>
        formatComponent(item, () => {
          props.hideLoader();
        })
      );
    });
  }, []);

  return (
    <>
      {props.isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className={
              isLoading
                ? "container-fluid main overlay"
                : "container-fluid main"
            }
          >
            <table className="table">
              <tbody>
                <Stories state={state.reverse()} />
              </tbody>
            </table>
          </div>
          <div className="text-center m-1">
            <span className="more-btn " onClick={showMoreContent}>
              More
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(News);

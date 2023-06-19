import "./styles.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const showUsers = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get("https://randomuser.me/api/?results=20")
        .then((res) => {
          const newUsers = res.data.results;
          setUserList((prevUsers) => [...prevUsers, ...newUsers]);
          setIsLoading(false);
        });
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    showUsers();
  }, []);

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={userList.length}
        next={showUsers}
        hasMore={true} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="button" onClick={showUsers}>
          <h1>Show Users</h1>
        </div>
        {isLoading === false &&
          userList.map((user) => (
            <div className="card" key={user.id.value}>
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
              />
              <h1>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
              <h2>{user.phone || <Skeleton />}</h2>
              <h3>{user.email || <Skeleton />}</h3>
            </div>
          ))}
        {isLoading === true && (
          <>
            <div className="card">
              <h1>
                <Skeleton />
              </h1>
              <h2>
                <Skeleton />
              </h2>
              <h3>
                <Skeleton />
              </h3>
            </div>
            <div className="card">
              <h1>
                <Skeleton />
              </h1>
              <h2>
                <Skeleton />
              </h2>
              <h3>
                <Skeleton />
              </h3>
            </div>
            <div className="card">
              <h1>
                <Skeleton />
              </h1>
              <h2>
                <Skeleton />
              </h2>
              <h3>
                <Skeleton />
              </h3>
            </div>
          </>
        )}
      </InfiniteScroll>
    </div>
  );



  // <SkeletonTheme color="#cfcfcf" highlightColor="#b4cf97">
  //   <div className="App">
  //     <div className="demo">
  //       <h1>{heading || <Skeleton />}</h1>
  //       <p>{para || <Skeleton count={3} />}</p>
  //       {imgUrl ? (
  //         <img src={imgUrl} width={100} />
  //       ) : (
  //         <Skeleton width={100} height={100} circle={true} />
  //       )}
  //     </div>

  //     <div className="demo">
  //       <h1>{heading || <Skeleton />}</h1>
  //       <p>{para || <Skeleton count={3} />}</p>
  //       {imgUrl ? (
  //         <img src={imgUrl} width={100} />
  //       ) : (
  //         <Skeleton width={100} height={100} circle={true} />
  //       )}
  //     </div>

  //     <div className="demo">
  //       <h1>{heading || <Skeleton />}</h1>
  //       <p>{para || <Skeleton count={3} />}</p>
  //       {imgUrl ? (
  //         <img src={imgUrl} width={100} />
  //       ) : (
  //         <Skeleton width={100} height={100} circle={true} />
  //       )}
  //     </div>
  //   </div>
  // </SkeletonTheme>
}

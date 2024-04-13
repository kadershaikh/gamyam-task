import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import CardWithCarousel from "./components/CardWithCarousel/CardWithCarousel"; 

const Lands = () => {
  const [lands, setLands] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10; 

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = () => {
    fetch(`https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          setHasMore(false);
          return;
        }
        setLands(prevItems => [...prevItems, ...data.results]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(data.results.length > 0);

      })
      .catch((error) => console.error("Error fetching lands:", error));
  };

  return (<div>
    <InfiniteScroll
    dataLength={lands.length}
    next={fetchLands}
    hasMore={hasMore}
    loader={<div style={{textAlign:"center", overflow: "hidden"}}><CircularProgress/></div>}
    scrollThreshold={0.5} 
  >
      <Grid container spacing={3}>
        {lands.map((land) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={land.id}>
            <CardWithCarousel land={land} />
          </Grid>
        ))}
      </Grid>
     </InfiniteScroll>
     {!hasMore && <h4>No more data available</h4>}
     </div>
  );
};

export default Lands;

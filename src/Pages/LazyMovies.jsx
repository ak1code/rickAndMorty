import React, { lazy, Suspense, useState } from 'react';
import axios from 'axios';
import MovieCart from "../Componant/MovieCard"
import { Col, Divider, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie, loading, error } from '../Redux/MovieSlice';

const LazyMovies = lazy(() => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movieData);
  const loading1 = useSelector((state) => state.movie.loading);

  useEffect(() => {
    GetData();
  }, [page]);

  useEffect(() => {
    dispatch(reload());
  }, []);

  const GetData = async () => {
    dispatch(loading(true));
    try {
      let res = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      setData((pre) => [...pre, ...res.data.results]);
      dispatch(getMovie(res.data.results));
      dispatch(loading(false));
    } catch (err) {
      console.log(err);
      dispatch(loading(false));
      dispatch(error);
    }
  };

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((pre) => pre + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);

    return   () => window.removeEventListener('scroll', handleInfiniteScroll);
  });

  const handlePre = () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };

  const handleNext = () => {
    setPage((pre) => pre + 1);
  };

  return (
    <div>
      <h1 className='heading'>Movies</h1>
      <Row>
        {movies?.map((item, index) => (
          <Col className="gutter-row" span={6} key={index}>
            <MovieCart {...item} />
          </Col>
        ))}
      </Row>
      <Button onClick={handlePre}>Pre</Button>
      {page}
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
});

export default LazyMovies;
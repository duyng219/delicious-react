import React from 'react'
import { useEffect, useState } from "react";
import styled from 'styled-components'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  
  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {

    const check = localStorage.getItem('popular');

    if(check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`);
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.results));

      setVeggie(data.results)
      console.log(data.results);
    }
  }
  return (
    <Wrapper>
          <h3>Popular Picks</h3>

          <Splide 
            options={ {
              perPage:5,
              // arrows: false,
              // pagination: false,
              // drag: 'free',
              gap:'5rem',
            } }
          >
          {veggie.map((result) => {
            return (
              <SplideSlide key={result.id}>
                <Card>
                  <p>{result.title}</p>
                  <img src={result.image} alt={result.title} />
                  <Gradient/>
                </Card>
              </SplideSlide>
            );
          })}
          </Splide>
        </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 10rem;
  overflow: hidden;
  position: relative;

  img {
  border-radius: 2rem;
  /* position: absolute; */
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Veggie
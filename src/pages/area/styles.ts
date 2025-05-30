import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type ListBooksProps = {
  darkMode: boolean;  
};

const l11 = keyframes`
  100% {
    transform: translateY(calc(var(--s, 1) * 0.1%));
  }
`;

export const Loader = styled.div`
  margin-top:5%;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  display: inline-grid;
  color:#240E0B;

  &:before,
  &:after {
    content: "Carregando ...";
    grid-area: 1 / 1;
    -webkit-mask: linear-gradient(90deg, #000 50%, #0000 0) 0 50% / 2ch 100%;
    animation: ${l11} 1s infinite cubic-bezier(0.5, 220, 0.5, -220);
  }

  &:after {
    -webkit-mask-position: 1ch 50%;
    --s: -1;
  }
`;


export const ListBooks = styled.div<ListBooksProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;          
  justify-content: space-evenly;
  padding: 10px;

  .card {
    height: 100%;
    width: 60%;             
    min-width: 200px;       
    border: 2px solid #000;
    margin: 10px;
    display: flex;
    background-color: ${({ darkMode }) => (darkMode ? '#2c2c2c' : '#240E0B')};
    border-radius: 10px;
    
    flex-direction: column;
    justify-content: flex-start;
    transition: 0.3s;

    &:hover {
      transform: scale(1.06);
    }

    h2 {
    color:white;
      text-align: center;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

     .titulo-livro {
    color:#FFD700;
      text-align: center;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    p {
    color:white;
      margin: 0 5px 5px 5px;
      flex-grow: 1;  
    }

    button {
      height: 30px;
      width: 40%;
      border-radius: 6px;
      margin-left: 85px;
      cursor: pointer;
      background-color: yellow;
      color:#240E0B;

      &:hover {
      transitions: 1.2s;
        background-color: #FFD700;
      }
    }

    .capa {
      width: 100%;
      border-top-left-radius: 10px; 
      border-top-right-radius: 10px;
      height: 220px;             
      object-fit: cover;   
      object-position: 50% 10%;  
    }
  }

  .lista {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
    margin-left: 4%;
  }

 
`;

import styled from '@emotion/styled';
type ListBooksProps= {
    darkMode: boolean;  
  };
export const ListBooks = styled.div<ListBooksProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;          
  justify-content: space-evenly;
  padding: 10px;

  .card {
    width: 60%;             
    min-width: 200px;       
          
    border: 2px solid #000;
    margin: 10px;
    display: flex;
    background-color: ${({ darkMode }) => (darkMode ? '#2c2c2c' : '#fff')};
    border-radius: 10px;
    box-shadow: ${({ darkMode }) => (darkMode ? '10px 10px 1rem #2c2c2c' : '10px 10px 1rem #ccc')};
    flex-direction: column;
    justify-content: flex-start;
    transition: 0.3s;

    &:hover {
      transform: scale(1.06);
    }

    h3 {
      margin: 10px 5px 5px 5px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    p {
      margin: 0 5px 5px 5px;
      flex-grow: 1;  
    }

    .poster {
      width: 100%;
      height: 220px;             
      object-fit: cover;   
      object-position: 50% 10%;     
      border: 2px solid #000;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: ${({ darkMode }) => (darkMode ? '10px 10px 1rem #2c2c2c' : '10px 10px 1rem #ccc')};
      margin-bottom: 10px;
    }
  }

  .lista {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
    margin-left:4%;
  }
`;

   
      
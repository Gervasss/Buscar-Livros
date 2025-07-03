import styled from '@emotion/styled';

type PageContainerProps = {
  display?: string;
  padding?: number | string;
 
};

export const PageContainer = styled.div<PageContainerProps>`
  width: 100%;
  height: 100vh;
  padding: ${({ padding }) => padding || "1rem"};
  display: ${({ display }) => display || "block"};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #483018; 
  transition: background-color 0.3s, color 0.3s;  /* Transição suave */
  overflow-y: auto;
   


  
`;

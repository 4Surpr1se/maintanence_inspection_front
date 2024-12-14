import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: "Montserrat", sans-serif;
		font-size: 14px;
		font-weight: 500;
		background-color: var(--red);
	}
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`;

import styled from "styled-components";
export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  @media (max-width: 1100px) {
    display: none;
  }
`;
export const ContentLeague = styled.div``;
export const ContainerTitle = styled.div`
  width: 100%;
  background-color: var(--bg-gray-300);
  padding: 0.5rem;
  border: 1px solid var(--bg-gray);
  border-radius: 8px;
  color: var(--black);
`;
export const Title = styled.div`
  color: var(--black);
  font-weight: 700;
  text-align: center;
`;
export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NoContent = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  text-align: center;
  justify-content: center;
  gap: 5px;
  svg {
    font-size: 20px;
  }
`;

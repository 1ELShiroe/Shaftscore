import styled from "styled-components";
export const Container = styled.div`
  width: 100vw;
  background-color: var(--bg-blue);
  /* The switch - the box around the slider */

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 28px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
export const Menu = styled.div``;
export const Content = styled.div`
  max-width: 1280px;
  position: relative;
  margin: auto;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    max-width: 250px;
  }
  svg {
    font-size: 25px;
    fill: var(--white);
  }
  @media (max-width: 630px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 525px) {
    justify-content: center;
    .switch {
      display: none;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--white);
  padding: 0.2rem 1rem;
  border-radius: 8px;
  position: relative;

  @media screen and (max-width: 525px) {
    margin-top: 10px;
  }
`;

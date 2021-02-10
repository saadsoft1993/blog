import styled from 'styled-components';

const heights = {
  rg: '60px',
  sm: '50px',
};

const fontSizes = {
  rg: '18px/22px',
  sm: '14px/18px',
};

const tops = {
  rg: '16px',
  sm: '12px',
};

const Container = styled.div`
  display: ${props => (props.label ? 'flex' : 'block')};
  justify-content: space-between;
  align-items: center;

  label {
    font: normal normal 600 22px/27px Montserrat;
    width: 30%;
  }

  > div {
    width: ${props => (props.label ? '70%' : 'initial')};
  }

  input,
  select {
    font: normal normal 300 ${props => fontSizes[props.size]} Montserrat;
    color: ${props => (props.isPlaceholderSelected ? '#6c757d' : '#43425d')};
    padding: 16px 34px;
    border: 1px solid #d8d8d8;
    border-radius: 10px;
    height: ${props => heights[props.size]};
  }

  .input-icon {
    position: absolute;
    top: ${props => tops[props.size]};
    left: 12px;
  }

  .pass-visibility-toggle-icon {
    position: absolute;
    top: 16px;
    right: 12px;
  }

  .clear-icon {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .err-msg {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }

  @media screen and (max-width: 1919px) {
    flex-direction: column;
    align-items: initial;

    label {
      font: normal normal 600 20px/24px Montserrat;
      width: initial;
    }

    input,
    select {
      height: 50px;
      padding: 0 34px;
    }

    .input-icon,
    .pass-visibility-toggle-icon {
      top: 12px;
    }

    > div {
      width: initial;
    }
  }
`;

export default Container;

import styled from "styled-components";

const StyledInput = styled.div`

  min-width: 1000px;
  min-height: 80px;

  input {
    width: 60%;
    height: ${({type}) => type === 'textarea' ? '150px' : '35px'};

  }

  p {
    display: ${({valid}) => valid === 'true' ? 'none' : valid === null ? 'none' : 'block'};
    color: orangered;
  }
`

export const Input = ({
                          type,
                          name,
                          state,
                          setState,
                          placeholder,
                          error,
                          regex,
                          onChange,
                          min,
                          max
                      }) => {

    const validate = (ev) => {
        if (setState){
            if (regex) {
                if (regex === 1) return setState({...state, valid: "true"})
                if (regex === 2) return setState({...state, valid: "false"})
            }
            setState({...state, valid: null})
        }

    }


    return <StyledInput type={type} error={error} valid={state.valid ? state.valid : null}>
        <label htmlFor={name}>
            <h4>{name}</h4>
            <input
                onChange={onChange}
                onKeyUp={validate}
                onBlur={validate}
                type={type}
                name={name}
                placeholder={placeholder}
                min={min}
                max={max}
            />
        </label>
        <p>{error}</p>
    </StyledInput>
}
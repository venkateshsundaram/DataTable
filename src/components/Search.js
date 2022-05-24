import styled from 'styled-components';
import SearchIcon from "../commons/SearchIcon";

const Search = (props) => {
    const { onChange, placeholder, onkeyup, value } = props;
    return (
        <StyledSearchWrapper>
            <StyledSearchInputIcon />
            <StyledInput 
            onkeyup={onkeyup}
            value={value}
            className='search-input' {...props} placeholder={placeholder} onChange={onChange} />
        </StyledSearchWrapper>
    )
}

export default Search;

const StyledSearchWrapper = styled.div`
position: relative;
`;

const StyledSearchInputIcon = () => (
    <StyledSearchIconSpan className="search-icon">
        <SearchIcon />
    </StyledSearchIconSpan>
);

const StyledSearchIconSpan = styled.span`
  position: absolute;
  top: 7px;
  left: 9px;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  padding: 5px 3px 5px 3px;
  padding-left: ${(props) =>
        props.paddingLeft ? props.paddingLeft : props.width ? "10px" : "30px"};
  padding-right: 10px;
  font-size: 14px;
  border-radius: 2px;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0,0,0,0.87);
  -webkit-transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  box-shadow: none;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  ::-webkit-input-placeholder {
    font-size: 13px;
    color: #adafb5;
    font-weight: 600;
  }
  ::-moz-placeholder {
    font-size: 13px;
    padding-top: 4px;
    color: #adafb5;
    font-weight: 600;
  }

  :disabled {
    background: #f7f9fa;
    border: 1px solid #dadfe3;
    box-shadow: inset 0 1px 2px 0 rgb(24 50 71 / 5%);
    opacity: 0.6;
  }
`;
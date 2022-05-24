import styled from 'styled-components';
import SearchComponent from '../../components/Search';
import { CaretDownIcon } from "../../commons/components";

const Search = (props) => {
    return (
        <StyledSearchWrapper>
            <StyledFilterButton>
                Filter
                <StyledIcon><CaretDownIcon /></StyledIcon>
            </StyledFilterButton>
            <StyledSearchContent>
                <SearchComponent {...props} />
            </StyledSearchContent>
        </StyledSearchWrapper>
    )
}

export default Search;

const StyledSearchWrapper = styled.div`
    display: inline-flex;
    overflow-x: hidden;
    width: 100%;
`;

const StyledSearchContent = styled.div`
flex-basis: 91%;

.search-input {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
`;

const StyledIcon = styled.div`
    padding-left: 10px;
    padding-top: 4px;
`;

const StyledFilterButton = styled.div`
    display: flex;
    font-size: 13px;
    flex-basis: 5%;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    max-height: 30px;
    padding-left: 12px;
    align-items: center;
`;

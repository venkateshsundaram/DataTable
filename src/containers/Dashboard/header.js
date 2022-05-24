import React from "react";
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <Tab>All</Tab>
        </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.div`
    position: relative;   
    background: #f5f7f9; 
    width: 100%;
    height: 45px;
    padding: 0px 16px;
    border-bottom: 1px solid #cfd7df;
    z-index: 1000;
    display:flex;
    align-items: center;
`;

const Tab = styled.div`
border-bottom: 3px solid #186ad4;
padding: 12px;
width: 24px;
`;


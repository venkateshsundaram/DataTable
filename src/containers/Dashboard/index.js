import React from 'react'
import styled from 'styled-components';
import Search from './search';
import DashboardHeader from './header';
import DataTable from '../../components/DataTable';
import { TABLE_COLUMNS } from '../../constants/application';
import { useFetch } from "../../utils/hooks";

const Dashboard = () => {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/photos");
  const [searchValue, onChangeSearch] = React.useState("")
  const [filteredItems, updateFilteredItems]= React.useState([]);

  let timerId;
  const onRowClick = (rowData, rowIndex) => {
    console.log(rowData, rowIndex)
  }

  const onSelectionChange = (selectedKeys) => {
    console.log(selectedKeys)
  }

  const filterRows=() => {
    const filteredValues = searchValue ? data.filter(obj=> obj.title.toLowerCase().includes(searchValue.toLowerCase())): data;
    updateFilteredItems(filteredValues);
  }

  const debounceFunction = (func, delay) => {
    clearTimeout(timerId)  
    timerId  =  setTimeout(func, delay)
  }

  const onChange = (e) => {
    onChangeSearch(e.target.value);
    debounceFunction(filterRows, 300)
  }

  const rows = searchValue ? filteredItems.map(obj => ({ ...obj, inventory: 100, vendor: "Fulfil test store"})) : data.map(obj => ({ ...obj, inventory: 100, vendor: "Fulfil test store"}));

  return (
    <>
      <Container>
        <ContainerBackground>
          <DashboardHeader />
          <ContentContainer>
            <Search 
              value={searchValue}
              onChange={onChange} 
              placeholder="Search products" />
            <DataTable
              columns={TABLE_COLUMNS}
              rows={rows}
              onRowClick={onRowClick}
              onSelectionChange={onSelectionChange}
            />
          </ContentContainer>
        </ContainerBackground>
      </Container>
    </>
  )
}

export default Dashboard;

const ContainerBackground = styled.div`
    box-shadow: 0 0px 1px #dadfe3;
    border: 1px solid #DADFE3;
    border-radius: 4px;
    background-color: #F9F9F9;}
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden auto;
`;

const ContentContainer = styled.div`
  padding: 20px 16px;
  background: #fff;
`;

const Container = styled.div`
  height: calc(100vh - 20px) !important;
  padding: 12px;
  margin: auto;
`;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePagination } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Image from '../../../components/Images/Image';
import useTheme from '../../../hooks/useTheme';
// import {BROKEN_IMAGE} from '../../../lib/config';
import { deleteLithaApi } from '../../../services/litha.service';
import { showToast } from '../../../lib/global';
import CustomDataLoader from '../../../components/loader/PageLoader';

import { customTheme } from '../../../lib/theme';
import { useSelector } from 'react-redux';
// const rows = lithaData

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export default function CustomizedTables(props) {

  const themeType = useSelector(state => state?.store?.theme)
  const theme = customTheme[themeType]

  const classes = useStyles();
  // const [theme] = useTheme()
  const {tableData = []} = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(tableData?.length){
      setLoading(false)
    }
  },[tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { index:true, label: 'SL No.', minWidth: 80 },
    {
      id: 'imageUrl',
      label: 'Preview Image',
      minWidth: 170,
      align: "center",
      component: (url) => <Image src={url} width="50px" height="50px" className="rounded-circle" alt="lith preview image" placeholder="hello" />
    },
    {
      id: 'headerText',
      label: 'Header Text',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'imageUrl',
      label: 'Image Url',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'ctaLink',
      label: 'CTA Link',
      minWidth: 170,
      align: 'left',
    },
    {
      id: '_id',
      label: 'Action',
      minWidth: 100,
      align: 'right',
      type: "delete",
      component: (id) => <DeleteForeverIcon className="pointer" onClick={()=>handleDelete(id)} color="secondary" />
    },
  ];

  const handleDelete = (id) => {
    deleteLithaApi(id).then(res=>{
      if(res && res.data){
        showToast(res?.data?.message, 'success');
        props.handleRefresh?.()
      }
    }).catch(error=>{
      console.error(error);
      showToast(error?.response?.data?.message || "Falied to delete data!", 'error')
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderComponent = (data, value, index) => {
    console.log('index', data, value, index)
    if(data.index){
      return index+1
    }
    if (typeof value === "undefined"){
        return "N/A"
    }
    if(!value){
      return "N/A"
    }

    if(data.type === 'delete'){
        return data.component?.(value)
    }
    if(data.component){
      switch (typeof data.component){
          case "function":
            return data.component?.(value)
        default:
            return data.component
      }
    }
    return value
      
  }

  
  return (
    <React.Fragment>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            
            {loading ?<caption className="text-center"><CustomDataLoader type="normal" /></caption>  : <></>}
            {!tableData?.length && !loading ?<caption className="larger text-center">No Data Found!</caption>:<></>}
            <TableHead>
                <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                    style={{
                      backgroundColor: theme.headerColor,
                      color: "#fff",
                      minWidth: column.minWidth
                    }}
                    key={index}
                    align={column.align}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code || rowIndex}>
                    {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                            <TableCell 
                              key={index}
                              style={{color: theme.textColor}}
                              align={column.align || "left"}>
                              <>{renderComponent(column, value, rowIndex)}</>
                            </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        {tableData?.length ?
          <TablePagination
            rowsPerPageOptions={[10, 20, 100]}
            component="div"
            count={props?.totalCount || tableData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            style={{color: theme.textColor}}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            placeholder="No Data Found!"
        />:<></>}
        
    </React.Fragment>
  );
}

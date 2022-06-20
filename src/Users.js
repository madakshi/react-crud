import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: 'warning.main',
  },
}));

export default function UserList() {
  const classes = useStyles(); 
  

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("https://38l7o1euke.execute-api.us-east-1.amazonaws.com/prod/products")
      .then(res => res.json())
      .then(
        (json) => {
          console.log(json)
          setUsers(json.products)
        }
      )
  }

  const UpdateUser = productId => {
     window.location = '/update/'+productId
   }

  const UserDelete = productId => {
    var data = {
      'productId': productId
    }
    fetch('https://38l7o1euke.execute-api.us-east-1.amazonaws.com/prod/product', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        window.location.href = '/';
      }
    )
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Products
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  Add Product
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ProductId</TableCell>
                <TableCell align="center">ProductName</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Color</TableCell>
                <TableCell align="left">Inventory</TableCell>
                <TableCell align="center">Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.productId}>
                  <TableCell align="right">{user.productId}</TableCell>
                  <TableCell align="right">{user.productName}</TableCell>
                  <TableCell align="left">${user.price}</TableCell>
                  <TableCell align="left">{user.color}</TableCell>
                  <TableCell align="left">{user.inventory}</TableCell>
                  <TableCell align="left">{user.category}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateUser(user.productId)}>Edit</Button> 
                      <Button onClick={() => UserDelete(user.productId)}>Del</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}
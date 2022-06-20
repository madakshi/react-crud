import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import InputAdornment from '@mui/material/InputAdornment';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  FormControl: {
      minWidth: 400
  },
}));

export default function UserCreate() {
  const classes = useStyles();
  
  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'productId': productId,
      'productName': productName,
      'price': price,
      'color': color,
      'inventory': inventory,
      'category': category
      ,
    }
    fetch('https://38l7o1euke.execute-api.us-east-1.amazonaws.com/prod/product', {
      method: 'POST',
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

  const [productId, setproductId] = useState('');
  const [productName, setproductName] = useState('');
  const [price, setprice] = useState('');
  //const [category, setcategory] = useState('');
  const [color, setcolor] = React.useState('');
  const [inventory, setinventory] = useState('');
  const [category, setValue] = React.useState('');
  
  const handleChange = (event) => {setValue(event.target.value)}
  const handleChangecolor = (event) => {setcolor(event.target.value)}

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Product
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="productId"
                name="productId"
                variant="outlined"
                required
                fullWidth
                id="productId"
                label="productId"
                onChange={(e) => setproductId(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="productName"
                label="productName"
                onChange={(e) => setproductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                variant="outlined"
                required
                fullWidth
                id="price"
                label="price"
                onChange={(e) => setprice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inventory"
                label="inventory"
                onChange={(e) => setinventory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className= {classes.FormControl}>
                <InputLabel>Color</InputLabel>
                <Select
                variant="outlined"
                required
                fullWidth
                id="color"
                label="color"
                onChange={handleChangecolor}>
                    <MenuItem value ={'Red'} > Red </MenuItem>
                    <MenuItem value ={'Blue'} > Blue </MenuItem>
                    <MenuItem value ={'Green'} > Green </MenuItem>
                    <MenuItem value ={'Pink'} > Pink</MenuItem>
                    <MenuItem value ={'Yellow'} > Yellow </MenuItem>
                    <MenuItem value ={'Black'} > Black </MenuItem>
                    <MenuItem value ={'White'} > White </MenuItem>
                    <MenuItem value ={'gray'} > gray </MenuItem>
                    <MenuItem value ={'none'} > none </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className= {classes.FormControl}>
                <InputLabel>Categories</InputLabel>
                <Select
                variant="outlined"
                required
                fullWidth
                id="category"
                label="category"
                onChange={handleChange}>
                    <MenuItem value ={'Books'} > Books </MenuItem>
                    <MenuItem value ={'Consumer Electronics'} > Consumer Electronics </MenuItem>
                    <MenuItem value ={'Office Products'} > Office Products </MenuItem>
                    <MenuItem value ={'Camera & Photo'} > Camera & Photo </MenuItem>
                    <MenuItem value ={'Personal Computers'} > Personal Computers </MenuItem>
                    <MenuItem value ={'Cell Phones & Accessories'} > Cell Phones & Accessories </MenuItem>
                    <MenuItem value ={'Major Appliances'} > Major Appliances </MenuItem>
                    <MenuItem value ={'Grocery & Gourmet Foods'} >  Grocery & Gourmet Foods</MenuItem>
                    <MenuItem value ={'Other'} > Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Products
          </Button>
        </form>
      </div>
    </Container>
  );
}
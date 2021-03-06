import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader'
import { green, red, white } from '@mui/material/colors';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Divider from '@mui/material/Divider'
import ListSubheader from '@mui/material/ListSubheader';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import OrderList from '../../../components/biz/kitchen/OrderList'
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// LUXON
import { DateTime } from 'luxon'

const NewCard = ( { order } ) => {

  // clicking header has three states: info, confirmation, complete
  const [confirmClick, setConfirmClick] = useState(false)
  const [completeOrder, setCompleteOrder] = useState(false)
  


  // order state
  const [orderCompletion, setOrderCompletion] = useState(order.order_list)

  const dateString = DateTime.fromISO(order.created_at).toFormat('MMMM dd, yyyy')
  const timeString = DateTime.fromISO(order.created_at).toLocaleString(DateTime.TIME_SIMPLE)

  const handleOnClick = (event) => {
    setConfirmClick(!confirmClick)
  }

  const handleOrderCompletion = () => {
    setCompleteOrder(true)
    setTimeout(async()=> {
      await fetch('/api/kitchen/orders', {method: 'PUT', body: order._id})
    }, 1000)
  }

  const DefaultHeader = () => {
    return (
      <CardHeader
          title={
            <Typography variant="h5" component={"div"}>
              Order # {order.queue}
            </Typography>
          }
          subheader={
            <Typography variant="overline" component={"div"}>
              { 
                dateString
              }
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              { order.mode == 'delivery' ? <DeliveryDiningIcon /> : <RestaurantIcon /> }
            </Avatar>
          }
          onClick= { handleOnClick }
        />
    )
  }

  const ConfirmationHeader = () => {
    return (
      <CardHeader
          className="bg-green-500"
          title={
            <Typography className="text-white" variant="h5" component={"div"} onClick = { handleOrderCompletion }>
              Complete Order
            </Typography>
          }
          subheader={
            <Typography className="text-white" variant="overline" component={"div"} onClick={handleOnClick}>
              Cancel
            </Typography>
          } // date of receipt
          avatar={
            <Avatar sx={{ bgcolor: white }} aria-label="recipe">
              <HelpIcon />
            </Avatar>
          }
          onClick = { handleOnClick }
        />
    )
  }

  const CompletionHeader = () => {
    return (
      <CardHeader
          className="bg-green-500"
          title={
            <Typography className="text-white" variant="h5" component={"div"}>
            Order Completed
            </Typography>
          }
          avatar={
            <Avatar sx={{ bgcolor: white }} aria-label="recipe">
              <CheckCircleOutlineIcon />
            </Avatar>
          }
        />
    )
  }

  return (
    
      <Card sx={{ width: 275 }} id={order._id}>

        { confirmClick ? <ConfirmationHeader /> : ( completeOrder ? <CompletionHeader /> : <DefaultHeader />) }
        <Divider />

        <CardContent>
          
          <Typography sx={{marginBottom: 1, lineHeight: 1}} variant="h5" component={"div"}>
            <Typography variant="overline" component={"div"}>
              <sup>
                FULFIL BY 
              </sup>
            </Typography>
            {'  '}
            { 
              timeString
            }
            {'  '}

          </Typography>

          <Divider variant="middle" />

        </CardContent>

        <Grid container>

          <Grid item>

            <List sx={{ width: '100%' }} subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                ITEMS
              </ListSubheader>
              }>

              <OrderList orderCompletion = { orderCompletion } setOrderCompletion = { setOrderCompletion } />

            </List>
          </Grid>
        </Grid>
      </Card>
  )
}

export default NewCard
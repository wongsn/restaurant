import React from 'react'
import PaginationBar from './PaginationBar'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Badge from '@mui/material/Badge';


const StatusBar = ({orders}) => {

  const openOrders = orders.filter(order=> order.status == "processing")
  const openOrdersQty = openOrders.length
  const closedOrders = orders.filter(order => order.status == "completed")
  const closedOrdersQty = closedOrders.length

  const fulfilmentTime = closedOrders.reduce((accumulator, current)=> {
    let timeTaken = 0
    if (current.completed_at) {
      const orderedTime = DateTime.fromISO(current.created_at)
      const completedTime = DateTime.fromISO(current.completed_at)
      timeTaken = completedTime.diff(orderedTime).toObject()
    } 

    return accumulator + timeTaken 
  }, 0)

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
     <BottomNavigation showLabels>
       <BottomNavigationAction
        label="Completed Today"
        value="completed"
        icon={ <Badge badgeContent={closedOrdersQty} color="secondary">
                <AssignmentTurnedInIcon color="action" />
              </Badge> }
      />
      
      <BottomNavigationAction
        label="Open Orders"
        value="open"
        icon={<Badge badgeContent={openOrdersQty} color="secondary">
                <KitchenIcon color="action" />
              </Badge>}
      />
      <BottomNavigationAction
        label="Fulfilment Rate"
        value="fulfilmentRate"
        icon={"16.4/hr"}
      />
      <BottomNavigationAction label="Avg Time" value="folder" icon={fulfilmentTime} />
    </BottomNavigation>
    </Paper>
  )
}

export default StatusBar

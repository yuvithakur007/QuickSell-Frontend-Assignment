import Todo from './Todo.jsx'
import '../style/todos.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Todos({ setSelectedGrouping,sortBy,setSortBy}) {
  const [allData, setAllData] = useState({ tickets: [], users: [] });
  const [sortOrder, setSortOrder] = useState('desc');
  const selectedGrouping = localStorage.getItem('selectedGrouping') || 'user';

  
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      const storedValue = localStorage.getItem('selectedGrouping');
    	setSelectedGrouping(storedValue || 'user');
  }, []);

  const isUserAvailable = (userID) => {
    
    const user = allData.users.find((user) => user.id === userID);
    return  user.available; 
  };
  allData.users.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  const handleSortByPriority = () => {
    if (sortBy === 'priority') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy('priority');
      setSortOrder('desc');
    }
  };

  const handleSortByTitle = () => {
    if (sortBy === 'title') {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {

      setSortBy('title');
      setSortOrder('asc');
    }
  };

  const sortedTickets = allData.tickets.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityDiff = a.priority - b.priority;
      return sortOrder === 'asc' ? priorityDiff : -priorityDiff;
    } else if (sortBy === 'title') {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      const titleComparison = titleA.localeCompare(titleB);
      return sortOrder === 'asc' ? titleComparison : -titleComparison;
    }
    return 0;
  });


   // grouping by user
  const groupedTickets = {};
  allData.tickets.forEach((ticket) => {
    const userId = ticket.userId;
    if (!groupedTickets[userId]) {
      groupedTickets[userId] = [];
    }
    groupedTickets[userId].push(ticket);
  });
  
  // grouping by status
  const groupedStatus = {};
  allData.tickets.forEach((ticket) => {
    const status = ticket.status;
    if (!groupedStatus[status]) {
      groupedStatus[status] = [];
    }
    groupedStatus[status].push(ticket);
  });


  //grouping by priority
  const groupedPriority = {};
  allData.tickets.forEach((ticket)=>{
    const priority = ticket.priority;
    if(!groupedPriority[priority]){
      groupedPriority[priority]=[];
    }
    groupedPriority[priority].push(ticket);
  })


  const renderGroupedData = () => {
    switch (selectedGrouping) {
      case 'status':
        return (
          <>
            {Object.keys(groupedStatus).map((status) => (
              <Todo
                key={status}
                status={status}
                groupedTickets={groupedStatus[status]}
                groupMode={'status'}
                isUserAvailable={isUserAvailable}
              />
            ))}
          </>
        );
      case 'priority':
        return (
          <>
            {Object.keys(groupedPriority).map((priority) => (
              <Todo
                key={priority}
                priority={priority}
                groupedTickets={groupedPriority[priority]}
                isUserAvailable={isUserAvailable}
                groupMode={"priority"}
              />
            ))}
          </>
        );
      default:
        return (
          <>
            {allData.users.map((user) => (
              <Todo
                key={user.id}
                user={user}
                groupedTickets={groupedTickets[user.id]}
                isUserAvailable={isUserAvailable}
                groupMode={"user"}
              />
            ))}
          </>
        );
    }
  };



  return (
    <div className='todos'>    
      {renderGroupedData()}
    </div>
  )
}

export default Todos;

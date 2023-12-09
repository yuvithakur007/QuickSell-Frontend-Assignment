import '../style/todo.css'
import { MdOutlineSignalCellularAlt1Bar } from "react-icons/md";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { MdSignalCellularAlt } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

function Todo(props) {
  const {groupedTickets,user,priority,groupMode,status} = props;
  const iconMapping = {
    'Todo': 'fa-regular fa-circle',
    'In progress': 'fa-solid fa-spinner',
    'Backlog': 'fa-solid fa-stream'
  };
 
  const priorityMapping = {
    0: 'No priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
  };

  const priorityIconMapping = {
    0: <HiMiniEllipsisHorizontal/>  ,
    1: <MdOutlineSignalCellularAlt1Bar/>,
    2: <MdSignalCellularAlt2Bar/>,
    3: <MdSignalCellularAlt/>,
    4: <FcHighPriority />

  };
  
  const renderPriorityIcon = (level) => {
    const icon = priorityIconMapping[level];
    return <>{icon}</>;
  };
  
  const renderPriorityHeading = (level) => {
    const heading = priorityMapping[level] || 'No priority';
    return heading;
  };
  
  const renderIconStatus = (state) => {
    const iconClass = iconMapping[state] || 'fa-regular fa-circle'; 
    return <i className={iconClass}></i>;
  };

  const renderTop = ()=>{
    switch(groupMode){
      case 'status':
       return(
         <>
          <div className='menu-item'>
          {renderIconStatus(status)}
         {status}
          </div>
         </>
       )
       case 'priority':
        return(
          <>
           
          {renderPriorityIcon(priority)}
            {renderPriorityHeading(priority)}
            <p>{groupedTickets.length}</p> 
          </>
        )

      default:
        return(
          <>
          <img src="https://images.unsplash.com/photo-1618193139062-2c5bf4f935b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
                 <h1> {user.name}</h1>
                 <p>{groupedTickets.length}</p> 
          </>
        )
    }

  }
   
  return (
    <div className="todo">
         <div className='todo-info'>
            <div className='info-about'>
                {renderTop()}
            </div>

            <div className="info-options">
            <i className="fa-solid fa-plus"></i>
            <i className="fa-solid fa-ellipsis"></i>
            </div>
         </div>


         {groupedTickets.map((data)=>{
           const isUserAvailable = props.isUserAvailable
           const userAvailable = isUserAvailable(data.userId);
          return(
            <div key={data.id} className='todo-task'>
            <div className='todo-task-header'>
       
              <h1>{data.id}</h1>
              {groupMode!='user'? <>
              <img src="https://images.unsplash.com/photo-1618193139062-2c5bf4f935b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D" alt="profile-image"/>
            <style>
            {`
              .todo-task-header::before {
               background-color: ${ userAvailable ? 'green' : '#CCC'};
                }
                .todo-task-header::before {
                  border: ${groupMode !== 'user' ? '1px solid #ccc' : 'none'};
                }
             `}
            </style></> : ""}
            </div>
            <div className='todo-task-text'>
             
            {groupMode=='status' ? "" : renderIconStatus(data.status)  }

            <p>{data.title}</p>
            </div>

            <div className='todo-task-options'>
              {groupMode != 'priority' ? <i className="fa-solid fa-ellipsis"></i> : ""}
             <div className='todo-task-options-request'>
             { groupMode != 'priority'  ?  renderPriorityIcon(priority) : ''}
              <p>Feature Request</p>
            </div> 
            </div>
         </div>
          )
         })}
    </div>
  )
}

export default Todo
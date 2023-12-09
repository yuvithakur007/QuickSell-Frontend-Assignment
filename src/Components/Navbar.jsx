import { useState } from 'react';
import { CDropdownMenu, CDropdownItem, CDropdownToggle } from "@coreui/react";
import '../style/navbar.css';

function Navbar({ selectedGrouping, setSelectedGrouping }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isStatusDropdownVisible, setStatusDropdownVisible] = useState(false);
  const [isPriorityDropdownVisible, setPriorityDropdownVisible] = useState(false);

  // States to manage the current selected values
  const [orderingValue, setOrderingValue] = useState('priority');

  // Dropdown options
  const statusOptions = ['user', 'status', 'priority'].filter(option => option !== selectedGrouping);
  const orderingOptions = ['Title', 'Date', 'Priority'].filter(option => option !== orderingValue);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownVisible(!isStatusDropdownVisible);
  };

  const togglePriorityDropdown = () => {
    setPriorityDropdownVisible(!isPriorityDropdownVisible);
  };

  const handleGroupingItemClick = (value) => {
    setSelectedGrouping(value);
    setStatusDropdownVisible(false); // Close the dropdown after selection
  };

  const handleOrderingItemClick = (value) => {
    setOrderingValue(value);
    setPriorityDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <>
      <div className="navbar">
        <div className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            <i className="fa-solid fa-bars hamburgerIcon"></i>
            Display
            <i className="fa-solid fa-chevron-down dropdownIcon"></i>
          </button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <div className="row1">
                <p className='grouping'>Grouping</p>
                <div className="groupingProperties">
                  <CDropdownToggle className="dropdown-button-one" onClick={toggleStatusDropdown}>
                    {selectedGrouping}
                    <i className="fa-solid fa-chevron-down innerDropdown"></i>
                  </CDropdownToggle>
                  {isStatusDropdownVisible && (
                    <div className="userDropdown">
                      {statusOptions.map(option => (
                        <CDropdownItem key={option} onClick={() => handleGroupingItemClick(option)}>
                          {option}
                        </CDropdownItem>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="row1">
                <p className='grouping'>Ordering</p>
                <div className="">
                  <CDropdownToggle className="dropdown-button-one" onClick={togglePriorityDropdown}>
                    {orderingValue}
                    <i className="fa-solid fa-chevron-down innerDropdown"></i>
                  </CDropdownToggle>
                  {isPriorityDropdownVisible && (
                    <div className="priorityDropdown">
                      {orderingOptions.map(option => (
                        <CDropdownItem key={option} onClick={() => handleOrderingItemClick(option)}>
                          {option}
                        </CDropdownItem>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Add more dropdown items here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

import React from 'react';


const Rank = ({name, entries}) => {

  var user= JSON.parse(localStorage.getItem('user'))


  return (

    <div>
      <div className='white f3'>
        {`${user.name}, your current entry count is...`}
      </div>
      <div id ="entries" className='white f1'>
        {user.entries}
      </div>
    </div>
  );
}

export default Rank;

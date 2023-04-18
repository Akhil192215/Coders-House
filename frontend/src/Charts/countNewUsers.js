export const countNewUsers = (users,timePeriod)=>{
  
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timePeriod);
  
    const endDate = new Date();
  
    // Filter the users array to only include those that were created between the start and end dates
    const newUsers = users.filter(user => {
      const userCreatedDate = new Date(user.created_at);
      return userCreatedDate >= startDate && userCreatedDate <= endDate;
    });
  
    // Group the new users by week
    const weeks = {};
    newUsers.forEach(user => {
      const weekStart = new Date(user.created_at);
      weekStart.setHours(0, 0, 0, 0);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
  
      const week = `${weekStart.getMonth()+1}/${weekStart.getDate()}/${weekStart.getFullYear()} - ${weekEnd.getMonth()+1}/${weekEnd.getDate()}/${weekEnd.getFullYear()}`;
      if (weeks[week]) {
        weeks[week]++;
      } else {
        weeks[week] = 1;
      }
    });
  
    // Return an array of objects containing the week and the number of new users for that week
    return Object.keys(weeks).map(week => {
    return { week, new_users: weeks[week] };
    });
}
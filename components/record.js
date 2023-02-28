const Records = ({data}) => {
    
  return (  
    <table className="table">
        <thead>
            <tr>
                <th scope='col'>ID</th>
                <th scope='col'>First Name</th>

            </tr>
        </thead>
        <tbody>
            {data?.map(item => (
                <tr>
                    <td>{item.id} </td>
                    <td>{item.nama} </td>
                </tr>
            ))}
        </tbody>
    </table>
  ) 
}

export default Records 
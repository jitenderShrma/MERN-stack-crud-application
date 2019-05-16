import React from 'react'
import { Link } from 'react-router-dom';
export default () => {
  return (
    <div className="my-4">
      <div className="text-center">
        <h3>
        404 Error 
        </h3>
        <p>Page Not found go to <Link to="/">HOME</Link></p>
      </div>
    </div>
  )
}

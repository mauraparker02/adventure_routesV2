import React from 'react';
import { Row, Col, } from 'react-materialize';
import './style.css'


//PortCard standing for Portfolio Cards 

function FavRouteCard (props){
  return (
    <Row>
  <Col
    m={6}
    s={12}
  >
      <div className="card">
      <div className="card-action">
      <img src="/icons/empty_user.png" height="35px" width="auto"/>
      <a href="#">{props.username}</a> 
        </div>
     
        <div className="image-wrapper">
        <div className="card-image">
          <img src="/testimgs/stock_image.jpg"/>
        </div>
        </div>
        <div className="card-content">
        <span className="card-title">{props.name}</span>
          <p>{props.description}</p>
        </div>
        <div className="card-action">
          {/* <button type="submit"><img src="/icons/heart_icon.png" alt="like" height="15px" width="auto"/></button> */}
          <a class="btn-floating  waves-effect waves-red white"><i class="material-icons"><img src="/icons/heart_icon.png" alt="like" height="15px" width="auto"/></i></a>
        </div>
      </div>
      </Col>
      </Row>
  );
} 

export default FavRouteCard; 
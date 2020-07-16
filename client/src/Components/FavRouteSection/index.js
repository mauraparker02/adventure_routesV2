import React from "react";
import { Row, Col, } from 'react-materialize';

import FavRouteCard from "./FavRouteCard";

import './style.css'

function FavRouteSection(props) {
    return (
        <div>
            {props.routes.map((route, i) =>
                <Row key={i.toString()}>
                    <Col m={3} />
                    <Col m={6}><FavRouteCard username={props.username} deleteRoute={props.deleteRoute} route={route} /></Col>
                    <Col m={3} />
                </Row>
            )}
        </div>
    )
}

export default FavRouteSection;
import React from "react";
import { Row, Col, } from 'react-materialize';

import FavRouteCard from "./FavRouteCard";

import './style.css'

function FavRouteSection(props) {
    return (
        <Row>
            <div className="route-cards">
                {props.routes.map((route, i) =>
                    <Col m={6} s={12} l={4} xl={3} className="route-col">
                        <FavRouteCard username={props.username} deleteRoute={props.deleteRoute} route={route} />
                    </Col>
                )}
            </div>
        </Row>
    )
}

export default FavRouteSection;
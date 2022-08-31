import React from "react";
import { Col, Row } from "antd";
import { AdoptionItem } from "./AdoptionItem";
import pets from "../../data/pets.json";

export const AdoptionContainer: React.FC = () => {


  return <Row>
    { pets.map(pet =>
      <Col key={ `${ pet.id }_${ pet.name }` } xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } xl={ 6 }>
        <AdoptionItem { ...pet }/>
      </Col>,
    ) }

  </Row>;
};

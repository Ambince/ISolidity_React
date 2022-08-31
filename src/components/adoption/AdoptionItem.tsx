import React from "react";
import { Button, Card, notification } from "antd";
import styles from "./Adoption.module.css";
import { NotificationPlacement } from "antd/lib/notification";

const {Meta} = Card;

interface PetInfo {
  id: number,
  name: string,
  picture: string,
  age: number,
  breed: string,
  location: string,
  active?: boolean,

}


const AdoptionTitle: React.FC<PetInfo> = (petInfo) => {
  return (
    <div className={ styles["adoption_container_title"] }>
      <span>{ petInfo.name }</span>
      <span>{ petInfo.age }</span>
    </div>
  );
};


export const AdoptionItem: React.FC<PetInfo> = (petInfo) => {

  const onAdopt = (adoptId: number, placement: NotificationPlacement) => {
    notification.info({
      message: `Notification ${ adoptId } `,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
      duration: 1,
    });
  };

  return <Card
    style={ {margin: "10px", borderRadius: "20px"} }
    bordered
    hoverable
    cover={ <img alt="example" src={ petInfo.picture }/> }
    title={ <AdoptionTitle { ...petInfo }/> }
  >
    <div className={ styles["adoption_container"] }>
      <Button type="primary" shape="round" size="large" onClick={ () => onAdopt(petInfo.id, "top") }>领养</Button>
      <span>{ petInfo.location }</span>
    </div>

  </Card>;
};

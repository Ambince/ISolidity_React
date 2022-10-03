import React, { useEffect, useState } from "react";
import { Button, Card, notification } from "antd";
import styles from "./Adoption.module.css";
import { NotificationPlacement } from "antd/lib/notification";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";


interface PetInfo {
  id: number,
  name: string,
  picture: string,
  age: number,
  breed: string,
  location: string,
  active?: boolean,
  address?: string,
  deployedContract?: any,
}


const AdoptionTitle: React.FC<PetInfo> = (petInfo) => {
  return (
    <div className={ styles["adoption_container_title"] }>
      <span>{ petInfo.name }</span>
      <span>{ petInfo.age }</span>
    </div>
  );
};


export const AdoptionItem: React.FC<PetInfo> = ({address, deployedContract, ...petInfo}) => {
  const {account} = useWeb3React<Web3Provider>();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (address !== "0x0000000000000000000000000000000000000000") {
      setActive(true);
    }
  }, [active]);

  const onAdopt = async (adoptId: number, placement: NotificationPlacement) => {
    const result = await deployedContract.adopt(adoptId, {from: account});

    notification.info({
      message: `Notification `,
      description: `交易记录${ result.tx } `,
      placement,
      duration: 1,
    });
    setActive(false);
  };

  return <Card
    style={ {margin: "10px", borderRadius: "20px"} }
    bordered
    hoverable
    cover={ <img alt="example" src={ petInfo.picture }/> }
    title={ <AdoptionTitle { ...petInfo }/> }
  >
    <div className={ styles["adoption_container"] }>
      <Button type="primary" disabled={ active } shape="round" size="large" onClick={ () => onAdopt(petInfo.id, "top") }>
        { petInfo.active ? "已被领养" : "领养" }
      </Button>
      <span>{ petInfo.location }</span>
    </div>

  </Card>;
};

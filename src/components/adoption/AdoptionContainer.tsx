import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
// @ts-ignore
import TruffleContract from "truffle-contract";
import Adoption from "../../data/Adoption.json";
import { Web3Provider } from "@ethersproject/providers";
import { AdoptionItem } from "./AdoptionItem";
import pets from "../../data/pets.json";

export const AdoptionContainer: React.FC = () => {

  const injectedConnector = new InjectedConnector({supportedChainIds: [1, 3, 4, 5, 42]});
  const {chainId, activate, library} = useWeb3React<Web3Provider>();
  const [adapters, setAdapters] = useState([]);
  const [deployedContract, setDeployedContract] = useState(null);


  useEffect(() => {
    activate(injectedConnector).then(() => initContract());
  }, [chainId]);

  async function initContract() {
    if (library) {
      console.log("[library]", library?.provider);
      const MyContract = TruffleContract(Adoption);
      MyContract.setProvider(library?.provider);
      const deployedContract = await MyContract.deployed();
      setDeployedContract(deployedContract);
      const adapters: [] = await deployedContract.getAdopters.call();
      console.log("[adapters 事例]", adapters);
      setAdapters(adapters);
    }
  }


  return <>
    { adapters.length > 0 && <Row>
      { pets.map((pet, index) =>
        <Col key={ `${ pet.id }_${ pet.name }` } xs={ 24 } sm={ 12 } md={ 8 } lg={ 8 } xl={ 6 }>
          <AdoptionItem { ...pet } address={ adapters[index] } deployedContract={ deployedContract }/>
        </Col>,
      ) }

    </Row> }
  </>;
};

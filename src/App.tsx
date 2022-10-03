import React from "react";
import { Layout } from "antd";
import "./App.css";
import { AdoptionContainer } from "./components";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const {Header, Footer, Content} = Layout;

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}


const App = () => (
  <Web3ReactProvider getLibrary={ getLibrary }>
    <Layout>
      <Header className="main_header">Header</Header>
      <Content className="content">
        <AdoptionContainer/>
      </Content>
      <Footer className="main_header">Footer</Footer>
    </Layout>
  </Web3ReactProvider>
);

export default App;

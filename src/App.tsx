import React from "react";
import { Layout } from "antd";
import "./App.css";
import { AdoptionContainer } from "./components";

const {Header, Footer, Content} = Layout;

const App = () => (
  <Layout>
    <Header className="main_header">Header</Header>
    <Content className="content">
      <AdoptionContainer/>
    </Content>
    <Footer className="main_header">Footer</Footer>
  </Layout>
);

export default App;

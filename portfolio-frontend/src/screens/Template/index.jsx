import React from "react";

import { MainContainer } from "./styles";
import Terminal from 'terminal-in-react'

import { sendCommand } from "../../services/functions";

const Template = () => {
  return (
    <MainContainer>
    <div
      style={{
        width: "80vw",
        height: "60vh"
      }}
    >
       <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          commandPassThrough={
            (cmd, stdout) => {
              sendCommand(cmd).then(result => {
                stdout(result['stdout'])
              })
            }
          }
          hideTopBar
          startState="maximised"
      />
    </div>
    </MainContainer>
  );
};

export default Template;

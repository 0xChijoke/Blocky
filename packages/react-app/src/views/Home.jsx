import { Container, Heading } from "@chakra-ui/react";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import { InputHandler, Player, Background } from "../components";
import React from "react";
import { layer1, layer2, layer3, layer4, layer5, player } from "../image";


/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  window.addEventListener("load", function () {
    const loading = this.document.getElementById("loading");
    loading.style.display = "none";
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 10;
    canvas.height = 500;

    class Game {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.groundMargin = 80;
        this.speed = 3;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler();
      }
      update(deltaTime) {
        this.background.update();
        this.player.update(this.input.key, deltaTime);
      }
      draw(context) {
        this.background.draw(context);
        this.player.draw(context);
      }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);
      requestAnimationFrame(animate);
    }
    animate(0);
  });

  return (
    <Container w={"100%"} h={"full"} m={0} p={0} align={"center"}>
      <canvas
        id="canvas1"
        style={{
          border: "5px solid black",
          margin: 0,
          padding: 0,
        }}
      ></canvas>
      <img style={{ display: "none" }} id="player" alt="player" src={player}></img>
      <img style={{ display: "none" }} id="layer1" alt="layer1" src={layer1}></img>
      <img style={{ display: "none" }} id="layer2" alt="layer2" src={layer2}></img>
      <img style={{ display: "none" }} id="layer3" alt="layer3" src={layer3}></img>
      <img style={{ display: "none" }} id="layer4" alt="layer4" src={layer4}></img>
      <img style={{ display: "none" }} id="layer5" alt="layer5" src={layer5}></img>
    </Container>
  );
}

export default Home;

﻿/*
Source file name: game.js
Author's name:    RenFa Feng
Last Modified by: RenFa Feng
Date last Modified: Nov. 16th 2014
Program description: This program is using for dominate the whole game.
Revision History: Nov. 6th First version.
Nov. 13th Begin new project.
Nov. 14th Finish screens.
Nov. 15th Finish all functions, Final version.
Class & Functions:  preload();
init();
optimizeForMobile();
gameLoop(event);
changeState(state: number);
*/
/// <reference path="constants.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/coin.ts" />
/// <reference path="objects/road.ts" />
/// <reference path="objects/car.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="managers/collision.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/instructions.ts" />
/// <reference path="states/gameover.ts" />
// Side Scroller - Added basic state machine structure - Added Button and Label classe
// Changed online repo
var stage;
var game;

var road;
var car;
var coin;
var bullets = [];
var scoreboard;

var collision;

var tryAgain;
var playButton;
var playButton2;
var instructionsButton;

var currentState;
var currentStateFunction;

// Preload function - Loads Assets and initializes game;
function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

// init called after Assets have been loaded.
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(30);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    optimizeForMobile();

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// Add touch support for mobile devices
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

// Game Loop
function gameLoop(event) {
    currentStateFunction();
    stage.update();
}

function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;

        case constants.INSTRUCTIONS_STATE:
            // instructions screen
            currentStateFunction = states.instructionsState;
            states.instructions();
            break;

        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;

        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;

            // instantiate game over screen
            states.gameOver();
            break;
    }
}

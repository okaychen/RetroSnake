/**
* snake.js
* @author okaychen -=彡 大山深处修炼的小龙虾
* @description  
* @created Fri Dec 01 2017 11:24:41 GMT+0800 (中国标准时间)
* @copyright None 
* None
* @last-modified Fri Dec 01 2017 17:08:44 GMT+0800 (中国标准时间)
*/
(function () {
    // Canvas & Context
    var canvas;
    var ctx;
    // Snake
    var snake;
    var snake_dir;
    var snake_next_dir;
    var snake_speed;
    // Food
    var food = {
        x: 0,
        y: 0
    };
    // score
    var score;
    // wall
    var wall;
    // HTML Elements
    var screen_snake;
    var screen_menu;
    var screen_settings;
    var screen_gameover;
    var button_newgame_menu;
    var button_newgame_settings;
    var button_newgame_gameover;
    var button_setting_menu;
    var button_setting_gameover;
    var ele_score;
    var speed_setting;
    var wall_setting;

    /*-------------*/
    var activeDot = function (x, y) {
        ctx.fillStyle = '#eeeeee';
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }

    // 0 show the game (canvas)
    // 1 show the main menu 
    // 2 show the settings menu
    // 3 show the gameover menu
    var showScreen = function (screen_opt) {
        switch (screen_opt) {
            case 0:
                screen_snake.style.display = "block";
                screen_menu.style.display = "none";
                screen_settings.style.display = "none";
                screen_gameover.style.display = "none";
                break;
            case 1:
                screen_snake.style.display = "none";
                screen_menu.style.display = "block";
                screen_settings.style.display = "none";
                screen_gameover.style.display = "none";
                break;
            case 2:
                screen_snake.style.display = "none";
                screen_menu.style.display = "none";
                screen_settings.style.display = "block";
                screen_gameover.style.display = "none";
                break;
            case 3:
                screen_snake.style.display = "none";
                screen_menu.style.display = "none";
                screen_settings.style.display = "none";
                screen_gameover.style.display = "block";
                break;
        }

    }


    window.onload = function () {
        canvas = document.getElementById('snake');
        ctx = canvas.getContext('2d');
        // Screen
        screen_snake = document.getElementById('snake');
        screen_menu = document.getElementById('menu');
        screen_gameover = document.getElementById('gameOver');
        screen_settings = document.getElementById('settings');
        // Buttons
        button_newgame_menu = document.getElementById('newgame_menu');
        button_newgame_setting = document.getElementById('newgame_setting');
        button_newgame_gameover = document.getElementById('newgame_gameOver');
        button_setting_menu = document.getElementById('setting_menu');
        button_setting_gameover = document.getElementById('setting_gameOver');
        // etc
        ele_score = document.getElementById('score_value');
        speed_setting = document.getElementsByName('speed');
        wall_setting = document.getElementsByName('wall');

        // -------------
        button_newgame_menu.onclick = function () {

        };
        button_setting_menu.onclick = function () {
            showScreen(2)
        };
        button_setting_gameover.onclick = function () {
            showScreen(2)
        };

        showScreen("menu");


    }
})()




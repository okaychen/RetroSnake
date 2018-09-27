/**
* snake.js
* @author okaychen
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
        ctx.fillStyle = "#eee";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }

    // changer dir
    var changeDir = function (key) {
        if (key == 38 && snake_dir != 2) {
            snake_next_dir = 0;
        } else {
            if (key == 39 && snake_dir != 3) {
                snake_next_dir = 1;
            } else {
                if (key == 40 && snake_dir != 0) {
                    snake_next_dir = 2;
                } else {
                    if (key == 37 && snake_dir != 1) {
                        snake_next_dir = 3;
                    }
                }
            }
        }
    }

    // add food
    var addFood = function () {
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for (var i = 0; i < snake.length; i++) {
            // 如果食物被吃就增加食物
            if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
                addFood();
            }
        }
    }

    var checkBlock = function (x, y, _x, _y) {
        return (x == _x && y == _y) ? true : false;
    }

    ////////////////////////////////////////////
    var altScore = function (score_val) {
        ele_score.innerHTML = String(score_val);
    }
    ////////////////////////////////////////////
    var mainLoop = function () {
        var _x = snake[0].x;
        var _y = snake[0].y;
        snake_dir = snake_next_dir;
        //  0 — up  1 — right   2 — down  3 — left
        switch (snake_dir) {
            case 0:
                _y--;
                break;
            case 1:
                _x++;
                break;
            case 2:
                _y++;
                break;
            case 3:
                _x--;
                break;
        }
        snake.pop();
        snake.unshift({
            x: _x,
            y: _y
        })

        // --wall
        if (wall == 1) {
            if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10) {
                showScreen(3);
                return;
            }
        } else {
            //  off 无墙
            for (var i = 0, x = snake.length; i < x; i++) {
                if (snake[i].x < 0) {
                    snake[i].x = snake[i].x + (canvas.width / 10);
                }
                if (snake[i].x == canvas.width / 10) {
                    snake[i].x = snake[i].x - (canvas.width / 10);
                }
                if (snake[i].y < 0) {
                    snake[i].y = snake[i].y + (canvas.height / 10);
                }
                if (snake[i].y == canvas.height / 10) {
                    snake[i].y = snake[i].y - (canvas.height / 10);
                }
            }
        }

        //  Autophagy death
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                showScreen(3);
                return;
            }
        }

        // Eat food
        if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
            snake[snake.length] = {
                x: snake[0].x,
                y: snake[0].y
            };
            score += 1;
            altScore(score);
            addFood();
            activeDot(food.x, food.y);
        }

        // --------------------

        ctx.beginPath();
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --------------------

        for (var i = 0; i < snake.length; i++) {
            activeDot(snake[i].x, snake[i].y);
        }

        // --------------------

        activeDot(food.x, food.y);

        setTimeout(mainLoop, snake_speed);
    }

    var newGame = function () {

        showScreen(0);
        screen_snake.focus();

        snake = [];
        for (var i = 4; i >= 0; i--) {
            snake.push({
                x: i,
                y: 15
            });
        }

        snake_next_dir = 1;

        score = 0;
        altScore(score);

        addFood();

        canvas.onkeydown = function (evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();

    }


    // Change the snake speed...
    // 150 = slow
    // 100 = normal
    // 50 = fast
    var setSnakeSpeed = function (speed_value) {
        snake_speed = speed_value;
    }

    ////////////////////////////////////////////
    var setWall = function (wall_value) {
        wall = wall_value;
        if (wall == 0) {
            screen_snake.style.borderColor = '#606060';
        }
        if (wall == 1) {
            screen_snake.style.borderColor = '#FFF';
        }
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
            newGame();
        };
        button_newgame_gameover.onclick = function () {
            newGame();
        };
        button_newgame_setting.onclick = function () {
            newGame();
        };
        button_setting_menu.onclick = function () {
            showScreen(2);
        };
        button_setting_gameover.onclick = function () {
            showScreen(2)
        };

        setSnakeSpeed(150);
        setWall(1);

        showScreen("menu");

        // --------------------
        // Settings

        // speed
        for (var i = 0; i < speed_setting.length; i++) {
            speed_setting[i].addEventListener("click", function () {
                for (var i = 0; i < speed_setting.length; i++) {
                    if (speed_setting[i].checked) {
                        setSnakeSpeed(speed_setting[i].value);
                    }
                }
            });
        }

        // wall
        for (var i = 0; i < wall_setting.length; i++) {
            wall_setting[i].addEventListener("click", function () {
                for (var i = 0; i < wall_setting.length; i++) {
                    if (wall_setting[i].checked) {
                        setWall(wall_setting[i].value);
                    }
                }
            });
        }

        document.onkeydown = function (evt) {
            if (screen_gameover.style.display == "block") {
                evt = evt || window.event;
                if (evt.keyCode == 32) {
                    newGame();
                }
            }
        }
    }

})()




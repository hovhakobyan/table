var ctx = myCanvas.getContext("2d");
var xx = myCanvas.width, yy = myCanvas.height;
var sett, rSett, q, img = new Image(), img_bg = new Image(), img_ball = new Image();
var s_font = '24px RobotoBold', v_font = '18px RobotoRegular', d_font = '16px RobotoLight';
var src = 'img/';
var textObj, imgObj, bgColor;
window.onload = function() {content();loadFonts();};
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 10000 / 600);
        };
})();
window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 10000 / 600);
        };
})();
function content() {
    img_bg.src = 'img/background.png';
    img_bg.onload = function() {
        ctx.drawImage(img_bg, 0, 0, xx, yy);
    };
}
function clearIntervals(){
    window.cancelAnimationFrame(rSett);
    window.clearInterval(sett);
}
function loadFonts(){
    ctx.beginPath();
    ctx.font = s_font;
    ctx.fillText('',0,0);
    ctx.font = v_font;
    ctx.fillText('',0,0);
    ctx.font = d_font;
    ctx.fillText('',0,0);
    ctx.stroke();
}

function roundRect(x, y, width, height, radius) {
    ctx.lineWidth = .1;
    ctx.globalAlpha = .7;
    ctx.strokeStyle = "#22436e";
    ctx.fillStyle = "#22436e";
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function roundRectSmall(x, y, width, height, radius,bg) {
    ctx.lineWidth = .1;
    ctx.globalAlpha = .7;
    ctx.strokeStyle = bg;
    ctx.fillStyle = bg;
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function draw(textObj,imgObj) {
    clearIntervals();
    q = 1;
    function Show() {
        q += 4;
        rSett = q > 115 ? false : true;
        if(!rSett) return;
        ctx.clearRect(0, 0, xx, yy);
        ctx.drawImage(img_bg, 0, 0, xx, yy);
        ctx.save();
        roundRect(120,120-q/2,230,q+10,10);
        ctx.restore();

        //Text
        ctx.textAlign = 'center';
        textObj.text1 && (ctx.font = textObj.text1[3] || '18px RobotoRegular');
        textObj.text1 && (ctx.fillStyle = textObj.text1[4] || '#fff');
        textObj.text1 && ctx.fillText(textObj.text1[0],textObj.text1[1],textObj.text1[2] - 110 + q, 220);

        textObj.text2 && (ctx.font = textObj.text2[3] || '18px RobotoRegular');
        textObj.text2 && (ctx.fillStyle = textObj.text2[4] || '#fff');
        textObj.text2 && ctx.fillText(textObj.text2[0],textObj.text2[1],textObj.text2[2] - q, 220);

        //Img
        imgObj.img && (img.src = src + imgObj.img[0]);
        imgObj.img && ctx.drawImage(img,imgObj.img[1],imgObj.img[2] - 110 + q);

    }
    (function loop() {
        Show();
        if(!rSett) return;
        window.requestAnimFrame(loop);
    })();
}
function drawSmall(textObj,bg) {
    clearIntervals();
    ctx.clearRect(0, 0, xx, yy);
    ctx.drawImage(img_bg, 0, 0, xx, yy);
    ctx.save();
    roundRectSmall(120,63,230,124,10,bg);
    ctx.restore();

    //Text
    ctx.textAlign = 'center';
    textObj.text1 && (ctx.font = textObj.text1[3] || '18px RobotoRegular');
    textObj.text1 && (ctx.fillStyle = textObj.text1[4] || '#fff');
    textObj.text1 && ctx.fillText(textObj.text1[0],textObj.text1[1],textObj.text1[2], 220);

    textObj.text2 && (ctx.font = textObj.text2[3] || '18px RobotoRegular');
    textObj.text2 && (ctx.fillStyle = textObj.text2[4] || '#fff');
    textObj.text2 && ctx.fillText(textObj.text2[0],textObj.text2[1],textObj.text2[2], 220);

}

function timeoutStart() {
    textObj = {
        text2: ['TIMEOUT START','235','275',v_font]
    };
    imgObj = {
        img: ['timeout.png','213','80']
    };
    draw(textObj,imgObj);
}
function timeoutStop() {
    textObj = {
        text2: ['TIMEOUT STOP','235','275',v_font]
    };
    imgObj = {
        img: ['timeoutOver.png','213','80']
    };
    draw(textObj,imgObj);
}
function gameEnd() {
    textObj = {
        text1: ['GAME END','235','135','34px RobotoBold']
    };
    bgColor = '#22436e';
    drawSmall(textObj,bgColor);
}
function startGame() {
    textObj = {
        text1: ['GAME START','235','135','34px RobotoBold']
    };
    bgColor = '#22436e';
    drawSmall(textObj,bgColor);
}
function cancelEvent() {
    textObj = {
        text2: ['CANCEL EVENT','235','275',v_font]
    };
    imgObj = {
        img: ['cancel.png','213','80']
    };
    draw(textObj,imgObj);
}
function matchStart() {
    textObj = {
        text1: ['MATCH','235','115','34px RobotoBold'],
        text2: ['STARTED','235','160','34px RobotoBold']
    };
    bgColor = '#22436e';
    drawSmall(textObj,bgColor);
}
function matchCancel() {
    textObj = {
        text2: ['MATCH CANCELLED','235','275',v_font]
    };
    imgObj = {
        img: ['cancel.png','213','80']
    };
    draw(textObj,imgObj);
}
function endGame() {
    textObj = {
        text1: ['END GAME','235','135','34px RobotoBold']
    };
    bgColor = '#22436e';
    drawSmall(textObj,bgColor);
}
function betStart() {
    textObj = {
        text1: ['BET START','235','135','34px RobotoBold']
    };
    bgColor = '#47ba2c';
    drawSmall(textObj,bgColor);
}
function betStop() {
    textObj = {
        text1: ['BET STOP','235','135','34px RobotoBold']
    };
    bgColor = '#ec2f2f';
    drawSmall(textObj,bgColor);
}
function point() {
    clearIntervals();
    var i = 0, d = 0;
    var team = 1;
    q = 1;
    img.src = src + 'trbg.png';
    img_ball.src = src + 'ball.png';
    img.onload = function () {};
    img_ball.onload = function () {};
    function Show() {
        clearIntervals();
        rSett = q > 140 ? false : true;
        if(rSett) q += 4;
        ctx.clearRect(0, 0, xx, yy);
        ctx.drawImage(img_bg, 0, 0, xx, yy);
        ctx.save();
        roundRect(120,120-q/2,230,q+10,10);
        ctx.restore();

        ctx.fillStyle = '#fff04b';
        ctx.font = '34px RobotoBold';
        ctx.textAlign = 'center';
        ctx.fillText('POINT', 235, q - 25, 220);

        ctx.fillStyle = '#fff';
        ctx.font = '18px RobotoBold';
        ctx.fillText('2 - 0', 235, 310 - q, 220);

        ctx.font = d_font;
        switch(team){
            case 1 :
                ctx.fillText('Team Name', 375 - q, 145, 220);
                break;
            case 2 :
                ctx.fillText('Team Name', q + 92, 145, 220);
                break;
        }
    }
    (function loop() {
        Show();
        if(!rSett) {
            rect();
            return;
        }
        window.requestAnimFrame(loop);
    })();

    function rect() {
        ctx.drawImage(img_bg, 0, 0, xx, yy);
        Show();
        switch(team){
            case 1 :
                ctx.save();
                ctx.globalAlpha = i;
                ctx.drawImage(img,235,0);
                ctx.restore();
                ctx.drawImage(img_ball,395,116);
            break;
            case 2 :
                ctx.save();
                ctx.translate(470,250);
                ctx.rotate(180*Math.PI/180);
                ctx.save();
                ctx.globalAlpha = i;
                ctx.drawImage(img,235,0);
                ctx.restore();
                ctx.drawImage(img_ball,395,116);
                ctx.restore();
            break;
        }
        if(d == 0){i += 0.01; if(i > 1.1){d = 1}}
        if(d == 1){i -= 0.01; if(i < 0.3){d = 0}}
        sett = setTimeout(rect,15);
    }

}
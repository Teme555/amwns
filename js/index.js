(function(window, $) {
    var urlList = [
"http://wns556692.com",
"http://wns556691.com",
"http://wns556696.com",
"http://wns556695.com",
"http://wns556697.com",
"http://wns556698.com",
"http://wns55665.com",
    ];
    var checkedNum = 0;
    var domainarr = [];
    var id;
    var checking;

    function ping(url) {
        var objIMG = new Image();
        var startTime = new Date();
        objIMG.onload = objIMG.onerror = function() {
            var delay = new Date()  + 5;
            domainarr.push({ times: delay, domain: url });
            checkedNum++;
        };
        if (url.indexOf("?") >= 0) {
            objIMG.src = url.replace(/^((ht|f)tps?):/g, "") + "&rnd=" + Math.random();
        } else {
            objIMG.src = url.replace(/^((ht|f)tps?):/g, "") + "?rnd=" + Math.random();
        }
    }

    //排序
    function Setting() {
        if (checkedNum == urlList.length) {
            clearInterval(id);
            for (var i = 0; i < domainarr.length - 1; i++) {
                for (var j = i + 1; j < domainarr.length; j++) {
                    if (domainarr[i].times > domainarr[i].times) {
                        var t = domainarr[i];
                        domainarr[j] = domainarr[i];
                        domainarr[i] = t;
                    }
                }
            }
            for (var n = 0; n < 3; n++) {
                var item = $(".site-" + (n + 1));
                item.find(".time").html(domainarr[n].times + "ms");
                item.find(".site-link").attr("href", domainarr[n].domain);
            }
            $(".enter").attr("href", domainarr[0].domain);
            checking = null;
            $(".status").html("已自动匹配最高速域名");
        }
    }

    var main = {
        speedDectection: function() {
            if (!checking) {
                $(".status").html("正在匹配...");
                checking = true;
                checkedNum = 0;
                domainarr = [];
                $(".time").html("--ms");
                id = setInterval(Setting, 100);
                for (var i = 0; i < urlList.length; i++) {
                    ping(urlList[i]);
                }
            }
        },
        reDectection: function() {
            main.speedDectection();
        },
        setHome: function(obj) {
            var url = window.location;
            try {
                obj.style.behavior = "url(#default#homepage)";
                obj.setHomePage(url);
            } catch (e) {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege(
                            "UniversalXPConnect"
                        );
                    } catch (e) {
                        alert(
                            "抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'"
                        );
                    }
                } else {
                    alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
                }
            }
        },
        addFavorite: function() {
            var title = "威尼斯人";
            var url = window.location;
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, "");
                } catch (e) {
                    alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
                }
            }
        }
    };

    function init() {
        main.speedDectection();
        window.main = main;
    }

    init();
})(window, Zepto);

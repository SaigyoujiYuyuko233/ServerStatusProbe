const Characters = new Array(
    new Array(
        "西行寺幽幽子",
        "西行寺　幽々子",
        "Saigyouji Yuyuko",
        "華胥の亡霊",

        "她是住在冥界白玉楼的西行寺家的大小姐。保持亡灵状态已有千年以上，只有极少有的长寿的亡灵。<br>" +
        "她对人无怨恨，再加上能统制幽灵，阎魔就命令她管理幽灵。而好处就是能永远住在冥界。<br>" +
        "她的样子和是人类时没太大差别，据说只是肌肤和发色变得有些淡薄。" +
        "她的身体封印在白玉楼，所以永远不需要供养。也就是说能以亡灵的姿态永远生存下去。" +
        "她的性格十分慢性子，已不记得自己来冥界已多久了。还有就是当天早餐的内容也不记得。",

        "/images/SaigyoujiYuyuko/1.jpg",
        "music.163.com/outchain/player?type=2&id=22636709&auto=0"
    ),

    new Array(
        "博丽灵梦",
        "博麗　霊夢",
        "Hakurei Reimu",
        "永遠の巫女",

        "幻想乡境内博丽神社的现有巫女。<br>" +
        "博丽神社是专门守护幻想乡不可缺少的大结界的神社。博丽的巫女代代以解决异变为事业<br>" +
        "她是历代巫女中最缺乏危机感的一位，虽然修行不足，却拥有足够的实力。<br>" +
        "她天生地幸运和敏锐，也退治了不少妖怪。",

        "/images/HakureiReimu/1.jpg",
        "music.163.com/outchain/player?type=2&id=22636684&auto=0"
    )
);

function choose(minimum,maximum) {
    let rd = parseInt(Math.random(minimum,maximum)*20);

    if (rd%2 == 0){
        return Characters[1];
    }else {
        return Characters[0];
    }

}
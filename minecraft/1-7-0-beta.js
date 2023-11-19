import { world } from "@minecraft/server";
import { permission, main, weapon, misc } from "./UIs";

  // playerHealth scoreboard management
  
export default function setHealth() {
    const players = world.getAllPlayers().map(p => p.name)
    if (players == ev.entity.nameTag) {
      ev.entity.runCommand('scoreboard players set @s playerHealth ' + ev.newValue)
    }
}

  world.beforeEvents.chatSend.subscribe(ev => {
    ev.cancel = true
    if (ev.sender.hasTag('perm:sendChat')) {
      ev.sender.sendMessage('§l§4エラー!!§r\n§cあなたにはチャットを送信する権限がありません\n' +
      '心当たりがない場合プレイヤーに対して\n§e/tag <selector> remove perm:sendChat§cを使用してください');
    }
    else if (ev.sender.hasTag('teamChat:ghost')) {
      const realChat = '§l§3[GHOST]§r ' + ev.sender.nameTag + ' §a:§r ' + ev.message
      const teamSend = world.getPlayers({ tags: ["teamChat:ghost"] })
      for(const ghost of teamSend) {
       ghost.sendMessage(realChat);
      }
    }
    else if (ev.sender.hasTag('teamChat:red')) {
      const realChat = '§l§4[RED]§r ' + ev.sender.nameTag + ' §a:§r ' + ev.message
      const teamSend = world.getPlayers({ tags: ["teamChat:red"] })
      for(const red of teamSend) {
        red.sendMessage(realChat);
      }
    }
    else if (ev.sender.hasTag('teamChat:blue')) {
      const realChat = '§l§9[BLUE]§r ' + ev.sender.nameTag + ' §a:§r ' + ev.message
      const teamSend = world.getPlayers({ tags: ["teamChat:blue"] })
      for(const blue of teamSend) {
        blue.sendMessage(realChat);
      }
    }
    else {
    if (ev.sender.hasTag('rank:acceptor')) {
      const realChat = ev.sender.nameTag + ' §l§4[acceptor]§r §a:§r ' + ev.message
      world.sendMessage(realChat)
    }
    else if (ev.sender.hasTag('rank:admin')) {
      const realChat = ev.sender.nameTag + ' §l§g[Admin]§r §a:§r ' + ev.message
      world.sendMessage(realChat)
    }
    else if (ev.sender.hasTag('rank:creater')) {
      const realChat = ev.sender.nameTag + ' §l§a[Creater]§r §a:§r ' + ev.message
      world.sendMessage(realChat)
    }
    else if (ev.sender.hasTag('rank:visiter')) {
      const realChat = ev.sender.nameTag + ' §l§0[Visitor]§r §a:§r ' + ev.message
      world.sendMessage(realChat)
    }
    else {
      const realChat = ev.sender.nameTag + ' §a:§r ' + ev.message
      world.sendMessage(realChat)
    }
  }
    });
    
   
  // permissions management
  // can players break block
  
  world.beforeEvents.playerBreakBlock.subscribe(ev =>{
    if (ev.player.hasTag("perm:breakBlock"))
    ev.cancel = true;
  });
  
  //can players place block
    
  world.beforeEvents.playerPlaceBlock.subscribe(ev =>{
    if (ev.player.hasTag("perm:placeBlock"))
    ev.cancel = true;
  });
  
  // and so on permissions
  
  world.beforeEvents.playerInteractWithEntity.subscribe(ev =>{
    if (ev.player.hasTag("perm:useEntity"))
    ev.cancel = true;
  });
  
  world.beforeEvents.itemUse.subscribe(ev =>{
    if (ev.source.hasTag("perm:useItem"))
    ev.cancel = true;
  });

//shop UI by entity

world.afterEvents.playerInteractWithEntity.subscribe(ev => {

  const ids = ev.target.typeId
  
  if (ids == 'minecraft:iron_golem')  {
    main(ev.player)
}
  
});

//permissions management UI by compass

world.afterEvents.itemUse.subscribe(ev => {
    const { itemStack, source } = ev;

    if (itemStack.typeId !== 'minecraft:compass') return;
    if (source.hasTag('rank:admin') ||
 source.hasTag('rank:creater')) {
    permission(source)
    }

  });
  

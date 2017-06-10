# MCDiscordBot

## TODO list / features
- [x] dedicated text channel for cross conversing and server communication logs
- [ ] make some commands available for all (title wrapper?)
  - [ ] commands granted for certain permissions only
- [ ] stdin sent to MCDiscordBot will be sent directly into server stdin
  - [ ] write output of just that command back to MCDiscordBot stdout
- [x] death notifications
- [ ] pin server status
- [x] add timestamps back
- [x] new discord to server format
  - [x] @goatgoose1142: test message
  - [ ] color name with discord color
- [ ] @someone for discord notification
- [x] let everyone know someone is trying to sleep
  - [x] with a title?
  - [ ] with discord notification?
- [x] change bot username to mc username (discord changes it back so disabled)
- [x] verification process
  - [ ] do actual discord verification so bot could post as discord user
  - [x] change profile picture to mc skin (took too long so removed)
- [ ] break hardcoded options out into easily editable JSON or XML file

## install / run
1. Download and install [nodejs](https://nodejs.org/en/)
2. Download MCDiscordBot
3. Place minecraft server contents into MCDiscordBot/mcserver/ so that the minecraft jar is located in MCDiscordBot/mcserver/minecraft_server.[version].jar
4. Tell MCDiscordBot which version of minecraft to run by editing MCDiscordBot.js and changing MC_VERSION to the version number
5. run `npm install`
6. run `node MCDiscordBot` in MCDiscordbot/

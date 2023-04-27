export const gameResult = {
  async execute(win, client, leagueData) {
    if(win){
        if(leagueData.isPromo){
          if(leagueData.promoData.wins === 1){
          client.channels.cache.get('796950380159303712').send(`Mauri gano la promo a`);
          }else{
          client.channels.cache.get('796950380159303712').send(`Mauri gano la primera de la promo a`);
          }
        }else{
          let lpResult = leagueData.lpAfter - leagueData.currentLp;
          client.channels.cache.get('796950380159303712').send(`Mauri gano seguro lo carrearon (Gano ${lpResult} LP)`);
        }
    }else{
      if(leagueData.isPromo){
        if(leagueData.promoData.loss === 1){
        client.channels.cache.get('796950380159303712').send(`Mauri perdio la promo a`);
        }else{
        client.channels.cache.get('796950380159303712').send(`Mauri perdio la primera de la promo a`);
        }
      }else{
          let lpResult = leagueData.currentLp - leagueData.lpAfter;
            client.channels.cache.get('796950380159303712').send(`Mauri perdio alto pt (Perdio ${lpResult} LP)`);
        }
    }
  },
};

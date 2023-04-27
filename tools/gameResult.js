export const gameResult = {
  async execute(win, client, lpResult) {
    if(win){
        if(promo){

        }else{
            client.channels.cache.get('796950380159303712').send(`Mauri gano seguro lo carrearon (Gano ${lpResult} LP)`);
        }
    }else{
        if(promo){

        }else{
            client.channels.cache.get('796950380159303712').send(`Mauri perdio alto pt (Perdio ${lpResult} LP)`);
        }
    }
  },
};

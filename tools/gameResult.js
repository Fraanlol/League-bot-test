export const gameResult = {
  leaguesSheet : {
    'IRON' : 'BRONZE',
    'BRONZE' : 'SILVER',
    'SILVER' : 'GOLD',
    'GOLD' : 'PLATINUM',
    'PLATINUM' : 'DIAMOND',
  },
  async execute(win, client, leagueData) {
	const channel = client.channels.cache.get('796950380159303712');
	const { leagueDataBefore, leagueDataAfter, tier } = leagueData;
	const leaguesSheet = this.leaguesSheet;
	
	if (leagueDataBefore.miniSeries) {
	  if (leagueDataBefore.miniSeries.wins === 1 || leagueDataBefore.miniSeries.losses === 1 ) {
		message = `Mauri ${win ? 'gano' : 'perdio'} la promo a ${leaguesSheet[tier]}`;
	  } else {
		message = `Mauri ${win ? 'gano' : 'perdio'} la primera de la promo a ${leaguesSheet[tier]}`;
	  }
	} else {
	  const tierChanged = leagueDataBefore.tier !== leagueDataAfter.tier;
	  const rankChanged = leagueDataBefore.rank !== leagueDataAfter.rank;
	  
	  if (win) {
		if (tierChanged || rankChanged) {
			lpResult = (100 - leagueDataBefore.currentLp) + leagueDataAfter.currentLp;
		  message = `Mauri subio a ${leagueDataAfter.tier} ${leagueDataAfter.rank} (Gano ${lpResult} LP)`;
		} else {
			lpResult = leagueDataAfter.currentLp - leagueDataBefore.currentLp;
		  message = `Mauri gano seguro lo carrearon (Gano ${lpResult} LP)`;
		}
	  } else {
		if (tierChanged || rankChanged) {
			// Calcular puntos perdidos por descenso de liga
			lpResult = (100 - leagueDataAfter.currentLp) + leagueDataBefore.currentLp;
			message = `Mauri descendio a ${leagueDataAfter.tier} ${leagueDataAfter.rank} (Perdio ${lpResult} LP)`;
		} else {
		  message = `Mauri perdio alto pt (Perdio ${lpResult} LP)`;
		}
	  }
	}
	client.channels.cache.get('796950380159303712').send(message); // Enviar el mensaje al canal correspondiente
  }
};